import { useState, FormEvent } from 'react';
import { Search, Calendar, MapPin, Clock } from 'lucide-react';

function ReservationLookup() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1000);
  };

  return (
    <section id="lookup" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">예약 내역 조회</h3>
          <p className="text-slate-600">신청하신 예약 내역을 실시간으로 확인할 수 있습니다.</p>
        </div>

        <div className="card shadow-lg p-8 sm:p-10 mb-8 border-b-8 border-slate-900">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
            <div className="space-y-2 sm:col-span-1">
              <label className="text-sm font-bold text-slate-700 ml-1">예약자 이름</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동" 
                className="input-field" 
              />
            </div>
            <div className="space-y-2 sm:col-span-1">
              <label className="text-sm font-bold text-slate-700 ml-1">연락처</label>
              <input 
                required
                type="tel" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="010-1234-5678" 
                className="input-field" 
              />
            </div>
            <button 
              disabled={isSearching}
              type="submit" 
              className="w-full btn-primary h-[50px] flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search size={20} />
              )}
              조회하기
            </button>
          </form>
        </div>

        {showResult && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-xl mb-4 border border-emerald-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              최근 1건의 예약 내역이 있습니다.
            </div>
            <div className="card border-l-4 border-knu-green p-6 relative overflow-hidden group">
              <div className="absolute top-4 right-6 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-black rounded-full uppercase tracking-widest">
                승인 대기
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-black text-slate-400">Reservation Date</span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Calendar size={16} className="text-knu-green" />
                    2024년 4월 15일
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-black text-slate-400">Time Slot</span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Clock size={16} className="text-knu-green" />
                    17:00 ~ 21:00
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-black text-slate-400">Reserved Zone</span>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <MapPin size={16} className="text-knu-green" />
                    B구역 (중앙)
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-black text-slate-400">Action</span>
                  <button className="text-xs font-bold text-rose-500 hover:text-rose-700 underline text-left transition-colors">
                    예약 취소 신청
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReservationLookup;
