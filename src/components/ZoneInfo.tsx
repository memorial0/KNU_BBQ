import { Sparkles, Coffee, Users2 } from 'lucide-react';

const zones = [
  {
    id: 'A',
    title: 'A구역: 소규모 모임',
    desc: '조용하고 아늑한 분위기에서 소중한 사람들과 함께하세요. 연인이나 소규모 친구 모임에 적합합니다.',
    features: ['2-4인 최적', '독립된 공간', '나무 그늘 아래'],
    icon: <Sparkles className="text-emerald-500" size={24} />,
    color: 'border-emerald-500'
  },
  {
    id: 'B',
    title: 'B구역: 중앙/일반 모임',
    desc: '가장 활기찬 중앙 구역입니다. 접근성이 좋고 넓은 시야를 자랑하며 일반적인 친구들과의 모임에 좋습니다.',
    features: ['4-8인 권장', '매점/화장실 인접', '탁 트인 전망'],
    icon: <Coffee className="text-amber-500" size={24} />,
    color: 'border-amber-500'
  },
  {
    id: 'C',
    title: 'C구역: 단체 모임',
    desc: '동아리 엠티, 학과 행사 등 대규모 인원을 수용할 수 있는 넓은 공간입니다. 대형 테이블과 그릴이 완비되어 있습니다.',
    features: ['8-15인 수용', '대형 그릴 제공', '단체 레크리에이션 가능'],
    icon: <Users2 className="text-rose-500" size={24} />,
    color: 'border-rose-500'
  }
];

const ZoneInfo = () => {
  return (
    <section id="zones" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">구역 안내</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">모임의 성격과 인원에 맞는 최적의 구역을 선택해 보세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {zones.map((zone) => (
            <div key={zone.id} className={`card border-t-4 ${zone.color} flex flex-col h-full`}>
              <div className="mb-6 p-3 bg-slate-50 rounded-2xl w-fit">
                {zone.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{zone.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                {zone.desc}
              </p>
              <div className="space-y-2 mt-auto">
                {zone.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZoneInfo;
