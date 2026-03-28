import { useState, Fragment, type ChangeEvent, type FormEvent } from 'react';
import { Calendar, Users, Info, MapPin, CheckCircle2 } from 'lucide-react';

const ReservationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    contact: '',
    purpose: '개인모임',
    date: '',
    time: '',
    peopleCount: '2-4인',
    zone: 'A',
    request: '',
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="reserve" className="py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card text-center py-12 px-6 border-2 border-emerald-100 bg-emerald-50/30">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">예약 신청 완료!</h3>
            <p className="text-slate-600 mb-8">
              예약 신청이 정상적으로 접수되었습니다.<br />
              관리자의 승인 후 카카오톡 또는 문자로 확정 안내가 전송됩니다.
            </p>
            <button 
              onClick={() => { setIsSuccess(false); setStep(1); }}
              className="btn-primary"
            >
              확인
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">바베큐장 예약하기</h3>
          <p className="text-slate-600">간편하게 정보를 입력하고 즐거운 모임을 준비하세요.</p>
        </div>

        {/* Multi-step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((i) => (
            <Fragment key={i}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step === i ? 'bg-knu-green text-white scale-110 shadow-lg' : 
                step > i ? 'bg-emerald-100 text-knu-green' : 'bg-slate-100 text-slate-400'
              }`}>
                {step > i ? <CheckCircle2 size={20} /> : i}
              </div>
              {i < 3 && <div className={`w-12 h-1 rounded-full ${step > i ? 'bg-emerald-100' : 'bg-slate-100'}`} />}
            </Fragment>
          ))}
        </div>

        <div className="card shadow-xl border-t-8 border-knu-green p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">예약자 이름</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="홍길동" 
                      className="input-field" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">학번</label>
                    <input 
                      required
                      type="text" 
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="202412345" 
                      className="input-field" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">연락처</label>
                  <input 
                    required
                    type="tel" 
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="010-1234-5678" 
                    className="input-field" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">사용 목적</label>
                  <select 
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="input-field bg-white"
                  >
                    <option>개인모임</option>
                    <option>동아리모임</option>
                    <option>학과행사</option>
                    <option>기타</option>
                  </select>
                </div>
                <div className="pt-4">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full btn-primary"
                  >
                    다음 단계로
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">예약 날짜</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <input 
                        required
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input-field pl-12" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">예약 시간</label>
                    <select 
                      required
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="input-field bg-white"
                    >
                      <option value="">시간 선택</option>
                      <option>12:00 ~ 16:00 (오후)</option>
                      <option>17:00 ~ 21:00 (저녁)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">이용 인원</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <select 
                        name="peopleCount"
                        value={formData.peopleCount}
                        onChange={handleChange}
                        className="input-field pl-12 bg-white"
                      >
                        <option>2-4인</option>
                        <option>4-8인</option>
                        <option>8-15인</option>
                        <option>15인 이상 (학과전용)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">구역 선택</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <select 
                        name="zone"
                        value={formData.zone}
                        onChange={handleChange}
                        className="input-field pl-12 bg-white"
                      >
                        <option value="A">A구역 (소규모)</option>
                        <option value="B">B구역 (중앙)</option>
                        <option value="C">C구역 (단체)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary"
                  >
                    이전으로
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-[2] btn-primary"
                  >
                    다음 단계로
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">요청사항</label>
                  <textarea 
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    rows={4}
                    placeholder="특별히 요청할 사항이 있다면 적어주세요." 
                    className="input-field resize-none"
                  ></textarea>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Info size={16} className="text-knu-green" />
                    <span className="text-xs font-bold text-slate-700">개인정보 수집 및 이용 동의</span>
                  </div>
                  <div className="text-[10px] text-slate-500 leading-relaxed overflow-y-auto max-h-24 p-2 bg-white border border-slate-100 rounded-lg">
                    강원대학교 바베큐장 예약 시스템은 예약 처리를 위해 이름, 학번, 연락처를 수집합니다. 
                    수집된 정보는 예약 확인 및 관련 안내 발송을 위해 사용되며, 이용 종료 후 1년간 보관됩니다. 
                    동의를 거부하실 수 있으나, 이 경우 예약 서비스 이용이 제한됩니다.
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      required
                      type="checkbox" 
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-slate-300 text-knu-green focus:ring-knu-green transition-all" 
                    />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">개인정보 수집에 동의합니다. (필수)</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 btn-secondary"
                  >
                    이전으로
                  </button>
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="flex-[2] btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        처리 중...
                      </>
                    ) : '예약 신청하기'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
