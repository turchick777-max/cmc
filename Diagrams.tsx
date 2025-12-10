
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, AlertTriangle, CheckCircle, Smartphone, FileText } from 'lucide-react';

// --- WALLET SCANNER INTERFACE ---
export const WalletScannerInterface: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<'clean' | 'risky' | null>(null);
  const [address, setAddress] = useState('0x71C...9A2');

  const addresses = [
      { addr: '0x71C...9A2', type: 'clean' },
      { addr: '0x3fA...B19', type: 'risky' }
  ];

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
        setScanning(false);
        setResult(address === '0x71C...9A2' ? 'clean' : 'risky');
    }, 2000);
  };

  const toggleAddress = () => {
      const currIdx = addresses.findIndex(a => a.addr === address);
      const nextIdx = (currIdx + 1) % addresses.length;
      setAddress(addresses[nextIdx].addr);
      setResult(null);
  }

  return (
    <div className="flex flex-col items-center p-8 md:p-12 w-full max-w-4xl mx-auto">
      <div className="flex justify-between w-full items-center mb-8">
          <div className="flex gap-3 items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></div>
            <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
          </div>
          <div className="text-base text-gray-400 font-mono uppercase tracking-widest font-bold">CheckMyCrypto Core</div>
      </div>
      
      <div className="w-full bg-black/50 rounded-3xl border border-white/15 p-10 flex flex-col gap-10 relative overflow-hidden backdrop-blur-md">
         
         {/* Input Simulation */}
         <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 bg-[#1d1d1f] border border-white/10 rounded-2xl px-6 py-5 text-xl font-mono text-white flex justify-between items-center group focus-within:border-white/40 transition-colors shadow-inner">
                <span className="opacity-90 tracking-wide text-gray-100">{address}</span>
                <button onClick={toggleAddress} className="text-base text-blue-400 hover:text-blue-300 font-sans font-bold transition-colors uppercase tracking-wide cursor-pointer ml-4">Сменить</button>
            </div>
            <button 
                onClick={handleScan}
                disabled={scanning}
                className="bg-white text-black px-10 py-5 rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50 font-bold text-xl min-w-[160px]"
            >
                {scanning ? '...' : 'Проверить'}
            </button>
         </div>

         {/* Scanning Animation */}
         {scanning && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-8"></div>
                <span className="text-lg font-bold text-white uppercase tracking-widest animate-pulse">Сканирование блокчейна...</span>
            </div>
         )}

         {/* Results */}
         {!scanning && result && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl p-8 border ${result === 'clean' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
            >
                <div className="flex items-center gap-6 mb-8">
                    {result === 'clean' ? <CheckCircle className="text-green-400" size={42} /> : <AlertTriangle className="text-red-400" size={42} />}
                    <span className={`font-bold text-3xl ${result === 'clean' ? 'text-green-50' : 'text-red-50'}`}>
                        {result === 'clean' ? 'Адрес чист' : 'Высокий риск!'}
                    </span>
                </div>
                
                <div className="space-y-6">
                    <div className="flex justify-between text-xl items-center">
                        <span className="text-gray-200">Darknet & Mixers:</span>
                        <span className={`font-bold ${result === 'clean' ? 'text-white' : 'text-red-400'}`}>{result === 'clean' ? '0%' : '85% Обнаружено'}</span>
                    </div>
                    <div className="flex justify-between text-xl items-center">
                        <span className="text-gray-200">Санкционные списки:</span>
                        <span className={`font-bold ${result === 'clean' ? 'text-white' : 'text-red-400'}`}>{result === 'clean' ? 'Нет' : 'OFAC Listed'}</span>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-sm uppercase font-bold text-gray-300 mb-3">
                            <span>Trust Score</span>
                            <span>{result === 'clean' ? '98/100' : '12/100'}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: result === 'clean' ? '98%' : '12%' }}
                                className={`h-full rounded-full ${result === 'clean' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]'}`}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
         )}

         {!scanning && !result && (
             <div className="h-48 flex flex-col items-center justify-center text-gray-500 gap-4">
                 <Search size={48} className="opacity-20" />
                 <span className="text-2xl font-medium text-gray-400">Введите адрес для проверки</span>
             </div>
         )}
      </div>
    </div>
  );
};

// --- BOT WORKFLOW VISUALIZER ---
export const BotWorkflowVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-12">
      
      <div className="flex items-center gap-8 md:gap-16">
        
        {/* Step 1: User */}
        <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${step === 0 ? 'opacity-100 scale-110' : 'opacity-40 blur-[1px]'}`}>
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center bg-[#1d1d1f] border-2 ${step === 0 ? 'border-white text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'border-white/10 text-gray-500'}`}>
                <Smartphone size={40} />
            </div>
            <span className="text-base font-bold tracking-widest text-gray-300">TELEGRAM</span>
        </div>

        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Step 2: Bot */}
        <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${step === 1 ? 'opacity-100 scale-110' : 'opacity-40 blur-[1px]'}`}>
             <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center bg-[#1d1d1f] border-2 ${step === 1 ? 'border-blue-500 text-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.5)]' : 'border-white/10 text-gray-500'}`}>
                <Search size={40} />
             </div>
             <span className="text-base font-bold tracking-widest text-gray-300">СКАНЕР</span>
        </div>

        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* Step 3: Result */}
        <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${step >= 2 ? 'opacity-100 scale-110' : 'opacity-40 blur-[1px]'}`}>
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center bg-[#1d1d1f] border-2 ${step >= 2 ? 'border-green-500 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.5)]' : 'border-white/10 text-gray-500'}`}>
                <FileText size={40} />
            </div>
            <span className="text-base font-bold tracking-widest text-gray-300">ОТЧЕТ</span>
        </div>

      </div>

      <div className="mt-20 text-center h-12">
           <motion.p 
             key={step}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-white text-3xl font-semibold tracking-tight"
           >
              {step === 0 && "Вы отправляете адрес в чат"}
              {step === 1 && "Бот анализирует блокчейн"}
              {step === 2 && "Проверка баз данных"}
              {step === 3 && "Мгновенный результат"}
           </motion.p>
      </div>
    </div>
  );
};

// --- RISK DISTRIBUTION CHART (Minimalist Pie) ---
export const RiskDistributionChart: React.FC = () => {
    return (
        <div className="flex flex-col items-center md:items-start gap-12 scale-110">
            <div className="relative w-96 h-96 mx-auto md:mx-0">
                 {/* CSS Ring Chart */}
                 <div className="w-full h-full rounded-full border-[20px] border-[#1d1d1f] relative flex items-center justify-center shadow-2xl">
                     {/* Segments - Simplified for Apple look (Gradient ring) */}
                     <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1d1d1f" strokeWidth="8" />
                         {/* Risk Segment */}
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="8" strokeDasharray="60 251.2" strokeLinecap="round" className="opacity-90 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                         {/* Warning Segment */}
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="8" strokeDasharray="40 251.2" strokeDashoffset="-70" strokeLinecap="round" className="opacity-90" />
                         {/* Safe Segment (remainder) */}
                         <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="8" strokeDasharray="120 251.2" strokeDashoffset="-120" strokeLinecap="round" className="opacity-90" />
                     </svg>
                     
                     {/* Center Stat */}
                     <div className="absolute flex flex-col items-center">
                        <div className="text-6xl font-bold text-white tracking-tighter drop-shadow-lg">12%</div>
                        <div className="text-sm text-gray-300 uppercase tracking-widest mt-2 font-bold">High Risk</div>
                     </div>
                 </div>

                 {/* Floating Badges */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-8 bg-[#222] border border-white/20 px-5 py-3 rounded-2xl shadow-2xl flex gap-3 items-center backdrop-blur-md"
                 >
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                    <span className="text-base font-bold text-white">Darknet</span>
                 </motion.div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full pl-4">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> 
                    <span className="text-lg font-medium text-gray-200">Scams & Hacks</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div> 
                    <span className="text-lg font-medium text-gray-200">Gambling</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div> 
                    <span className="text-lg font-medium text-gray-200">Sanctions (OFAC)</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div> 
                    <span className="text-lg font-medium text-gray-200">Mixers</span>
                 </div>
            </div>
        </div>
    )
}
