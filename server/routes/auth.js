import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../db/supabase.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    // With Supabase Auth, signUp will handle this, but we can just call it
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Insert into our public.users table as well for foreign keys (if you still want the public.users table),
    // but typically people use triggers for this. We'll manually insert here if it doesn't fail.
    if (authData.user) {
        await supabase.from('users').upsert([
            { id: authData.user.id, name, email, password_hash: 'managed_by_supabase' }
        ]);
    }

    res.status(201).json({ message: 'User created successfully', user: { id: authData.user?.id, name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !authData.user) {
      return res.status(400).json({ message: error?.message || 'Invalid email or password' });
    }

    // We can use Supabase's token or our own. Let's use our own for the custom middleware we already built
    const token = jwt.sign(
      { id: authData.user.id, email },
      process.env.JWT_SECRET || 'supersecretjwtkeythatshouldbechangedinproduction',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: authData.user.id, name: authData.user.user_metadata?.name || email, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
