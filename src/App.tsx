/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { AgencyFinder } from './pages/AgencyFinder';
import { BookingFlow } from './pages/BookingFlow';
import { Tracking } from './pages/Tracking';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { AnimatePresence, motion } from 'motion/react';
import { Auth } from './pages/Auth';
import { api } from './lib/api';

export type Page = 'dashboard' | 'agencies' | 'history' | 'profile' | 'tracking' | 'booking';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [user, setUser] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Attempt to hydrate user from local storage or api
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      // Typically we'd fetch fresh user data here to validate token
      setUser(JSON.parse(storedUser));
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = (u: any) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (isInitializing) return <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4"><p className="text-gray-500 font-black tracking-widest text-[10px] uppercase">Loading Workspace...</p></div>;

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-brand-bg text-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar currentPage={page} onNavigate={setPage} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pb-20 md:pb-0">
        <Header currentPage={page} />
        
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl mx-auto w-full"
            >
              {page === 'dashboard' && (
                <Dashboard 
                  onBook={() => setPage('booking')} 
                  onTrack={() => setPage('tracking')}
                  onViewAgencies={() => setPage('agencies')}
                  onViewHistory={() => setPage('history')}
                />
              )}
              {page === 'agencies' && <AgencyFinder onSelect={() => setPage('booking')} />}
              {page === 'booking' && <BookingFlow onComplete={() => setPage('tracking')} />}
              {page === 'tracking' && <Tracking />}
              {page === 'history' && <History />}
              {page === 'profile' && <Profile />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav currentPage={page} onNavigate={setPage} />
    </div>
  );
}
