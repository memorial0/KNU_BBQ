import { useState } from 'react';
import { Menu, X, Globe, UserCircle2 } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Top small bar matching KNU style */}
      <div className="bg-[#f1f5f9] border-b border-slate-200 hidden sm:block py-1">
        <div className="max-w-7xl mx-auto px-6 flex justify-end gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
          <a href="#" className="hover:text-knu-green flex items-center gap-1"><Globe size={10} /> KNU HOME</a>
          <a href="#" className="hover:text-knu-green">LOGIN</a>
          <a href="#" className="hover:text-knu-green">PORTAL</a>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="bg-knu-green p-1.5 rounded-xl shadow-lg shadow-emerald-900/10 group-hover:rotate-6 transition-transform">
              <img 
                 src="/logo.png"
                 alt="KNU BBQ Logo"
                 className="h-12 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none">강원대학교</h1>
              <span className="text-[10px] font-bold text-knu-green uppercase tracking-[0.2em]">BBQ Reservation System</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['예약하기', '예약조회', '이용안내', '문의처'].map((item, i) => (
              <a 
                key={i} 
                href={`#${['reserve', 'lookup', 'guide', 'inquiry'][i]}`} 
                className="text-[15px] font-bold text-slate-700 hover:text-knu-green transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-knu-green transition-all group-hover:w-full rounded-full"></span>
              </a>
            ))}
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95">
              <UserCircle2 size={18} />
              학생증 인증
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-right-full duration-300">
          <div className="flex justify-between items-center border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-black">MENU</h2>
            <X onClick={() => setIsMenuOpen(false)} size={32} />
          </div>
          <div className="flex flex-col gap-6">
            {['예약하기', '예약조회', '이용안내', '문의처'].map((item, i) => (
              <a 
                key={i} 
                href={`#${['reserve', 'lookup', 'guide', 'inquiry'][i]}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-black text-slate-900"
              >
                {item}
              </a>
            ))}
          </div>
          <button className="mt-auto w-full py-5 bg-knu-green text-white rounded-3xl text-xl font-bold">
            학생증 로그인
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
