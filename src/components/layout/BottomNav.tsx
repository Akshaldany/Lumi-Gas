import { LayoutDashboard, Search, FileClock, MapPin, User } from 'lucide-react';
import { Page } from '@/src/App';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const BottomNav = ({ currentPage, onNavigate }: BottomNavProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dash', icon: LayoutDashboard },
    { id: 'agencies', label: 'Find', icon: MapPin },
    { id: 'tracking', label: 'Track', icon: Search },
    { id: 'history', label: 'Activity', icon: FileClock },
    { id: 'profile', label: 'Pro', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-brand-bg/80 backdrop-blur-2xl border-t border-white/5 z-50 px-6 flex items-center justify-between pb-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id as Page)}
          className={cn(
            'flex flex-col items-center justify-center space-y-1 relative h-full flex-1',
            currentPage === item.id ? 'text-brand-primary' : 'text-gray-500'
          )}
        >
          {currentPage === item.id && (
            <motion.div
              layoutId="bottom-nav-active"
              className="absolute -top-1 w-8 h-1 bg-brand-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <item.icon className={cn('w-6 h-6', currentPage === item.id ? 'text-brand-primary' : 'hover:scale-110 transition-transform')} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
