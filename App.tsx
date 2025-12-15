/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './QuantumScene';
import { WalletScannerInterface, BotWorkflowVisualizer, RiskDistributionChart } from './Diagrams';
import { ArrowRight, Menu, X, ShieldCheck, Zap, Lock, Coins, ChevronRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const BOT_LINK = "https://t.me/checkmycryptobot";
  const CHANNEL_LINK = "https://t.me/geekweb3";

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex justify-between items-center h-16">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer z-50 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
                <ShieldCheck size={28} className="text-white relative z-10 sm:w-8 sm:h-8" />
                <div className="absolute inset-0 bg-white/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="font-bold text-xl sm:text-2xl tracking-tighter text-white">CheckMyCrypto</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-base font-medium text-gray-200">
            <a href="#analysis" onClick={scrollToSection('analysis')} className="hover:text-white hover:scale-105 transition-all cursor-pointer">Анализ</a>
            <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="hover:text-white hover:scale-105 transition-all cursor-pointer">Как это работает</a>
            <a href="#pricing" onClick={scrollToSection('pricing')} className="hover:text-white hover:scale-105 transition-all cursor-pointer">Стоимость</a>
            <a href={CHANNEL_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-105 transition-all cursor-pointer">Блог</a>
            <a 
              href={BOT_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-7 py-3 bg-white text-black text-base font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Запустить
            </a>
          </div>

          <button className="md:hidden text-white p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 text-2xl font-bold animate-fade-in">
            <a href="#analysis" onClick={scrollToSection('analysis')} className="text-gray-300 hover:text-white transition-colors">Анализ</a>
            <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="text-gray-300 hover:text-white transition-colors">Как это работает</a>
            <a href="#pricing" onClick={scrollToSection('pricing')} className="text-gray-300 hover:text-white transition-colors">Стоимость</a>
            <a href={CHANNEL_LINK} target="_blank" className="text-gray-300 hover:text-white transition-colors">Блог</a>
            <a 
              href={BOT_LINK}
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-10 py-4 bg-white text-black rounded-full mt-4 flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Запустить Бот <ArrowRight size={22} />
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-4">
        <HeroScene />
        
        <div className="relative z-10 container mx-auto px-2 sm:px-6 text-center max-w-6xl">
          <motion.div 
            className="animate-fade-in opacity-0" 
            style={{ animationDelay: '0.2s' }}
          >
             {/* Massive Logo Text - FIXED для мобильных */}
             <h1 className="font-bold text-[2.5rem] leading-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter mb-6 sm:mb-8 text-white pb-2 drop-shadow-2xl break-words">
               CheckMyCrypto
             </h1>
          </motion.div>
          
          <motion.p 
            className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 font-medium leading-relaxed mb-10 sm:mb-14 opacity-0 animate-fade-in px-2" 
            style={{ animationDelay: '0.4s' }}
          >
            Проверка цифровых переводов.<br/>
            <span className="text-gray-400">Безопасно. Быстро. Прямо в Telegram.</span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 opacity-0 animate-fade-in px-2" 
            style={{ animationDelay: '0.6s' }}
          >
             <a href={BOT_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-black rounded-full text-lg sm:text-xl font-bold hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-3 justify-center hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                Проверить кошелек
             </a>
             <a href="#how-it-works" onClick={scrollToSection('how-it-works')} className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#1d1d1f]/80 backdrop-blur-md text-white hover:bg-[#2c2c2e] border border-white/10 rounded-full text-lg sm:text-xl font-bold transition-all cursor-pointer flex items-center gap-3 justify-center hover:scale-105 active:scale-95 hover:border-white/30">
                Узнать больше <ChevronRight size={22} />
             </a>
          </motion.div>
        </div>
      </header>

      <main>
        {/* Value Proposition */}
        <section id="analysis" className="py-20 md:py-32 lg:py-48 bg-black relative">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
               <div className="order-2 lg:order-1">
                  <div className="text-white font-bold text-sm sm:text-lg mb-4 sm:mb-6 uppercase tracking-widest opacity-80 flex items-center gap-2">
                    <span className="w-6 sm:w-8 h-[2px] bg-white"></span> Анализ Рисков
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-10 leading-tight tracking-tight text-white">
                    Один перевод может стоить вам всего.
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-8 sm:mb-12 font-normal">
                    Взаимодействие с "грязным" адресом ведет к блокировкам биржевых аккаунтов и потере средств. <span className="text-white font-bold border-b border-white/30">CheckMyCrypto</span> анализирует миллионы меток, чтобы вы были уверены в каждом переводе.
                  </p>
                  <a href={BOT_LINK} target="_blank" className="text-white hover:text-gray-300 inline-flex items-center gap-3 border-b-2 border-white pb-1 transition-all hover:border-white/50 text-base sm:text-lg md:text-xl font-bold">
                     Запустить анализ в Telegram <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                  </a>
               </div>
               <div className="order-1 lg:order-2 flex justify-center">
                  <RiskDistributionChart />
               </div>
            </div>
          </div>
        </section>

        {/* Feature Showcase (Dark/Glass) */}
        <section className="py-20 md:py-32 lg:py-48 bg-[#050505]">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="text-center mb-16 md:mb-32">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-10 tracking-tight text-white">Технология безопасности</h2>
                    <p className="text-gray-200 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto font-normal leading-normal">
                        Мы используем передовые алгоритмы on-chain аналитики для выявления скрытых связей.
                    </p>
                </div>

                <div className="bg-[#111] rounded-2xl sm:rounded-[2.5rem] p-1 sm:p-2 border border-white/10 overflow-hidden mb-12 md:mb-24 shadow-2xl shadow-black/80 ring-1 ring-white/5">
                   <WalletScannerInterface />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    <div className="p-8 sm:p-12 rounded-2xl sm:rounded-[2rem] bg-[#111] border border-white/10 hover:border-white/30 transition-all duration-300 group hover:bg-[#161616]">
                        <Zap className="text-white mb-6 sm:mb-8 group-hover:scale-110 transition-transform" size={40} />
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Мгновенно</h3>
                        <p className="text-gray-300 text-base sm:text-xl leading-relaxed">Результат проверки готов менее чем за 10 секунд. Без ожиданий и сложных настроек.</p>
                    </div>
                    <div className="p-8 sm:p-12 rounded-2xl sm:rounded-[2rem] bg-[#111] border border-white/10 hover:border-white/30 transition-all duration-300 group hover:bg-[#161616]">
                        <Lock className="text-white mb-6 sm:mb-8 group-hover:scale-110 transition-transform" size={40} />
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Анонимно</h3>
                        <p className="text-gray-300 text-base sm:text-xl leading-relaxed">Никаких регистраций и KYC. Бот не хранит ваши личные данные. Полная конфиденциальность.</p>
                    </div>
                    <div className="p-8 sm:p-12 rounded-2xl sm:rounded-[2rem] bg-[#111] border border-white/10 hover:border-white/30 transition-all duration-300 group hover:bg-[#161616]">
                        <ShieldCheck className="text-white mb-6 sm:mb-8 group-hover:scale-110 transition-transform" size={40} />
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Надежно</h3>
                        <p className="text-gray-300 text-base sm:text-xl leading-relaxed">Базы данных обновляются в реальном времени. Высокая точность определения рисков.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Workflow Section */}
        <section id="how-it-works" className="py-20 md:py-32 lg:py-48 bg-black border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                     <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-10 sm:mb-16 tracking-tight text-white leading-tight">Работает там,<br/>где вы общаетесь.</h2>
                        <div className="space-y-12 sm:space-y-20">
                             <div className="flex gap-6 sm:gap-10 group">
                                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/10 group-hover:text-white/30 transition-colors">01</span>
                                <div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">Скопируйте адрес</h3>
                                    <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">Возьмите адрес кошелька отправителя или получателя, который хотите проверить.</p>
                                </div>
                             </div>
                             <div className="flex gap-6 sm:gap-10 group">
                                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/10 group-hover:text-white/30 transition-colors">02</span>
                                <div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">Отправьте боту</h3>
                                    <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">Просто вставьте адрес в чат <a href={BOT_LINK} target="_blank" className="text-white font-bold underline decoration-white/30 hover:decoration-white transition-all">@checkmycryptobot</a>.</p>
                                </div>
                             </div>
                             <div className="flex gap-6 sm:gap-10 group">
                                <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/10 group-hover:text-white/30 transition-colors">03</span>
                                <div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4">Получите отчет</h3>
                                    <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">Мгновенная сводка рисков и четкая рекомендация: безопасно или нет.</p>
                                </div>
                             </div>
                        </div>
                        <div className="mt-12 sm:mt-20">
                            <a href={BOT_LINK} target="_blank" className="w-full sm:w-auto inline-flex bg-white text-black px-8 sm:px-12 py-5 sm:py-6 rounded-full text-lg sm:text-xl font-bold items-center justify-center gap-3 hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                Попробовать сейчас <ArrowRight size={22} />
                            </a>
                        </div>
                     </div>
                     <div className="relative h-[450px] sm:h-[550px] lg:h-[700px] w-full bg-[#111] rounded-2xl sm:rounded-[3rem] overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl shadow-black/50">
                        <BotWorkflowVisualizer />
                     </div>
                </div>
            </div>
        </section>

        {/* Pricing / CTA */}
        <section id="pricing" className="py-20 md:py-32 lg:py-48 bg-[#050505] relative overflow-hidden">
             {/* Background glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

             <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-10 text-white tracking-tight">Защита, доступная каждому.</h2>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 sm:mb-24 max-w-4xl mx-auto font-normal">
                    Профессиональный AML-анализ обычно стоит дорого. Мы сделали его доступным для всех пользователей Telegram.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left">
                    {/* Basic Plan */}
                    <div className="p-8 sm:p-12 rounded-2xl sm:rounded-[2.5rem] bg-[#111] border border-white/10 hover:border-white/30 transition-all duration-300 group flex flex-col hover:-translate-y-2">
                        <div className="flex justify-between items-start mb-6 sm:mb-8">
                            <span className="text-gray-200 font-bold text-base sm:text-xl uppercase tracking-wider">Единоразовая проверка</span>
                            <Coins className="text-white group-hover:scale-110 transition-transform" size={32} />
                        </div>
                        <div className="text-5xl sm:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tighter">$1</div>
                        <p className="text-gray-300 text-base sm:text-xl mb-8 sm:mb-12 leading-relaxed">Идеально для редких сделок. Оплата картой или криптовалютой прямо в боте.</p>
                        <a href={BOT_LINK} target="_blank" className="mt-auto block w-full py-4 sm:py-5 text-center bg-[#222] text-white rounded-full text-lg sm:text-xl font-bold hover:bg-[#333] transition-colors border border-white/10 hover:border-white/30">
                           Выбрать
                        </a>
                    </div>
                    
                    {/* Pro Plan */}
                    <div className="p-8 sm:p-12 rounded-2xl sm:rounded-[2.5rem] bg-white border border-white relative overflow-hidden group shadow-[0_0_80px_rgba(255,255,255,0.15)] flex flex-col hover:-translate-y-2 transition-transform duration-300">
                        <div className="absolute top-0 right-0 bg-black text-white text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-bl-2xl font-bold uppercase tracking-wider">
                            Выбор профи
                        </div>
                        <div className="flex justify-between items-start mb-6 sm:mb-8">
                            <span className="text-gray-600 font-bold text-base sm:text-xl uppercase tracking-wider">Пакеты проверок</span>
                            <ShieldCheck className="text-black group-hover:scale-110 transition-transform" size={32} />
                        </div>
                        <div className="text-5xl sm:text-7xl font-bold text-black mb-4 sm:mb-6 tracking-tighter">Выгодно</div>
                        <p className="text-gray-600 text-base sm:text-xl mb-8 sm:mb-12 leading-relaxed font-medium">Экономьте до 50% при покупке пакетов от 10 проверок. Для трейдеров и активных пользователей.</p>
                         <a href={BOT_LINK} target="_blank" className="mt-auto block w-full py-4 sm:py-5 text-center bg-black text-white rounded-full text-lg sm:text-xl font-bold hover:bg-gray-800 transition-colors shadow-xl">
                           Смотреть тарифы
                        </a>
                    </div>
                </div>
             </div>
        </section>

      </main>

      <footer className="bg-black py-12 sm:py-20 border-t border-white/10 text-base">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-10 mb-8 sm:mb-12">
                <div className="text-gray-300 text-base sm:text-xl">
                    <span className="text-white font-bold text-xl sm:text-2xl">CheckMyCrypto</span> <span className="mx-2 text-gray-600">|</span> Проект <a href={CHANNEL_LINK} target="_blank" className="text-white font-semibold hover:underline">от GEEK WEB 3.0</a>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-gray-300 font-bold text-base sm:text-lg">
                    <a href={CHANNEL_LINK} target="_blank" className="hover:text-white transition-colors flex items-center gap-2"> Наш Telegram Канал <ExternalLink size={16}/></a>
                    <a href={BOT_LINK} target="_blank" className="hover:text-white transition-colors flex items-center gap-2">Запустить Бот <ArrowRight size={16}/></a>
                </div>
            </div>
            <div className="text-left text-[#666] border-t border-white/5 pt-8 sm:pt-10">
                <p className="max-w-4xl text-sm sm:text-lg leading-relaxed">
                    Дисклеймер: Сервис CheckMyCrypto предоставляет справочную информацию на основе открытых данных блокчейна и алгоритмов риск-скоринга. Мы не несем ответственности за ваши финансовые решения, потери средств или блокировки. Всегда проводите собственное исследование (DYOR) перед совершением транзакций.
                </p>
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 sm:mt-10 gap-4 sm:gap-6">
                    <p className="text-sm sm:text-base">© 2025 CheckMyCrypto. All rights reserved.</p>
                    <p className="text-[#444] text-sm sm:text-base">Designed for Crypto Security.</p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
