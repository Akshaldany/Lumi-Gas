import React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { FileText, Download, Fuel, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/src/components/ui/Input';
import { motion } from 'motion/react';

const BOOKINGS = [
  { id: 'LM-10923', agency: 'Metro Gas Services', date: 'Oct 14, 2025', amount: '₹920.00', status: 'delivered' },
  { id: 'LM-10855', agency: 'Metro Gas Services', date: 'Sep 28, 2025', amount: '₹920.00', status: 'delivered' },
  { id: 'LM-10712', agency: 'Metro Gas Services', date: 'Sep 12, 2025', amount: '₹910.00', status: 'delivered' },
  { id: 'LM-10609', agency: 'Bharat Gas Point', date: 'Aug 25, 2025', amount: '₹915.00', status: 'cancelled' },
  { id: 'LM-10544', agency: 'Metro Gas Services', date: 'Aug 10, 2025', amount: '₹920.00', status: 'delivered' },
];

export const History = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-bold tracking-tight text-white mb-2 italic serif">Order Activity</h2>
           <p className="text-gray-500 font-medium">Access your complete transaction logs and download tax invoices.</p>
        </div>
        <div className="flex items-center space-x-3">
           <Input 
            placeholder="Search orders..." 
            className="w-48 hidden lg:block" 
            icon={<Search className="w-4 h-4" />}
           />
           <Button variant="outline" className="h-12 px-6 border-white/10 text-xs font-black uppercase tracking-widest bg-white/[0.02]">
              Download All Data
           </Button>
        </div>
      </div>

      <Card className="p-2 border-white/[0.05] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">ID & Agency</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Transaction Date</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Status</th>
                <th className="px-6 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Amount</th>
                <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {BOOKINGS.map((booking, i) => (
                <motion.tr 
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-4">
                       <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                          <Fuel className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-xs font-black font-mono text-white mb-0.5">{booking.id}</p>
                          <p className="text-xs text-gray-500 font-bold">{booking.agency}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-gray-300">{booking.date}</p>
                  </td>
                  <td className="px-6 py-6">
                    <Badge variant={booking.status === 'delivered' ? 'success' : 'error'}>
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-6 font-black text-white">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                       </button>
                       <button className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-brand-primary transition-colors">
                          <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
