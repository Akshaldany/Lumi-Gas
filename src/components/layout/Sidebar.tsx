import { LayoutDashboard, Search, FileClock, MapPin, User, LogOut, Flame } from 'lucide-react';
import { Page } from '@/src/App';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agencies', label: 'Agencies', icon: MapPin },
    { id: 'tracking', label: 'Delivery', icon: Search },
    { id: 'history', label: 'History', icon: FileClock },
    { id: 'profile', label: 'Account', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-brand-bg/50 backdrop-blur-3xl border-r border-white/5 h-screen sticky top-0 z-40">
      <div className="p-10 flex items-center space-x-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF6A00] to-[#FF8C42] flex items-center justify-center shadow-xl shadow-[#FF6A00]/20 rotate-3">
          <Flame className="text-white w-6 h-6 -rotate-3" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight text-white leading-none">Lumi<span className="orange-text-gradient">Gas</span></span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mt-1">ENERGY_CLOUD</span>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-3 py-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Page)}
            className={cn(
              'w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden',
              currentPage === item.id 
                ? 'bg-white/[0.04] text-white shadow-xl border border-white/10' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
            )}
          >
            {currentPage === item.id && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 w-1.5 h-6 bg-brand-primary rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <item.icon className={cn('w-5 h-5 transition-all duration-500', 
              currentPage === item.id ? 'text-brand-primary' : 'group-hover:scale-110 group-hover:text-gray-300'
            )} />
            <span className="font-bold text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-white/5 mx-4">
        <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
           <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">System Status</p>
           <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-xs font-bold text-gray-400">Main Grid Operational</span>
           </div>
        </div>
      </div>
    </aside>
  );
};
