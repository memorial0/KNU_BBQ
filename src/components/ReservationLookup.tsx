import { useState } from 'react'
import { Search, Calendar, MapPin, Clock, User, Phone } from 'lucide-react'
import { supabase } from '../supabase'

type ReservationRow = {
  id: string
  name: string
  student_id: string
  phone: string
  purpose: string | null
  reservation_date: string
  reservation_time: string
  zone: string
  people_count: number
  request_note: string | null
  status: string
  created_at: string
}

export default function ReservationLookup() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [results, setResults] = useState<ReservationRow[]>([])

  const handleLookup = async () => {
    setLoading(true)
    setMessage('')
    setResults([])

    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('name', name)
        .eq('phone', phone)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      if (!data || data.length === 0) {
        setMessage('조회된 예약 내역이 없습니다.')
      } else {
        setResults(data)
      }
    } catch (error: any) {
      console.error(error)
      setMessage('예약 조회 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lookup" className="py-24 bg-slate-50 scroll-mt-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
            예약 조회
          </h3>
          <p className="text-lg text-slate-500 font-medium">
            이름과 연락처를 입력해 예약 내역을 확인하세요.
          </p>
        </div>

        <div className="card max-w-3xl mx-auto p-8 sm:p-10 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 ml-1">예약자 이름</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="input-field pl-14"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-900 ml-1">연락처</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="input-field pl-14"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleLookup}
            disabled={loading || !name || !phone}
            className="btn-primary w-full py-5 text-lg disabled:opacity-50"
          >
            {loading ? '조회 중...' : '예약 조회하기'}
          </button>

          {message && (
            <div className="rounded-2xl bg-slate-100 px-5 py-4 text-sm font-bold text-slate-600">
              {message}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-10 grid gap-6 max-w-4xl mx-auto">
            {results.map((item) => (
              <div
                key={item.id}
                className="card p-8 border-2 border-slate-100 rounded-[2rem] bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h4 className="text-2xl font-black text-slate-900">
                    {item.name}님의 예약 내역
                  </h4>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700">
                    {item.status === 'confirmed' ? '예약 확정' : item.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                    <Calendar size={18} className="text-knu-green" />
                    <span className="font-bold text-slate-500">예약일</span>
                    <span className="ml-auto font-black text-slate-900">{item.reservation_date}</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                    <Clock size={18} className="text-knu-green" />
                    <span className="font-bold text-slate-500">예약시간</span>
                    <span className="ml-auto font-black text-slate-900">{item.reservation_time}</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                    <MapPin size={18} className="text-knu-green" />
                    <span className="font-bold text-slate-500">구역</span>
                    <span className="ml-auto font-black text-slate-900">{item.zone}</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                    <Search size={18} className="text-knu-green" />
                    <span className="font-bold text-slate-500">인원</span>
                    <span className="ml-auto font-black text-slate-900">{item.people_count}명</span>
                  </div>
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl border border-slate-100 px-4 py-4">
                    <span className="block text-slate-400 font-bold mb-1">학번</span>
                    <span className="font-black text-slate-900">{item.student_id}</span>
                  </div>

                  <div className="rounded-2xl border border-slate-100 px-4 py-4">
                    <span className="block text-slate-400 font-bold mb-1">이용 목적</span>
                    <span className="font-black text-slate-900">{item.purpose || '-'}</span>
                  </div>

                  <div className="rounded-2xl border border-slate-100 px-4 py-4 sm:col-span-2">
                    <span className="block text-slate-400 font-bold mb-1">요청사항</span>
                    <span className="font-black text-slate-900">{item.request_note || '없음'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}