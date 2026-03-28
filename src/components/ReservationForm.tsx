import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, School, ShieldAlert, MapPin } from 'lucide-react';
import CalendarBooking from './CalendarBooking';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types for reservation
type Zone = 'A' | 'B' | 'C';

interface ReservationState {
  date: string;
  zone: Zone;
  slot: string;
  name: string;
  studentId: string;
  contact: string;
  college: string;
  clubName: string;
  purpose: string;
  peopleCount: number;
  agree: boolean;
}

// Dummy data for already booked slots
const bookedSlots = [
  { date: '2024-03-28', zone: 'A', slot: '10:00' },
  { date: '2024-03-28', zone: 'B', slot: '10:00' },
  { date: '2024-03-28', zone: 'C', slot: '10:00' },
];

function ReservationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReservationState>({
    date: '',
    zone: 'A',
    slot: '',
    name: '',
    studentId: '',
    contact: '',
    college: '',
    clubName: '',
    purpose: '개인 모임',
    peopleCount: 4,
    agree: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="reserve" className="py-24 bg-white scroll-mt-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="card text-center py-20 px-10 border-4 border-emerald-100 bg-emerald-50/20 rounded-[2.5rem]">
            <div className="w-24 h-24 bg-knu-green text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-900/20 animate-in zoom-in-50 duration-500">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">예약 신청이 완료되었습니다!</h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              신청하신 내역은 관리자 승인 후 최종 확정됩니다.<br />
              확정 결과는 입력하신 연락처로 알림톡이 전송됩니다.
            </p>
            <div className="p-6 bg-white rounded-[2rem] border-2 border-slate-100 mb-10 text-left space-y-3">
              <div className="flex justify-between font-bold"><span className="text-slate-400">날짜</span> {formData.date}</div>
              <div className="flex justify-between font-bold"><span className="text-slate-400">구역</span> {formData.zone}구역</div>
              <div className="flex justify-between font-bold"><span className="text-slate-400">시간</span> {formData.slot}</div>
            </div>
            <button 
              onClick={() => { setIsSuccess(false); setStep(1); }}
              className="btn-primary w-full max-w-sm mx-auto py-5"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="py-24 bg-white scroll-mt-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tighter">실시간 예약하기</h3>
          <p className="text-lg text-slate-500 font-medium">비어있는 구역과 시간을 확인하고 바로 예약하세요.</p>
        </div>

        {/* Multi-step indicator */}
        <div className="flex items-center justify-center gap-6 mb-16">
          {[1, 2, 3].map((i) => (
            <Fragment key={i}>
              <div className={`flex items-center gap-3 transition-all ${step >= i ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center font-black text-xl shadow-lg transition-all ${
                  step === i ? 'bg-knu-green text-white scale-110 shadow-emerald-900/20' : 
                  step > i ? 'bg-emerald-100 text-knu-green' : 'bg-slate-100 text-slate-400 shadow-none'
                }`}>
                  {step > i ? <CheckCircle2 size={24} /> : i}
                </div>
                <div className="hidden sm:block">
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Step 0{i}</span>
                  <span className="text-sm font-black text-slate-900">{['날짜 및 슬롯', '상세 정보', '최종 확인'][i-1]}</span>
                </div>
              </div>
              {i < 3 && <div className={`w-8 h-1 rounded-full ${step > i ? 'bg-emerald-200' : 'bg-slate-100'}`} />}
            </Fragment>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-12">
            {step === 1 && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                <CalendarBooking 
                  formData={formData} 
                  setFormData={setFormData} 
                />
                
                {formData.slot && (
                  <div className="space-y-6 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                    <label className="text-xl font-black text-slate-900 flex items-center gap-2">
                      <MapPin size={24} className="text-knu-green" />
                      마지막 단계: 구역 선택
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(['A', 'B', 'C'] as const).map((zone) => {
                        const isZoneBooked = bookedSlots.some(
                          b => b.date === formData.date && b.slot === formData.slot && b.zone === zone
                        );
                        
                        return (
                          <button
                            key={zone}
                            type="button"
                            disabled={isZoneBooked}
                            onClick={() => setFormData({ ...formData, zone })}
                            className={cn(
                              "p-6 rounded-[2rem] border-2 font-bold transition-all flex flex-col items-center gap-2",
                              isZoneBooked ? "bg-slate-50 text-slate-200 border-transparent cursor-not-allowed" :
                              formData.zone === zone ? "bg-slate-900 text-white border-slate-900 shadow-xl scale-105" :
                              "bg-white text-slate-600 border-slate-100 hover:border-knu-green hover:text-knu-green"
                            )}
                          >
                            <span className="text-2xl font-black">{zone} 구역</span>
                            <span className="text-xs uppercase tracking-widest opacity-60 font-black">
                              {isZoneBooked ? 'Already Booked' : 'Selectable'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="pt-8">
                  <button 
                    type="button"
                    disabled={!formData.date || !formData.slot || !formData.zone}
                    onClick={() => setStep(2)}
                    className="btn-primary w-full py-6 text-xl disabled:opacity-50 shadow-2xl shadow-emerald-900/20"
                  >
                    예약자 정보 입력하기
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card p-12 space-y-10 animate-in fade-in slide-in-from-right-8 duration-500 rounded-[2.5rem] bg-white shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 ml-1 uppercase tracking-widest">이름</label>
                    <input required name="name" value={formData.name} onChange={handleChange} placeholder="성함을 입력해주세요" className="input-field" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 ml-1 uppercase tracking-widest">학번</label>
                    <input required name="studentId" value={formData.studentId} onChange={handleChange} placeholder="학번을 입력해주세요" className="input-field" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 ml-1 uppercase tracking-widest">연락처</label>
                    <input required name="contact" value={formData.contact} onChange={handleChange} placeholder="010-0000-0000" className="input-field" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 ml-1 uppercase tracking-widest">소속 단과대/학과</label>
                    <div className="relative">
                      <School className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input required name="college" value={formData.college} onChange={handleChange} placeholder="IT대학 컴퓨터공학과" className="input-field pl-14" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 ml-1 uppercase tracking-widest">동아리명 (선택)</label>
                    <input name="clubName" value={formData.clubName} onChange={handleChange} placeholder="소속 동아리가 있다면 적어주세요" className="input-field" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 ml-1 uppercase tracking-widest">사용 목적</label>
                    <select name="purpose" value={formData.purpose} onChange={handleChange} className="input-field bg-slate-50">
                      <option>개인 모임</option>
                      <option>동아리 모임</option>
                      <option>학과 행사</option>
                      <option>기타</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-6 pt-8">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 btn-secondary py-5 text-xl">이전으로</button>
                  <button type="button" onClick={() => setStep(3)} className="flex-[2] btn-primary py-5 text-xl">다음 단계로</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card p-12 space-y-10 animate-in fade-in slide-in-from-right-8 duration-500 rounded-[2.5rem] bg-white shadow-xl">
                <div className="bg-slate-50 rounded-[2rem] p-10 border-2 border-slate-100">
                  <h4 className="text-2xl font-black text-slate-900 mb-8 border-b-2 border-slate-200 pb-4 tracking-tighter">예약 정보 최종 확인</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="font-bold text-slate-400">신청자</span> <span className="font-black">{formData.name} ({formData.studentId})</span></div>
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="font-bold text-slate-400">연락처</span> <span className="font-black">{formData.contact}</span></div>
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="font-bold text-slate-400">예약일자</span> <span className="font-black">{formData.date}</span></div>
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="font-bold text-slate-400">구역/시간</span> <span className="font-black">{formData.zone}구역 / {formData.slot}</span></div>
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="font-bold text-slate-400">소속</span> <span className="font-black">{formData.college}</span></div>
                    <div className="flex justify-between border-b border-slate-200 pb-2"><span className="font-bold text-slate-400">이용인원</span> <span className="font-black">{formData.peopleCount}명</span></div>
                  </div>
                </div>

                <div className="bg-rose-50 rounded-[2rem] p-8 border-2 border-rose-100 flex items-start gap-4">
                  <ShieldAlert className="text-rose-500 shrink-0 mt-1" size={24} />
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-rose-700 leading-relaxed">
                      모두의 안전과 쾌적한 캠퍼스 환경을 위해 쓰레기 분리배출 및 화기 사용 주의사항을 엄격히 준수할 것에 동의합니다. 
                      시설 훼손이나 안전 사고 발생 시 예약자 본인에게 책임이 있음을 확인합니다.
                    </p>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        required
                        type="checkbox" 
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="w-6 h-6 rounded-lg border-rose-300 text-rose-500 focus:ring-rose-500 transition-all" 
                      />
                      <span className="text-base font-black text-rose-900 group-hover:underline">위 내용을 숙지하였으며 준수할 것을 동의합니다.</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-6 pt-8">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 btn-secondary py-5 text-xl">이전으로</button>
                  <button 
                    disabled={isSubmitting || !formData.agree}
                    type="submit"
                    className="flex-[2] btn-primary py-5 text-xl disabled:opacity-50 shadow-2xl shadow-emerald-900/20"
                  >
                    {isSubmitting ? '처리 중...' : '예약 최종 신청'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReservationForm;
