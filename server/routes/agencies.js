import express from 'express';
import { supabase } from '../db/supabase.js';

const router = express.Router();

// GET /agencies - list all agencies with filtering
router.get('/', async (req, res) => {
  try {
    const { location, available_only } = req.query;

    let query = supabase.from('agencies').select('*');

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (available_only === 'true') {
      query = query.gt('available_cylinders', 0);
    }

    const { data: agencies, error } = await query;

    if (error) throw error;
    res.json(agencies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching agencies' });
  }
});

// GET /agencies/:id - single agency details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data: agency, error } = await supabase
      .from('agencies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!agency) return res.status(404).json({ message: 'Agency not found' });

    res.json(agency);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching agency details' });
  }
});

export default router;
