/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

export type Page = 'dashboard' | 'agencies' | 'history' | 'profile' | 'tracking' | 'booking';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');

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
