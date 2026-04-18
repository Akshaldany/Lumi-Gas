import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Flame, Shield, Clock, MapPin, ArrowRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing = ({ onStart }: LandingProps) => {
  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Flame className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Lumi<span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Gas</span></span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Agencies</a>
          <a href="#" className="hover:text-white transition-colors">Business</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
          <Button variant="secondary" size="sm" onClick={onStart}>Sign In</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Available in 50+ Cities</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            The Future of <br /> Energy Management.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-12 leading-relaxed">
            Experience the most seamless way to book, track, and manage your LPG cylinders. 
            Designed for convenience, powered by intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="w-full sm:w-auto group" onClick={onStart}>
              Book Your Cylinder <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Nearby Agencies
            </Button>
          </div>
        </motion.div>

        {/* Floating Cards Preview */}
        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { icon: Shield, title: "Secure Payments", desc: "Verified transactions with end-to-end encryption." },
            { icon: Clock, title: "Predictive AI", desc: "Get notified before your cylinder runs out." },
            { icon: MapPin, title: "Real-time Tracking", desc: "Know exactly where your delivery agent is." }
          ].map((feature, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl text-left glass-hover">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <feature.icon className="text-blue-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Agency Section Preview */}
      <section className="bg-white/5 border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Trusted by Local Agencies.</h2>
              <p className="text-gray-400">Join thousands of households using LumiGas daily.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="h-16 glass rounded-2xl flex items-center justify-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                    <span className="font-bold tracking-widest text-xs uppercase">AGENCY_LOGO_{i}</span>
                 </div>
               ))}
          </div>
        </div>
      </section>
    </div>
  );
};
