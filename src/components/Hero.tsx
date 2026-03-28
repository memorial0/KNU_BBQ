import { ArrowRight, Info, CalendarCheck } from 'lucide-react';

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* Background blobs for visual interest */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 blur-3xl opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-knu-green rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-knu-light text-knu-green text-xs font-bold mb-6 border border-emerald-100 uppercase tracking-wider animate-bounce">
          <CalendarCheck size={14} />
          오늘의 예약 가능 여부: 여유
        </div>
        
        <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          강원대학교 <br className="sm:hidden" />
          <span className="text-knu-green">바베큐장 예약</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
          학생, 동아리, 학과 모임을 위한 캠퍼스 안의 힐링 공간.<br className="hidden sm:block" />
          한눈에 확인하고 손쉽게 예약하는 강원대학교 구성원 전용 바베큐 서비스입니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#reserve" className="btn-primary flex items-center gap-2 group">
            예약하러 가기
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#guide" className="btn-secondary flex items-center gap-2">
            이용안내 보기
            <Info size={20} />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
          {[
            { title: "편리한 예약", desc: "모바일과 PC 어디서나 실시간 예약 현황을 확인하세요." },
            { title: "다양한 구역", desc: "소규모부터 대규모 단체까지 수용 가능한 3가지 구역 제공." },
            { title: "캠퍼스 힐링", desc: "멀리 나가지 않아도 학교 안에서 즐기는 즐거운 식사 시간." },
          ].map((item, i) => (
            <div key={i} className="card border-0 bg-white/50 backdrop-blur-sm border-t-4 border-knu-green">
              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
