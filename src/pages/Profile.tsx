import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { User, MapPin, CreditCard, Bell, Shield, LogOut, ChevronRight, Camera } from 'lucide-react';

interface ProfileProps {
  onLogout?: () => void;
}

export const Profile = ({ onLogout }: ProfileProps) => {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-brand-surface p-10 rounded-[32px] border border-white/[0.05] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative group">
           <div className="w-32 h-32 rounded-[40px] bg-gradient-to-tr from-[#FF6A00] to-[#FF8C42] p-1 shadow-2xl shadow-brand-primary/20 transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-[36px] bg-gray-900 flex items-center justify-center text-4xl font-black italic text-white overflow-hidden">
                 <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'Guest'}`} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
           </div>
           <button className="absolute bottom-1 right-1 w-10 h-10 rounded-2xl bg-brand-bg border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-primary transition-colors shadow-xl">
              <Camera className="w-5 h-5" />
           </button>
        </div>

        <div className="text-center md:text-left space-y-3 relative z-10">
           <div className="flex flex-col md:flex-row items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-white">{user?.name || 'Guest User'}</h2>
              <Badge variant="warning" className="px-3 py-1">Premium Client</Badge>
           </div>
           <p className="text-gray-500 font-medium tracking-wide">{user?.email || 'guest@example.com'}</p>
           <div className="flex items-center justify-center md:justify-start space-x-6 pt-2">
              <div className="text-center md:text-left">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-0.5">Member Since</p>
                 <p className="text-sm font-bold text-gray-300">Jan 2024</p>
              </div>
              <div className="w-[1px] h-8 bg-white/[0.05]" />
              <div className="text-center md:text-left">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-0.5">Total Refills</p>
                 <p className="text-sm font-bold text-gray-300">42 Units</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
           {[
             { id: 'personal', label: 'Personal Info', icon: User },
             { id: 'address', label: 'Saved Addresses', icon: MapPin },
             { id: 'payment', label: 'Payment Methods', icon: CreditCard },
             { id: 'notifications', label: 'Notifications', icon: Bell },
             { id: 'security', label: 'Security', icon: Shield },
           ].map((item) => (
             <button key={item.id} className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-brand-primary/20 transition-all group">
                <div className="flex items-center space-x-4">
                   <item.icon className="w-5 h-5 text-gray-500 group-hover:text-brand-primary transition-colors" />
                   <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-brand-primary" />
             </button>
           ))}
           
           <div className="pt-6">
              <button onClick={onLogout} className="w-full flex items-center justify-center space-x-3 p-5 rounded-2xl bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] border border-rose-500/10">
                 <LogOut className="w-4 h-4" />
                 <span>Terminate Session</span>
              </button>
           </div>
        </div>

        <div className="md:col-span-2 space-y-8">
           <Card className="p-0 overflow-hidden border-white/[0.05]">
              <CardContent className="p-10 space-y-8">
                 <h3 className="text-xl font-bold mb-8">Personal Information</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input label="First Name" defaultValue={user?.name?.split(' ')[0] || ''} />
                    <Input label="Last Name" defaultValue={user?.name?.split(' ').slice(1).join(' ') || ''} />
                    <Input label="Email" defaultValue={user?.email || ''} readOnly />
                    <Input label="Phone Number" defaultValue="+1 (555) 000-0000" />
                 </div>
                 <div className="pt-6">
                    <Button className="h-14 px-10 shadow-xl">Save Changes</Button>
                 </div>
              </CardContent>
           </Card>

           <Card className="p-0 overflow-hidden border-white/[0.05]">
              <CardContent className="p-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Privacy Settings</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Reset Defaults</button>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: 'Cloud-Sync Usage Reporting', desc: 'Sync your consumption data with local distributors for automated refills.', active: true },
                      { label: 'Subsidised Account Verification', desc: 'Allow LumiGas to auto-verify your subsidy status via Aadhaar / ID.', active: true },
                      { label: 'Direct Agency Messaging', desc: 'Enable real-time chat with delivery partners for current orders.', active: false },
                    ].map((setting, i) => (
                      <div key={i} className="flex items-start justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                         <div className="max-w-[80%]">
                            <p className="font-bold text-gray-200 mb-1">{setting.label}</p>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">{setting.desc}</p>
                         </div>
                         <div className={`w-12 h-6 rounded-full relative transition-colors duration-500 ${setting.active ? 'bg-brand-primary' : 'bg-gray-800'}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 ${setting.active ? 'left-7' : 'left-1'}`} />
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
};
