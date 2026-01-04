import { getConsultations } from '@/actions/consultations'
import ConsultationCard from '@/components/ConsultationCard'
import StatusFilter from '@/components/StatusFilter'
import { MessageSquare } from 'lucide-react'

// Force dynamic rendering to ensure searchParams are always fresh
export const dynamic = 'force-dynamic'

export default async function ConsultationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: 'NEW' | 'DONE' | 'ALL' }>
}) {
  const params = await searchParams
  const status = params.status || 'NEW'
  const consultations = await getConsultations(status)

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <MessageSquare size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Yêu cầu tư vấn</h1>
              <p className="text-gray-600 text-sm">Quản lý các yêu cầu từ khách hàng</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <StatusFilter currentStatus={status} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{consultations.length}</div>
              <div className="text-sm text-gray-600">
                {status === 'ALL' ? 'Tổng số yêu cầu' : 
                 status === 'NEW' ? 'Yêu cầu mới' : 'Đã hoàn thành'}
              </div>
            </div>
          </div>
          
          {status === 'NEW' && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 shadow-sm border border-red-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {consultations.filter(c => {
                    if (!c.deliveryDate) return false
                    const days = Math.floor((new Date(c.deliveryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                    return days <= 3 && days >= 0
                  }).length}
                </div>
                <div className="text-sm text-red-700 font-medium">
                  🔴 Cần giao gấp (≤3 ngày)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* List */}
        {consultations.length > 0 ? (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <ConsultationCard key={consultation.id} consultation={consultation} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chưa có yêu cầu nào
            </h3>
            <p className="text-gray-600">
              {status === 'NEW' 
                ? 'Chưa có yêu cầu tư vấn mới' 
                : status === 'DONE'
                ? 'Chưa có yêu cầu nào được đánh dấu hoàn thành'
                : 'Chưa có yêu cầu tư vấn nào'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
