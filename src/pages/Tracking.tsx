import React from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Truck, MapPin, Phone, MessageSquare, Clock, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '@/src/lib/api';
const STEPS = [
  { label: 'Booking Confirmed', time: '10:30 AM', status: 'completed' },
  { label: 'Cylinder Dispatched', time: '11:45 AM', status: 'completed' },
  { label: 'Out for Delivery', time: '02:15 PM', status: 'current' },
  { label: 'Delivered', time: 'Est. 03:00 PM', status: 'pending' },
];

export const Tracking = () => {
  const [booking, setBooking] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    const fetchStatus = async () => {
      try {
        const id = localStorage.getItem('active_booking_id');
        if (!id) return;
        const data = await api.getBooking(id);
        if (active) {
            setBooking(data);
            setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // poll every 30s
    return () => { active = false; clearInterval(interval); };
  }, []);

  const getStepStatus = (stepName: string) => {
    if (!booking) return 'pending';
    const statusOrder = ['Booked', 'Confirmed', 'Dispatched', 'Out for Delivery', 'Delivered'];
    const currentIdx = statusOrder.indexOf(booking.status);
    let stepIdx = 0;
    if (stepName === 'Booking Confirmed') stepIdx = 1;
    if (stepName === 'Cylinder Dispatched') stepIdx = 2;
    if (stepName === 'Out for Delivery') stepIdx = 3;
    if (stepName === 'Delivered') stepIdx = 4;

    if (currentIdx > stepIdx) return 'completed';
    if (currentIdx === stepIdx) return 'current';
    return 'pending';
  };

  const steps = [
    { label: 'Booking Confirmed', time: 'Phase 1', status: getStepStatus('Booking Confirmed') },
    { label: 'Cylinder Dispatched', time: 'Phase 2', status: getStepStatus('Cylinder Dispatched') },
    { label: 'Out for Delivery', time: 'Phase 3', status: getStepStatus('Out for Delivery') },
    { label: 'Delivered', time: 'Phase 4', status: getStepStatus('Delivered') },
  ];

  if (loading) return <div className="text-center p-10">Loading tracking details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Status & Timeline */}
        <div className="space-y-6">
          <Card className="p-8 border-brand-primary/20 bg-brand-primary/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Truck className="w-24 h-24 text-brand-primary" />
             </div>
             <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-3">Order #{booking?.id?.slice(0,8).toUpperCase() || 'LM-10924'}</p>
                <h3 className="text-3xl font-black mb-4">{booking?.status || 'Processing'}</h3>
                <div className="flex items-center space-x-3">
                   <Badge variant="warning" className="animate-pulse">{booking?.status === 'Delivered' ? 'Completed' : 'On its way'}</Badge>
                </div>
             </div>
          </Card>

          <Card className="p-10 border-white/[0.05]">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-10">Delivery Progress</h4>
            <div className="space-y-0 relative">
              <div className="absolute left-[23px] top-2 bottom-2 w-[2px] bg-white/[0.05]" />
              
              {steps.map((step, i) => (
                <div key={i} className="flex space-x-8 pb-12 last:pb-0 relative group">
                  <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    step.status === 'completed' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-lg shadow-emerald-500/10' 
                      : step.status === 'current'
                        ? 'bg-brand-primary border-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-110'
                        : 'bg-brand-bg border-white/10 text-gray-600'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  
                  <div className="pt-2">
                    <p className={`font-black text-sm tracking-wide ${step.status === 'pending' ? 'text-gray-600' : 'text-white'}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Map & Agent */}
        <div className="space-y-6">
          <Card className="h-[400px] p-0 overflow-hidden relative border-white/[0.05]">
             <div className="absolute inset-0 bg-[#0B0B0D]">
                {/* Fake Map Grid */}
                <div className="absolute inset-0 opacity-[0.03]">
                   <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
                </div>
                
                {/* Route Line */}
                <svg className="absolute inset-0 w-full h-full">
                   <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M 50,300 C 150,350 250,50 350,100"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    className="opacity-30"
                   />
                </svg>

                {/* Agent Marker */}
                <motion.div 
                  className="absolute"
                  animate={{ top: ['75%','25%'], left: ['15%', '85%'] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                   <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center shadow-2xl shadow-brand-primary/40 rotate-12">
                      <Truck className="text-white w-6 h-6 -rotate-12" />
                   </div>
                </motion.div>

                {/* Destination */}
                <div className="absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                      <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white relative z-10" />
                   </div>
                </div>
             </div>
             
             <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <Badge variant="info" className="bg-brand-bg/80 backdrop-blur-xl border-white/10 pointer-events-auto">Live View</Badge>
                <Button variant="outline" size="sm" className="h-10 bg-brand-bg/80 backdrop-blur-xl border-white/10 pointer-events-auto text-[10px] uppercase font-black tracking-widest">Recenter</Button>
             </div>
          </Card>

          <Card className="p-8 border-white/[0.05]">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden border border-white/10 shadow-xl">
                     <span className="text-xl font-black text-white italic">RB</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Robert Brown</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Certified Partner • ID: 7721</p>
                  </div>
               </div>
               <div className="flex items-center text-amber-500 text-xs font-black">
                  < Star className="w-4 h-4 fill-amber-500 mr-1.5" /> 4.9
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 space-x-3 border-white/10 hover:border-brand-primary/30">
                <MessageSquare className="w-4 h-4 text-brand-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Message</span>
              </Button>
              <Button className="h-14 space-x-3 shadow-xl">
                <Phone className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Direct Call</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
