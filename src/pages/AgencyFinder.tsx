import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { Search, MapPin, Star, Clock, Filter, ChevronRight, Fuel } from 'lucide-react';
import { motion } from 'motion/react';

import { api } from '@/src/lib/api';

interface Agency {
  id: string;
  name: string;
  distance?: string; // might not exist in backend schema, fallback to random
  rating: number;
  available_cylinders: number;
  price?: number;
}

interface AgencyFinderProps {
  onSelect: () => void;
}

export const AgencyFinder = ({ onSelect }: AgencyFinderProps) => {
  const [search, setSearch] = useState('');
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    let active = true;
    const fetchAgencies = async () => {
      setLoading(true);
      try {
        const data = await api.getAgencies(search);
        if (active) setAgencies(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchAgencies();
    return () => { active = false; };
  }, [search]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)] gap-8 overflow-hidden">
      {/* Left List */}
      <div className="w-full lg:w-[440px] flex flex-col space-y-5 overflow-y-auto pr-2 pb-6">
        <div className="space-y-4 mb-4 sticky top-0 bg-brand-bg/95 backdrop-blur-3xl pt-1 z-10 pb-4 border-b border-white/[0.05]">
          <Input 
            placeholder="Search agencies or pincode..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            icon={<Search className="w-4 h-4 text-gray-500" />}
          />
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-10 px-4 text-[10px] font-black uppercase tracking-widest flex items-center">
              <Filter className="w-3.5 h-3.5 mr-2" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="h-10 px-4 text-[10px] font-black uppercase tracking-widest">Rating 4.0+</Button>
            <Button variant="outline" size="sm" className="h-10 px-4 text-[10px] font-black uppercase tracking-widest text-brand-primary border-brand-primary/20 bg-brand-primary/5">Available</Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center p-10 text-gray-400">Searching agencies...</div>
        ) : agencies.length === 0 ? (
          <div className="text-center p-10 mt-10">
            <Fuel className="w-10 h-10 mx-auto text-white/10 mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-500">No agencies found matching your criteria</p>
          </div>
        ) : agencies.map((agency, idx) => {
          const status = agency.available_cylinders > 10 ? 'available' : agency.available_cylinders > 0 ? 'low_stock' : 'error';
          const statusText = status === 'available' ? 'Ready' : status === 'low_stock' ? `${agency.available_cylinders} Left` : 'Out of Stock';
          
          return (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <button
              onClick={() => {
                 // Store selected agency id in localStorage for the booking flow
                 localStorage.setItem('selected_agency_id', agency.id);
                 onSelect();
              }}
              disabled={agency.available_cylinders <= 0}
              className={`w-full text-left glass-card p-6 rounded-2xl group transition-all duration-300 ${agency.available_cylinders > 0 ? 'hover:border-brand-primary/30' : 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="p-3 rounded-2xl bg-white/[0.05] text-gray-400 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-brand-primary/20">
                  <Fuel className="w-6 h-6" />
                </div>
                <Badge variant={status === 'available' ? 'success' : status === 'low_stock' ? 'warning' : 'error'}>
                  {statusText}
                </Badge>
              </div>
              
              <h4 className="font-bold text-xl mb-1 text-white">{agency.name}</h4>
              <div className="flex items-center space-x-4 text-xs font-bold text-gray-500 mb-6">
                <span className="flex items-center"><Star className="w-3.5 h-3.5 text-amber-500 mr-1.5 fill-amber-500" /> {agency.rating || '4.5'}</span>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/[0.05]">
                <span className="text-xl font-black text-white">₹920 <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">/ cylinder</span></span>
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          </motion.div>
        )}
        )}
      </div>

      {/* Right Map Placeholder */}
      <div className="hidden lg:block flex-1 glass-card rounded-3xl overflow-hidden relative border-white/[0.05]">
        <div className="absolute inset-0 bg-[#0B0B0D]">
           {/* Fake Map Grid */}
           <div className="absolute inset-0 opacity-[0.03]">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }} />
           </div>
           
           {/* Fake Map Elements */}
           <div className="absolute top-1/4 left-1/3 w-40 h-1 bg-white/[0.05] rounded-full blur-[1px]" />
           <div className="absolute top-1/2 right-1/4 w-32 h-1 bg-white/[0.05] rounded-full blur-[1px] rotate-45" />

           {/* Agency Markers */}
           {agencies.slice(0, 3).map((agency, i) => (
             <motion.div
               key={agency.id}
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               whileHover={{ scale: 1.1 }}
               transition={{ delay: 0.5 + i * 0.15, type: 'spring', bounce: 0.4 }}
               className="absolute"
               style={{ top: `${25 + (i * 22)}%`, left: `${35 + (i * 18)}%` }}
             >
                <div className="relative group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-[#1A1A1E] border border-brand-primary/30 flex items-center justify-center shadow-2xl shadow-brand-primary/10">
                    <MapPin className="text-brand-primary w-7 h-7" />
                  </div>
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1A1E] px-4 py-2 rounded-xl border border-white/[0.08] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
                    <p className="text-xs font-black text-white mb-0.5 uppercase tracking-wider">{agency.name}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Available: {agency.available_cylinders}</p>
                  </div>
                </div>
             </motion.div>
           ))}

           {/* Current Location Marker */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                 <div className="w-5 h-5 rounded-full bg-brand-primary border-[3px] border-[#0B0B0D] shadow-[0_0_20px_rgba(255,106,0,0.6)] animate-pulse" />
              </div>
           </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 glass-card rounded-full flex items-center space-x-6">
           <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B0B0D] bg-brand-surface flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                </div>
              ))}
           </div>
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">14 Active delivery partners</span>
        </div>
      </div>
    </div>
  );
};
