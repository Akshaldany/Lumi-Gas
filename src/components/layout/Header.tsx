import { Bell, Search, Menu, Flame } from 'lucide-react';
import { Page } from '@/src/App';
import { motion } from 'motion/react';

interface HeaderProps {
  currentPage: Page;
}

export const Header = ({ currentPage }: HeaderProps) => {
  const titles: Record<Page, string> = {
    dashboard: 'Dashboard',
    agencies: 'Find Agencies',
    booking: 'Refill Booking',
    tracking: 'Track Status',
    history: 'Order History',
    profile: 'Profile',
  };

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/[0.05] bg-brand-bg/50 backdrop-blur-2xl sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <div className="md:hidden flex items-center space-x-3 pr-4 border-r border-white/10">
           <Flame className="w-6 h-6 text-brand-primary" />
           <span className="text-lg font-black tracking-tighter">Lumi<span className="orange-text-gradient">Gas</span></span>
        </div>
        <h1 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 hidden md:block">
          {titles[currentPage]}
        </h1>
      </div>

      <div className="flex items-center space-x-4 md:space-x-8">
        <div className="hidden lg:flex items-center bg-white/[0.03] border border-white/[0.08] rounded-full px-5 py-2 group focus-within:border-brand-primary/50 transition-all">
          <Search className="w-4 h-4 text-gray-600 group-focus-within:text-brand-primary transition-colors mr-3" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="bg-transparent border-none focus:ring-0 text-xs placeholder-gray-600 w-48 text-white font-medium"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2.5 text-gray-500 hover:text-brand-primary transition-all rounded-full hover:bg-white/5">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-brand-bg shadow-[0_0_8px_rgba(255,106,0,0.4)]" />
          </button>

          <div className="flex items-center space-x-4 pl-4 border-l border-white/[0.08]">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white uppercase tracking-wider">Harvey S.</p>
              <div className="flex items-center justify-end">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                 <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Premium</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF6A00] to-[#FF8C42] p-[1.5px] shadow-lg shadow-brand-primary/10">
              <div className="w-full h-full rounded-[14.5px] bg-gray-900 flex items-center justify-center text-[10px] font-black tracking-tighter">
                HS
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
