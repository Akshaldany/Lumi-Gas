import React, { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { motion, AnimatePresence } from 'motion/react';
import { Fuel, Lock, Mail, User } from 'lucide-react';
import { api } from '@/src/lib/api';

interface AuthProps {
  onLogin: (user: any) => void;
}

export const Auth = ({ onLogin }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        const res = await api.login(email, password);
        if (!res.ok) throw new Error(res.data.message || 'Login failed');
        onLogin(res.data.user);
      } else {
        const res = await api.register(name, email, password);
        if (!res.ok) throw new Error(res.data.message || 'Registration failed');

        // Auto login after register
        const loginRes = await api.login(email, password);
        if (!loginRes.ok) throw new Error('Registration successful, but auto-login failed');
        onLogin(loginRes.data.user);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-brand-bg relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/[0.05] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-2xl">
            <Fuel className="w-8 h-8 text-brand-primary" />
          </div>
          <h1 className="text-3xl font-black text-white">LumiGas Premium</h1>
          <p className="text-gray-500 font-medium mt-2">Sign in to book your next refill.</p>
        </div>

        <Card className="p-0 border-white/[0.05] overflow-hidden">
          <CardContent className="p-8">
            <div className="flex bg-white/[0.05] p-1 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      icon={<User className="w-4 h-4 text-gray-500" />}
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Input
                label="Email Address"
                type="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4 text-gray-500" />}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4 text-gray-500" />}
                required
              />

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <Button type="submit" disabled={loading} className="w-full h-14 mt-4 shadow-xl text-lg font-bold">
                {loading ? 'Processing...' : isLogin ? 'Access Account' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
