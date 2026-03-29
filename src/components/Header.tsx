import { useState, useEffect } from 'react';
import { Menu, X, UserCircle2, Flame } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect for a modern "sticky" feel
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '예약하기', href: '#reserve' },
    { name: '예약조회', href: '#lookup' },
    { name: '이용안내', href: '#guide' },
    { name: '문의처', href: '#inquiry' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3' 
          : 'bg-white border-b border-slate-100 py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* BRAND BLOCK: Left Icon + Text */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="text-knu-green transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Flame size={32} strokeWidth={2.5} fill="currentColor" className="opacity-20 absolute -inset-1 blur-sm" />
              <Flame size={32} strokeWidth={2.5} />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 leading-none tracking-tight">
              강원대학교
            </h1>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] mt-1.5 transition-colors group-hover:text-knu-green">
              BBQ Reservation System
            </span>
          </div>
        </div>

        {/* NAVIGATION: Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 border-r border-slate-200 pr-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-[15px] font-semibold text-slate-600 hover:text-knu-green transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-knu-green transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          
          <button className="flex items-center gap-2.5 px-6 py-2.5 bg-slate-900 text-white rounded-full text-[14px] font-bold hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 transition-all">
            <UserCircle2 size={18} />
            학생증 인증
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-[60] p-8 flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
              <Flame size={28} className="text-knu-green" />
              <span className="text-xl font-black">KNU BBQ</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black text-slate-900 active:text-knu-green transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <button className="w-full py-5 bg-knu-green text-white rounded-[2rem] text-xl font-bold shadow-xl shadow-emerald-900/20">
              학생증 로그인
            </button>
            <p className="text-center text-slate-400 text-sm font-medium">
              강원대학교 구성원 전용 서비스
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
