import { Users, Clock, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const zones = [
  { id: 'A', name: 'A구역', capacity: '2-4인', status: 'available', statusText: '예약 가능', color: 'bg-emerald-500' },
  { id: 'B', name: 'B구역', capacity: '4-8인', status: 'warning', statusText: '마감 임박', color: 'bg-amber-500' },
  { id: 'C', name: 'C구역', capacity: '8-15인', status: 'closed', statusText: '예약 마감', color: 'bg-rose-500' },
];

const AvailabilityStatus = () => {
  return (
    <section id="availability" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-knu-green font-bold text-sm tracking-wider uppercase mb-2 block">Real-time Status</span>
            <h3 className="text-3xl font-bold text-slate-900">실시간 구역 현황</h3>
            <p className="text-slate-600 mt-2">현재 시간 기준, 실시간 구역별 예약 상태입니다.</p>
          </div>
          <div className="flex gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span> 예약 가능
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span> 마감 임박
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span> 예약 마감
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <div key={zone.id} className="card group relative overflow-hidden border-none shadow-md hover:translate-y-[-4px]">
              <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10", zone.color)}></div>
              
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm border border-slate-100">
                  {zone.id}
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold border",
                  zone.status === 'available' && "bg-emerald-50 text-emerald-700 border-emerald-100",
                  zone.status === 'warning' && "bg-amber-50 text-amber-700 border-amber-100",
                  zone.status === 'closed' && "bg-rose-50 text-rose-700 border-rose-100"
                )}>
                  {zone.statusText}
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-2">{zone.name}</h4>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users size={16} className="text-slate-400" />
                  수용 인원: {zone.capacity}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} className="text-slate-400" />
                  이용 시간: 최대 4시간
                </div>
              </div>

              {zone.status !== 'closed' ? (
                <a href="#reserve" className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                  지금 바로 예약
                </a>
              ) : (
                <button disabled className="w-full py-3 bg-slate-100 text-slate-400 rounded-xl text-sm font-bold cursor-not-allowed">
                  다음에 이용해 주세요
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 bg-white rounded-2xl border border-slate-100 flex items-start gap-3 shadow-sm">
          <AlertCircle className="text-amber-500 shrink-0" size={20} />
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-900">안내:</span> 예약 현황은 1분마다 자동으로 업데이트됩니다. 대규모 학과 행사의 경우 최소 일주일 전 학과사무실을 통해 공문으로 신청하시기 바랍니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityStatus;
