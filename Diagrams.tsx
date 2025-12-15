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
    <div className="flex flex-col items-center p-4 sm:p-8 md:p-12 w-full max-w-4xl mx-auto">
      <div className="flex justify-between w-full items-center mb-6 sm:mb-8">
          <div className="flex gap-2 sm:gap-3 items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
          </div>
          <div className="text-xs sm:text-base text-gray-400 font-mono uppercase tracking-widest font-bold">CheckMyCrypto Core</div>
      </div>
      
      <div className="w-full bg-black/50 rounded-2xl sm:rounded-3xl border border-white/15 p-4 sm:p-6 md:p-10 flex flex-col gap-6 sm:gap-10 relative overflow-hidden backdrop-blur-md">
         
         {/* Input Simulation */}
         <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1 bg-[#1d1d1f] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-xl font-mono text-white flex justify-between items-center group focus-within:border-white/40 transition-colors shadow-inner">
                <span className="opacity-90 tracking-wide text-gray-100">{address}</span>
                <button onClick={toggleAddress} className="text-sm sm:text-base text-blue-400 hover:text-blue-300 font-sans font-bold transition-colors uppercase tracking-wide cursor-pointer ml-4">Сменить</button>
            </div>
            <button 
                onClick={handleScan}
                disabled={scanning}
                className="bg-white text-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50 font-bold text-base sm:text-xl min-w-[120px] sm:min-w-[160px]"
            >
                {scanning ? '...' : 'Проверить'}
            </button>
         </div>

         {/* Scanning Animation */}
         {scanning && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6 sm:mb-8"></div>
                <span className="text-sm sm:text-lg font-bold text-white uppercase tracking-widest animate-pulse text-center px-4">Сканирование блокчейна...</span>
            </div>
         )}

         {/* Results */}
         {!scanning && result && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-8 border ${result === 'clean' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
            >
                <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {result === 'clean' ? <CheckCircle className="text-green-400 flex-shrink-0" size={32} /> : <AlertTriangle className="text-red-400 flex-shrink-0" size={32} />}
                    <span className={`font-bold text-xl sm:text-2xl md:text-3xl ${result === 'clean' ? 'text-green-50' : 'text-red-50'}`}>
                        {result === 'clean' ? 'Адрес чист' : 'Высокий риск!'}
                    </span>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between text-base sm:text-xl sm:items-center gap-1 sm:gap-0">
                        <span className="text-gray-200">Darknet & Mixers:</span>
                        <span className={`font-bold ${result === 'clean' ? 'text-white' : 'text-red-400'}`}>{result === 'clean' ? '0%' : '85% Обнаружено'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-base sm:text-xl sm:items-center gap-1 sm:gap-0">
                        <span className="text-gray-200">Санкционные списки:</span>
                        <span className={`font-bold ${result === 'clean' ? 'text-white' : 'text-red-400'}`}>{result === 'clean' ? 'Нет' : 'OFAC Listed'}</span>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                        <div className="flex justify-between text-xs sm:text-sm uppercase font-bold text-gray-300 mb-2 sm:mb-3">
                            <span>Trust Score</span>
                            <span>{result === 'clean' ? '98/100' : '12/100'}</span>
                        </div>
                        <div className="w-full h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
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
             <div className="h-32 sm:h-48 flex flex-col items-center justify-center text-gray-500 gap-3 sm:gap-4">
                 <Search size={36} className="opacity-20 sm:w-12 sm:h-12" />
                 <span className="text-lg sm:text-2xl font-medium text-gray-400 text-center">Введите адрес для проверки</span>
             </div>
         )}
      </div>
    </div>
  );
};

// --- BOT WORKFLOW VISUALIZER (COMPLETELY FIXED) ---
export const BotWorkflowVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Smartphone, label: "TELEGRAM" },
    { icon: Search, label: "СКАНЕР" },
    { icon: FileText, label: "ОТЧЕТ" }
  ];

  const getActiveState = (index: number) => {
    if (index === 0) return step === 0;
    if (index === 1) return step === 1 || step === 2;
    return step >= 2;
  };

  const getActiveColor = (index: number, isActive: boolean) => {
    if (!isActive) return 'border-white/20 text-white/30';
    if (index === 0) return 'border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]';
    if (index === 1) return 'border-blue-500 text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.4)]';
    return 'border-green-500 text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.4)]';
  };

  const messages = [
    "Вы отправляете адрес в чат",
    "Бот анализирует блокчейн",
    "Проверка баз данных",
    "Мгновенный результат"
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 box-border">
      
      {/* Основной контейнер с шагами - вертикальный всегда */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        
        {steps.map((stepData, index) => {
          const Icon = stepData.icon;
          const isActive = getActiveState(index);
          const colorClass = getActiveColor(index, isActive);
          
          return (
            <React.Fragment key={index}>
              {/* Step item */}
              <div className={`flex flex-col items-center transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center bg-[#1a1a1a] border-2 transition-all duration-500 ${colorClass}`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-gray-400 mt-2 sm:mt-3">{stepData.label}</span>
              </div>
              
              {/* Connector line (вертикальная) */}
              {index < steps.length - 1 && (
                <div className="w-[2px] h-6 sm:h-8 md:h-10 bg-white/20 my-2 sm:my-3"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Status message - всегда внизу */}
      <div className="w-full text-center py-4 sm:py-6 mt-auto">
        <motion.p 
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
        >
          {messages[step]}
        </motion.p>
      </div>
    </div>
  );
};

// --- RISK DISTRIBUTION CHART (Minimalist Pie) - RESPONSIVE ---
export const RiskDistributionChart: React.FC = () => {
    return (
        <div className="flex flex-col items-center md:items-start gap-8 sm:gap-12 scale-90 sm:scale-100 md:scale-110">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto md:mx-0">
                 {/* CSS Ring Chart */}
                 <div className="w-full h-full rounded-full border-[14px] sm:border-[18px] md:border-[20px] border-[#1d1d1f] relative flex items-center justify-center shadow-2xl">
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
                        <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">12%</div>
                        <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-widest mt-1 sm:mt-2 font-bold">High Risk</div>
                     </div>
                 </div>

                 {/* Floating Badges */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-2 sm:-top-4 -right-2 sm:-right-8 bg-[#222] border border-white/20 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl flex gap-2 sm:gap-3 items-center backdrop-blur-md"
                 >
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                    <span className="text-sm sm:text-base font-bold text-white">Darknet</span>
                 </motion.div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-3 sm:gap-y-6 w-full pl-0 sm:pl-4">
                 <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] flex-shrink-0"></div> 
                    <span className="text-sm sm:text-lg font-medium text-gray-200">Scams & Hacks</span>
                 </div>
                 <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500 flex-shrink-0"></div> 
                    <span className="text-sm sm:text-lg font-medium text-gray-200">Gambling</span>
                 </div>
                 <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 flex-shrink-0"></div> 
                    <span className="text-sm sm:text-lg font-medium text-gray-200">Sanctions (OFAC)</span>
                 </div>
                 <div className="flex items-center gap-2 sm:gap-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-500 flex-shrink-0"></div> 
                    <span className="text-sm sm:text-lg font-medium text-gray-200">Mixers</span>
                 </div>
            </div>
        </div>
    )
}
