import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
      {/* Decorative elements for festival vibe */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-knu-green rounded-full blur-[120px] opacity-20 animate-pulse delay-700"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center sm:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-knu-green rounded-2xl mb-8 border border-emerald-100 animate-bounce shadow-sm">
            <Sparkles size={16} className="fill-knu-green" />
            <span className="text-sm font-black tracking-tight uppercase">2024 Campus Spring Festival</span>
          </div>
          
          <h2 className="text-5xl sm:text-7xl font-[900] text-slate-900 leading-[1.1] tracking-tighter mb-8">
            모두가 즐거운<br />
            <span className="text-knu-green underline decoration-emerald-200 decoration-8 underline-offset-8">KNU 바베큐 파티</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-12 max-w-xl">
            춘천 캠퍼스의 산뜻한 바람과 함께 즐기는 최고의 식사 시간.<br className="hidden sm:block" />
            동아리, 학과, 학생회 모임을 위한 실시간 예약 시스템을 지금 바로 이용해 보세요!
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#reserve" className="btn-primary py-5 px-10 text-lg group">
              예약하러 가기
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#guide" className="btn-secondary py-5 px-10 text-lg">
              이용안내 보기
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-slate-400 font-bold text-sm uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-knu-green" />
              Chuncheon Campus
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            <div>Only for KNU Members</div>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/20 border-8 border-white group">
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="BBQ Party" 
              className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Photo by Campus Life</div>
              <div className="text-2xl font-black">봄맞이 대축제 바베큐 현장</div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full flex flex-col items-center justify-center border-4 border-white shadow-xl rotate-12 animate-in zoom-in-50 duration-500">
            <span className="text-[10px] font-black uppercase tracking-tighter text-yellow-900">Only Today</span>
            <span className="text-3xl font-black text-yellow-900 leading-none">FREE</span>
            <span className="text-[10px] font-black uppercase tracking-tighter text-yellow-900">Rental</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
