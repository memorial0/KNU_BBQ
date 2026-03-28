import { useState } from 'react';
import { Mail, Send, MessageSquare, Building, User, Phone, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xgolpvjd', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <section id="inquiry" className="py-24 bg-slate-50 scroll-mt-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="card text-center py-16 px-10 border-4 border-emerald-100 bg-emerald-50/20 animate-in zoom-in-50 duration-500 rounded-[2.5rem]">
            <div className="w-20 h-20 bg-knu-green text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-900/20">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">문의가 성공적으로 전달되었습니다!</h3>
            <p className="text-slate-600 mb-8 font-medium">검토 후 기재해주신 연락처/이메일로 신속히 답변 드리겠습니다.</p>
            <button 
              onClick={() => setStatus('IDLE')}
              className="btn-primary px-10 py-4 mx-auto"
            >
              새 문의 작성하기
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="py-24 bg-slate-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* 안내 텍스트 */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-knu-green/10 text-knu-green rounded-2xl text-sm font-black uppercase tracking-widest">
            <MessageSquare size={16} /> Partnership & Inquiry
          </div>
          <h3 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            강원대학교 바베큐장<br />
            <span className="text-knu-green underline decoration-emerald-200 decoration-8 underline-offset-8">제휴 및 이용 문의</span>
          </h3>
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-lg">
            서비스 이용 불편 사항, 대규모 행사 예약, 혹은 기업/브랜드 제휴 문의를 남겨주세요. 
            담당 부서에서 확인 후 빠르게 연락드리겠습니다.
          </p>
          
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-knu-green shadow-inner">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                <p className="font-bold text-slate-900">npcsun2@daum.net</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-knu-green shadow-inner">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tel</p>
                <p className="font-bold text-slate-900">010-2912-4505 (담당: 심현수)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formspree 연결 폼 */}
        <div className="card shadow-2xl shadow-emerald-900/5 p-10 relative overflow-hidden bg-white rounded-[2.5rem]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-knu-green/5 rounded-full -mr-16 -mt-16"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">담당자명</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input required type="text" name="name" placeholder="홍길동" className="input-field pl-12 py-3.5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">소속/업체명</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input required type="text" name="organization" placeholder="OO대학교 / OO브랜드" className="input-field pl-12 py-3.5" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">이메일 주소</label>
              <input required type="email" name="email" placeholder="example@knu.ac.kr" className="input-field py-3.5" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">문의 내용</label>
              <textarea 
                required 
                name="message" 
                rows={5} 
                placeholder="제휴 제안이나 문의하실 내용을 자세히 적어주세요." 
                className="input-field resize-none py-4"
              ></textarea>
            </div>

            <button 
              disabled={status === 'SUBMITTING'}
              type="submit" 
              className="btn-primary w-full py-5 text-xl group disabled:opacity-50"
            >
              {status === 'SUBMITTING' ? '전송 중...' : '문의 보내기'}
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {status === 'ERROR' && (
              <p className="text-center text-rose-500 font-bold text-sm animate-pulse">
                오류가 발생했습니다. 잠시 후 다시 시도해주세요.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
