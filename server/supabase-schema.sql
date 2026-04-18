-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist
DROP TABLE IF EXISTS inventory_logs;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS agencies;
DROP TABLE IF EXISTS users;

-- 1. Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  auto_book BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Agencies table
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL,
  longitude DECIMAL,
  available_cylinders INTEGER DEFAULT 0,
  rating DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert mock agencies
INSERT INTO agencies (name, location, latitude, longitude, available_cylinders, rating)
VALUES
  ('Sri Murugan Gas Agency', 'Anna Nagar, Chennai', 13.0827, 80.2177, 12, 4.8),
  ('Chennai South Gas Distributor', 'T Nagar, Chennai', 13.0382, 80.2366, 0, 4.5),
  ('Velachery LPG Services', 'Velachery, Chennai', 12.9750, 80.2230, 45, 4.2),
  ('Mylapore Gas Corner', 'Mylapore, Chennai', 13.0335, 80.2675, 23, 4.9);

-- 3. Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES agencies(id) ON DELETE SET NULL,
  status TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivery_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Inventory Logs table
CREATE TABLE inventory_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  change_amount INTEGER NOT NULL,
  reason TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
