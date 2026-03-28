import { AlertTriangle, Clock, Trash2, ShieldCheck, UserCheck } from 'lucide-react';

const rules = [
  { icon: <UserCheck className="text-emerald-500" />, title: '예약은 선착순', desc: '강원대학교 구성원 우선 이용이며 선착순으로 확정됩니다.' },
  { icon: <Clock className="text-blue-500" />, title: '이용 시간 준수', desc: '다음 팀을 위해 예약 종료 10분 전 정리를 완료해 주세요.' },
  { icon: <ShieldCheck className="text-emerald-500" />, title: '화기 안전 수칙', desc: '제공된 그릴 외 개인 화기는 반입 불가하며 소화기 위치를 확인하세요.' },
  { icon: <Trash2 className="text-rose-500" />, title: '쓰레기 정리 필수', desc: '음식물 및 쓰레기는 분리배출 장소에 반드시 정리해 주세요.' },
  { icon: <AlertTriangle className="text-amber-500" />, title: '노쇼 금지', desc: '사전 연락 없는 노쇼 및 당일 취소 시 향후 이용이 제한됩니다.' },
];

const UsageGuide = () => {
  return (
    <section id="guide" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">이용 안내 및 수칙</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              모두가 즐겁고 안전한 캠퍼스 생활을 위해 아래 안전 수칙과 이용 안내를 반드시 숙지해 주시기 바랍니다.
            </p>
            <div className="p-6 bg-knu-green text-white rounded-3xl shadow-xl shadow-knu-green/20 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <h4 className="text-xl font-bold mb-2">도움이 필요하신가요?</h4>
              <p className="text-emerald-50/80 text-sm mb-6 leading-relaxed">예약 관련 문의나 시설 이용 불편 사항은 아래 번호로 연락주세요.</p>
              <div className="text-2xl font-black">033-250-XXXX</div>
              <div className="text-xs mt-2 text-emerald-100">운영시간: 평일 09:00 ~ 18:00</div>
            </div>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rules.map((rule, i) => (
              <div key={i} className="card p-5 border-none shadow-sm flex gap-4 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {rule.icon}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">{rule.title}</h5>
                  <p className="text-sm text-slate-500 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsageGuide;
