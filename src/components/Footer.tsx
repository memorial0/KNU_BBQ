import { ExternalLink, Instagram, Facebook, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-knu-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">KNU</span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                강원대학교 <span className="text-knu-green">바베큐장 예약</span>
              </h1>
            </div>
            <p className="max-w-md text-sm leading-relaxed mb-6">
              강원대학교 학생들의 즐겁고 건전한 캠퍼스 문화를 응원합니다. 
              본 서비스는 대학 구성원들의 편의를 위해 운영되는 공식 예약 시스템입니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-knu-green hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-knu-green hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-knu-green hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">바로가기</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#reserve" className="hover:text-knu-green transition-colors">예약하기</a></li>
              <li><a href="#lookup" className="hover:text-knu-green transition-colors">예약조회</a></li>
              <li><a href="#guide" className="hover:text-knu-green transition-colors">이용안내</a></li>
              <li><a href="#" className="flex items-center gap-1 hover:text-knu-green transition-colors">
                강원대학교 홈페이지 <ExternalLink size={14} />
              </a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">문의처</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="block text-xs font-black text-slate-500 uppercase mb-1">Office</span>
                학생지원처 복지팀
              </li>
              <li>
                <span className="block text-xs font-black text-slate-500 uppercase mb-1">Tel</span>
                033-250-XXXX
              </li>
              <li>
                <span className="block text-xs font-black text-slate-500 uppercase mb-1">Hours</span>
                평일 09:00 - 18:00 (점심시간 12:00-13:00)
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 Kangwon National University BBQ Reservation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
