import { supabase } from './supabase';

export const api = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),

  async login(email: string, password: string = 'password123') {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, data: { message: error.message } };
    
    this.setToken(data.session.access_token);
    return { ok: true, data: { user: { id: data.user.id, name: data.user.user_metadata?.name || email, email } } };
  },

  async register(name: string, email: string, password: string = 'password123') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    
    if (error) return { ok: false, data: { message: error.message } };
    
    if (data.session) {
      this.setToken(data.session.access_token);
      return { ok: true, requiresVerification: false, data: { user: { id: data.user?.id, name, email } } };
    }
    
    return { ok: true, requiresVerification: true, data: { user: { id: data.user?.id, name, email } } };
  },

  async getAgencies(location?: string, available_only?: boolean) {
    try {
      let query = supabase.from('agencies').select('*');
      if (location) query = query.ilike('location', `%${location}%`);
      if (available_only) query = query.gt('available_cylinders', 0);
      
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn("DB Fetch failed, falling back to mock agencies");
    }

    // Fallback Mock Data if Supabase is empty or blocks read via RLS
    let mocks = [
      { id: 'mock-1', name: 'LumiGas Premium Dist.', location: 'Central District', available_cylinders: 45, rating: 4.9 },
      { id: 'mock-2', name: 'SafeFlame Providers', location: 'North District', available_cylinders: 12, rating: 4.2 },
      { id: 'mock-3', name: 'Eco Energy Services', location: 'West End', available_cylinders: 0, rating: 4.6 },
    ];

    if (location) {
      mocks = mocks.filter(m => m.location.toLowerCase().includes(location.toLowerCase()) || m.name.toLowerCase().includes(location.toLowerCase()));
    }
    if (available_only) {
      mocks = mocks.filter(m => m.available_cylinders > 0);
    }
    return mocks;
  },

  async createBooking(agency_id: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Reduce inventory directly from frontend
    const { data: agency } = await supabase.from('agencies').select('available_cylinders').eq('id', agency_id).single();
    if (agency && agency.available_cylinders > 0) {
      await supabase.from('agencies').update({ available_cylinders: agency.available_cylinders - 1 }).eq('id', agency_id);
      await supabase.from('inventory_logs').insert([{ agency_id, change_amount: -1, reason: `Booking by ${user.id}` }]);
    } else {
      throw new Error('Agency out of stock');
    }

    // Create Booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([{ user_id: user.id, agency_id, status: 'Booked' }])
      .select('*')
      .single();

    if (error) throw error;

    // Simulate backend delivery workflow locally in the browser
    this.startLocalMockWorkflow(booking.id);

    return { booking };
  },

  startLocalMockWorkflow(bookingId: string) {
    const update = async (status: string, isFinal = false) => {
      const updateData: any = { status };
      if (isFinal) updateData.delivery_date = new Date().toISOString();
      await supabase.from('bookings').update(updateData).eq('id', bookingId);
    };

    setTimeout(() => update('Confirmed'), 2 * 60 * 1000);
    setTimeout(() => update('Dispatched'), 5 * 60 * 1000);
    setTimeout(() => update('Out for Delivery'), 8 * 60 * 1000);
    setTimeout(() => update('Delivered', true), 12 * 60 * 1000);
  },

  async getBooking(id: string) {
    const { data, error } = await supabase.from('bookings').select('*, agencies(*)').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async getBookings() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('bookings')
      .select('*, agencies(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
