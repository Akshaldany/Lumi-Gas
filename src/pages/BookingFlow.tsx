import React, { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CreditCard, Home, Clock, CheckCircle, ShieldCheck } from 'lucide-react';
import { api } from '@/src/lib/api';

interface BookingFlowProps {
  onComplete: () => void;
}

export const BookingFlow = ({ onComplete }: BookingFlowProps) => {
  const [step, setStep] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);

  const handleCheckout = async () => {
    setIsBooking(true);
    try {
      const agencyId = localStorage.getItem('selected_agency_id');
      if (!agencyId) throw new Error('No agency selected');
      const res = await api.createBooking(agencyId);
      localStorage.setItem('active_booking_id', res.booking.id);
      onComplete();
    } catch (err) {
      console.error(err);
      alert('Failed to create booking');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-16 relative px-8">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.05] -translate-y-1/2" />
        {[1, 2, 3].map((s) => (
          <div key={s} className="relative z-10 flex flex-col items-center">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
               step >= s 
                ? 'bg-brand-primary border-brand-primary text-white shadow-xl shadow-brand-primary/20 rotate-45' 
                : 'bg-brand-bg border-white/10 text-gray-500'
             }`}>
                <div className={step >= s ? '-rotate-45' : ''}>
                  {step > s ? <CheckCircle className="w-6 h-6" /> : <span className="text-sm font-black">{s}</span>}
                </div>
             </div>
             <span className={`text-[10px] uppercase font-black tracking-[0.2em] mt-6 transition-colors duration-500 ${step >= s ? 'text-brand-primary' : 'text-gray-600'}`}>
                {s === 1 ? 'Details' : s === 2 ? 'Schedule' : 'Payment'}
             </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-10 p-0 border-white/[0.05]">
              <CardContent className="space-y-8 p-10">
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-bold">Booking Details</h3>
                   <Badge variant="warning">Standard Refill</Badge>
                </div>
                <div className="space-y-6">
                  <Input label="Customer ID" defaultValue="LM-8829-X" readOnly />
                  <Input label="Registry Phone" defaultValue="+1 (555) 424-2424" />
                  
                  <div className="p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-start space-x-4">
                     <ShieldCheck className="text-brand-primary w-6 h-6 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-sm font-bold text-gray-200 mb-1">Government Subsidy Applied</p>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Your primary connection is eligible for a direct benefit transfer of ₹208.40 on this booking.</p>
                     </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full h-16 shadow-xl" size="lg" onClick={nextStep}>
              Validate & Continue <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-10 p-0 border-white/[0.05]">
              <CardContent className="space-y-8 p-10">
                <h3 className="text-2xl font-bold">Delivery Schedule</h3>
                <div className="space-y-8">
                  <div className="flex items-start justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] group cursor-pointer hover:border-brand-primary/30 transition-colors">
                     <div className="flex items-start space-x-5">
                        <div className="p-3 rounded-2xl bg-white/5 text-gray-400 group-hover:text-brand-primary transition-colors">
                           <Home className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="font-bold text-lg mb-1">Primary Residence</p>
                           <p className="text-sm text-gray-500 max-w-[200px]">Pearson Hardman Tower, Manhattan, NY</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Edit</button>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Preferred Slot</p>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { slot: 'Morning', time: '09:00 - 12:00' },
                         { slot: 'Afternoon', time: '12:00 - 16:00' },
                         { slot: 'Evening', time: '16:00 - 20:00' },
                         { slot: 'Express', time: 'Within 60 mins', premium: true }
                       ].map((slot, i) => (
                         <button 
                          key={i} 
                          className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                            i === 0 
                             ? 'bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20' 
                             : 'bg-white/[0.02] border-white/[0.08] hover:border-brand-primary/50'
                          }`}
                         >
                           <p className={`text-xs font-black uppercase tracking-widest mb-1 ${i === 0 ? 'text-white/80' : 'text-gray-500'}`}>{slot.slot}</p>
                           <p className={`font-bold ${i === 0 ? 'text-white' : 'text-gray-300'}`}>{slot.time}</p>
                           {slot.premium && <div className="mt-2 text-[8px] font-black uppercase tracking-tighter bg-brand-primary text-white w-fit px-1.5 py-0.5 rounded leading-none">Premium Only</div>}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full h-16 shadow-xl" size="lg" onClick={nextStep}>
              Confirm Schedule <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-10 p-0 border-white/[0.05]">
              <CardContent className="space-y-8 p-10">
                <h3 className="text-2xl font-bold">Checkout</h3>
                <div className="space-y-5 bg-white/[0.02] p-6 rounded-2xl border border-white/[0.08]">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-500">LPG Cylinder (14.2kg)</span>
                    <span className="text-gray-200">₹920.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-500">Logistics & Delivery</span>
                    <span className="text-emerald-400 uppercase text-[10px] font-black tracking-widest">Free for Premium</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-500">Energy Surcharge</span>
                    <span className="text-gray-200">₹5.40</span>
                  </div>
                  <div className="pt-5 border-t border-white/[0.05] flex justify-between items-baseline">
                    <span className="text-lg font-bold text-white">Full Total</span>
                    <span className="text-3xl font-black orange-text-gradient tracking-tighter">₹925.40</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Payment Source</p>
                  <button className="w-full flex items-center justify-between p-6 rounded-2xl bg-[#1A1A1E] border border-brand-primary/30 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
                     <div className="flex items-center space-x-4 relative z-10">
                        <CreditCard className="text-brand-primary w-6 h-6" />
                        <div className="text-left">
                           <p className="font-bold text-white tracking-wide">Visa Signature</p>
                           <p className="text-xs text-gray-500">Ends in •••• 4242</p>
                        </div>
                     </div>
                     <div className="w-5 h-5 rounded-full border-4 border-brand-primary flex items-center justify-center relative z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                     </div>
                  </button>
                  <Button variant="outline" className="w-full border-dashed py-4 border-white/10 hover:border-brand-primary/30">
                    Add Legacy Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Button disabled={isBooking} className="w-full h-16 shadow-2xl orange-bg-gradient" size="lg" onClick={handleCheckout}>
              {isBooking ? 'Processing...' : 'Securely Pay Now'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
