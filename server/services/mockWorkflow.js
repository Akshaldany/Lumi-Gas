import { supabase } from '../db/supabase.js';

// Starts the mock delivery workflow using background timeouts
export const startDeliveryWorkflow = (bookingId) => {
  // Wait 2 minutes -> Confirmed
  setTimeout(() => updateBookingStatus(bookingId, 'Confirmed'), 2 * 60 * 1000);
  
  // Wait 5 minutes -> Dispatched
  setTimeout(() => updateBookingStatus(bookingId, 'Dispatched'), 5 * 60 * 1000);
  
  // Wait 8 minutes -> Out for Delivery
  setTimeout(() => updateBookingStatus(bookingId, 'Out for Delivery'), 8 * 60 * 1000);
  
  // Wait 12 minutes -> Delivered
  setTimeout(() => updateBookingStatus(bookingId, 'Delivered', true), 12 * 60 * 1000);
};

const updateBookingStatus = async (bookingId, status, isFinal = false) => {
  try {
    const updateData = { status };
    if (isFinal) {
      updateData.delivery_date = new Date().toISOString();
    }

    const { error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId);

    if (error) {
      console.error(`Failed to update booking ${bookingId} to ${status}:`, error);
    } else {
      console.log(`Booking ${bookingId} updated to ${status}`);
    }
  } catch (err) {
    console.error(`Error in mock workflow for booking ${bookingId}:`, err);
  }
};
