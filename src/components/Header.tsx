import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-knu-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">KNU</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              강원대학교 <span className="text-knu-green">바베큐장 예약</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#reserve" className="text-sm font-medium text-slate-600 hover:text-knu-green transition-colors">예약하기</a>
            <a href="#lookup" className="text-sm font-medium text-slate-600 hover:text-knu-green transition-colors">예약조회</a>
            <a href="#guide" className="text-sm font-medium text-slate-600 hover:text-knu-green transition-colors">이용안내</a>
            <a href="#inquiry" className="text-sm font-medium text-slate-600 hover:text-knu-green transition-colors">문의</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
              <User size={18} />
              로그인
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors">
              관리자
            </button>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          <a href="#reserve" className="block text-lg font-medium text-slate-900 py-2">예약하기</a>
          <a href="#lookup" className="block text-lg font-medium text-slate-900 py-2">예약조회</a>
          <a href="#guide" className="block text-lg font-medium text-slate-900 py-2">이용안내</a>
          <a href="#inquiry" className="block text-lg font-medium text-slate-900 py-2">문의</a>
          <div className="pt-4 flex flex-col gap-3 border-t border-slate-50">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-700 bg-slate-50 rounded-xl">
              <User size={18} />
              로그인
            </button>
            <button className="w-full px-4 py-3 text-white bg-slate-900 rounded-xl">
              관리자
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
