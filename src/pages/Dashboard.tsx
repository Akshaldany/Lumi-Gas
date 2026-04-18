import React from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { 
  Fuel, 
  TrendingDown, 
  Clock, 
  MapPin, 
  History, 
  Search, 
  ChevronRight, 
  AlertCircle, 
  Truck, 
  Flame,
  ArrowRight,
  Navigation
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onBook: () => void;
  onTrack: () => void;
  onViewAgencies: () => void;
  onViewHistory: () => void;
}

export const Dashboard = ({ onBook, onTrack, onViewAgencies, onViewHistory }: DashboardProps) => {
  return (
    <div className="space-y-10 pb-12">
      {/* Top Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <motion.h2 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight text-white mb-1"
           >
            Good evening, <span className="orange-text-gradient">Harvey</span>
           </motion.h2>
           <p className="text-gray-500 font-medium">Your next refill is predicted in <span className="text-gray-300">12 days</span>.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Card - Cylinder Status */}
        <Card className="lg:col-span-8 p-0 overflow-hidden bg-brand-bg md:bg-brand-surface relative group">
           {/* Decorative background glow */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-primary/20 transition-colors duration-700" />
           
           <div className="flex flex-col md:flex-row h-full relative z-10">
              <div className="flex-1 p-10 flex flex-col justify-between min-h-[300px]">
                 <div>
                    <Badge variant="warning" className="mb-6">Current Cylinder Status</Badge>
                    <div className="space-y-2">
                       <h3 className="text-5xl font-black flex items-baseline gap-2">
                          72<span className="text-2xl text-gray-500">%</span>
                       </h3>
                       <p className="text-xl font-bold text-gray-400">Remaining Fuel</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center space-x-2">
                         <Clock className="w-4 h-4 text-brand-primary" />
                         <span className="text-sm font-bold text-gray-300">Est. 4.2 kg left</span>
                      </div>
                      <span className="text-xs font-black text-gray-500 tracking-widest">UNIT #7721-B</span>
                    </div>
                    <div className="h-4 w-full bg-white/[0.05] rounded-full overflow-hidden p-1 border border-white/5">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '72%' }}
                        transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                        className="h-full orange-bg-gradient rounded-full shadow-[0_0_15px_rgba(255,106,0,0.5)] relative"
                       >
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent" />
                       </motion.div>
                    </div>
                 </div>
              </div>

              <CardContent className="w-full md:w-[320px] bg-white/[0.02] border-l border-white/[0.05] p-10 flex flex-col justify-center space-y-10">
                 <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mb-3">Predicted Depletion</p>
                    <p className="text-2xl font-bold">Oct 30, 2025</p>
                 </div>
                 <Button onClick={onBook} size="lg" className="w-full h-16 text-lg animate-pulse-orange">
                    Book Refill
                 </Button>
                 <button onClick={onTrack} className="text-sm font-bold text-gray-500 hover:text-brand-primary text-center transition-colors">
                    View Last Booking Details
                 </button>
              </CardContent>
           </div>
        </Card>

        {/* Smart Insight Card */}
        <Card className="lg:col-span-4 bg-[#1A1A1E] border-brand-primary/10 overflow-hidden group">
           <div className="absolute top-0 right-0 p-6">
              <AlertCircle className="text-brand-secondary/40 w-12 h-12" />
           </div>
           <CardContent className="h-full flex flex-col justify-between pt-10">
              <div>
                 <Badge variant="info" className="mb-6">Intelligent Insight</Badge>
                 <h3 className="text-2xl font-bold leading-tight mb-4 text-gray-100 italic serif">
                    "Peak consumption detected <br /> for the weekend."
                 </h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    Based on your Friday patterns, we recommend booking by Sunday to avoid delivery delays during the rush.
                 </p>
              </div>
              
              <div className="mt-8">
                 <div className="flex items-center space-x-3 text-xs font-bold text-brand-secondary bg-brand-secondary/10 px-4 py-3 rounded-xl border border-brand-secondary/20">
                    <TrendingDown className="w-4 h-4" />
                    <span>Consumption up 12% vs last week</span>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { id: 'agencies', label: 'Find Agency', icon: MapPin, desc: 'View local distributors', onClick: onViewAgencies },
          { id: 'tracking', label: 'Track Order', icon: Navigation, desc: 'Real-time status', onClick: onTrack },
          { id: 'history', label: 'Order History', icon: History, desc: 'Past records & billing', onClick: onViewHistory },
        ].map((action) => (
          <button key={action.id} onClick={action.onClick} className="glass-card p-1 group relative overflow-hidden rounded-2xl">
             <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-500" />
             <div className="p-8 flex items-center justify-between relative z-10 text-left">
                <div className="flex items-center space-x-5">
                   <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:border-brand-primary/30 transition-all duration-300">
                      <action.icon className="w-6 h-6 text-gray-300 group-hover:text-brand-primary transition-colors" />
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-white">{action.label}</h4>
                      <p className="text-xs text-gray-500 font-medium">{action.desc}</p>
                   </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
             </div>
          </button>
        ))}
      </div>

      {/* Nearby Agencies */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <div>
              <h3 className="text-xl font-black uppercase tracking-widest text-gray-400">Nearby Agencies</h3>
              <p className="text-xs text-gray-600 font-bold">Fastest delivery estimates near your primary location</p>
           </div>
           <button onClick={onViewAgencies} className="text-sm font-bold text-brand-primary flex items-center group">
              View All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Metro Gas Services', dist: '1.2 km', status: 'available', rating: 4.8 },
            { name: 'Bharat Gas Point', dist: '2.5 km', status: 'low_stock', rating: 4.5 },
            { name: 'Pioneer LPG Center', dist: '5.1 km', status: 'available', rating: 4.7 }
          ].map((agency, i) => (
            <Card key={i} className="group p-0 overflow-hidden bg-brand-surface border-white/[0.02] glass-hover">
               <div className="relative h-48 bg-[#0B0B0D] flex items-center justify-center p-8">
                  <Flame className="w-24 h-24 text-brand-primary/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10 flex flex-col items-center">
                     <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                        <Fuel className="w-8 h-8 text-brand-primary" />
                     </div>
                  </div>
                  <div className="absolute top-4 right-4 group-hover:animate-bounce">
                     <Badge variant={agency.status === 'available' ? 'success' : 'warning'}>
                        {agency.status === 'available' ? 'In Stock' : 'Low Stock'}
                     </Badge>
                  </div>
               </div>
               <div className="p-7 space-y-4">
                  <div className="flex justify-between items-start">
                     <div>
                        <h4 className="font-bold text-lg mb-0.5">{agency.name}</h4>
                        <p className="text-xs text-gray-500 font-bold tracking-wider">{agency.dist} • Regular Distributor</p>
                     </div>
                     <div className="text-right">
                        <div className="flex items-center text-xs font-black text-amber-500">
                           <svg className="w-3 h-3 fill-amber-500 mr-1" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                           {agency.rating}
                        </div>
                     </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs font-black" onClick={onBook}>Quick Book</Button>
               </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="space-y-6">
        <h3 className="text-xl font-black uppercase tracking-widest text-gray-400 px-2">Recent Activity</h3>
        <Card className="p-2 border-white/[0.03]">
           <div className="space-y-1">
              {[
                { id: 'LM-10923', status: 'delivered', date: 'Oct 14', cost: '₹920' },
                { id: 'LM-10924', status: 'in_progress', date: 'Processing', cost: '₹915' },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-xl hover:bg-white/[0.03] transition-colors group cursor-pointer">
                   <div className="flex items-center space-x-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5 group-hover:bg-brand-primary/10 transition-colors">
                         {booking.status === 'delivered' ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Truck className="w-5 h-5 text-brand-primary animate-pulse" />}
                      </div>
                      <div>
                         <p className="font-bold font-mono text-xs text-gray-200">{booking.id}</p>
                         <p className="text-sm text-gray-500 font-medium">LPG Refill • 14.2 kg</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-white">{booking.cost}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${booking.status === 'delivered' ? 'text-emerald-500' : 'text-brand-primary'}`}>
                         {booking.status.replace('_', ' ')}
                      </p>
                   </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
};

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
