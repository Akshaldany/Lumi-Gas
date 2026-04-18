import express from 'express';
import { supabase } from '../db/supabase.js';
import { authenticateToken } from '../middleware/auth.js';
import { startDeliveryWorkflow } from '../services/mockWorkflow.js';

const router = express.Router();

// POST /bookings -> create booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { agency_id } = req.body;
    const user_id = req.user.id;

    if (!agency_id) return res.status(400).json({ message: 'Agency ID required' });

    // 1. Get agency and check inventory
    const { data: agency, error: agencyErr } = await supabase
      .from('agencies')
      .select('*')
      .eq('id', agency_id)
      .single();

    if (agencyErr || !agency) return res.status(400).json({ message: 'Invalid agency' });
    if (agency.available_cylinders <= 0) {
      return res.status(400).json({ message: 'Out of stock at this agency' });
    }

    // 2. Reduce inventory and create booking within transaction-like flow
    // Unfortunately Supabase REST API doesn't support complex transactions easily without RPC, 
    // so we'll do it sequentially
    const newStock = agency.available_cylinders - 1;

    const { error: updateErr } = await supabase
      .from('agencies')
      .update({ available_cylinders: newStock })
      .eq('id', agency_id);
    
    if (updateErr) throw updateErr;

    // Log the inventory change
    await supabase.from('inventory_logs').insert([
      { agency_id, change_amount: -1, reason: `Booking by user ${user_id}` }
    ]);

    // Create booking
    const { data: booking, error: bookingErr } = await supabase
      .from('bookings')
      .insert([
        { user_id, agency_id, status: 'Booked' }
      ])
      .select('*')
      .single();

    if (bookingErr) throw bookingErr;

    // Start background workflow to update status
    startDeliveryWorkflow(booking.id);

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// GET /bookings/:id -> get booking status
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, agencies(*)')
      .eq('id', id)
      .single();

    if (error || !booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Ensure user owns booking
    if (booking.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access to booking' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking' });
  }
});

// GET /users/:id/bookings -> booking history (User ID comes from JWT or param)
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId === 'me' ? req.user.id : req.params.userId;
    
    // Only allow fetching own bookings
    if (userId !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*, agencies(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking history' });
  }
});

export default router;
