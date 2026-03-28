import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Constants
const ZONES = ['A', 'B', 'C'] as const;
const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
];

interface Props {
  formData: any;
  setFormData: (data: any) => void;
}

interface ReservationData {
  reservation_date: string;
  reservation_time: string;
  zone: string;
}

// Dummy data for initial state/demo
const initialReservations: ReservationData[] = [
  { reservation_date: '2024-03-28', reservation_time: '10:00', zone: 'A' },
  { reservation_date: '2024-03-28', reservation_time: '10:00', zone: 'B' },
  { reservation_date: '2024-03-28', reservation_time: '10:00', zone: 'C' }, // 10:00 is full
];

export default function CalendarBooking({ formData, setFormData }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reservations] = useState<ReservationData[]>(initialReservations);
  const [, setIsLoading] = useState(false);

  // In a real app, you would fetch from Supabase here
  useEffect(() => {
    // Simulated fetch
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [currentMonth]);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }, [currentMonth]);

  const getSlotStatus = (dateStr: string, time: string) => {
    const count = reservations.filter(r => r.reservation_date === dateStr && r.reservation_time === time).length;
    return count >= ZONES.length ? 'full' : 'available';
  };

  const isDateFull = (dateStr: string) => {
    return TIME_SLOTS.every(slot => getSlotStatus(dateStr, slot) === 'full');
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (isPast(date) || isDateFull(dateStr)) return;
    setFormData({ ...formData, date: dateStr, slot: '' });
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

  const morningSlots = TIME_SLOTS.filter(t => parseInt(t.split(':')[0]) < 12);
  const afternoonSlots = TIME_SLOTS.filter(t => parseInt(t.split(':')[0]) >= 12);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="card border-none shadow-xl bg-white p-6 rounded-[2rem]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-knu-green" size={24} />
            <h4 className="text-xl font-black text-slate-900">
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </h4>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronLeft /></button>
            <button type="button" onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><ChevronRight /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <span key={d} className={cn("text-xs font-black uppercase tracking-widest", i === 0 ? "text-rose-500" : i === 6 ? "text-blue-500" : "text-slate-400")}>{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />;
            const dateStr = date.toISOString().split('T')[0];
            const isSelected = formData.date === dateStr;
            const past = isPast(date);
            const full = isDateFull(dateStr);

            return (
              <button
                key={dateStr}
                type="button"
                disabled={past || full}
                onClick={() => handleDateClick(date)}
                className={cn(
                  "relative h-14 sm:h-20 rounded-2xl flex flex-col items-center justify-center transition-all border-2",
                  isSelected ? "bg-knu-green border-knu-green text-white shadow-lg shadow-emerald-900/20 scale-105 z-10" : 
                  past ? "bg-slate-50 border-transparent text-slate-300 cursor-not-allowed" :
                  full ? "bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed" :
                  "bg-white border-slate-50 text-slate-700 hover:border-knu-green hover:text-knu-green"
                )}
              >
                <span className="text-lg font-black">{date.getDate()}</span>
                {full && !past && <span className="text-[10px] font-black text-rose-500">마감</span>}
                {isSelected && <span className="text-[10px] font-black opacity-80">선택됨</span>}
              </button>
            );
          })}
        </div>
      </div>

      {formData.date && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-knu-green" size={20} />
            <h4 className="text-xl font-black text-slate-900">시간 슬롯 선택</h4>
          </div>

          <div className="space-y-8">
            {[ 
              { label: '오전', slots: morningSlots },
              { label: '오후', slots: afternoonSlots }
            ].map((group) => (
              <div key={group.label} className="space-y-4">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                  {group.label} 슬롯
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {group.slots.map((slot) => {
                    const status = getSlotStatus(formData.date, slot);
                    const isBooked = status === 'full';
                    const isSelected = formData.slot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setFormData({ ...formData, slot })}
                        className={cn(
                          "py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all flex flex-col items-center gap-1",
                          isBooked ? "bg-slate-50 border-slate-50 text-slate-300 cursor-not-allowed" :
                          isSelected ? "bg-knu-green border-knu-green text-white shadow-md shadow-emerald-900/10" :
                          "bg-white border-slate-100 text-slate-600 hover:border-knu-green hover:text-knu-green"
                        )}
                      >
                        {slot}
                        <span className="text-[9px] font-black uppercase tracking-tighter">
                          {isBooked ? 'Full' : isSelected ? 'Selected' : 'Available'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!formData.date && (
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400">
          <AlertCircle size={32} className="mb-2 opacity-20" />
          <p className="font-bold">달력에서 먼저 날짜를 선택해주세요</p>
        </div>
      )}
    </div>
  );
}
