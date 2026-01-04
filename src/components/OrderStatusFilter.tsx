'use client'

export default function OrderStatusFilter({ currentStatus }: { currentStatus: string }) {
  const filters = [
    { value: 'ALL', label: 'Tất cả' },
    { value: 'PENDING', label: 'Chờ xác nhận' },
    { value: 'CONFIRMED', label: 'Đã xác nhận' },
    { value: 'DELIVERING', label: 'Đang giao' },
    { value: 'COMPLETED', label: 'Hoàn thành' },
  ]

  return (
    <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 flex gap-2 overflow-x-auto">
      {filters.map((tab) => (
        <button
          key={tab.value}
          onClick={() => window.location.href = `/orders?status=${tab.value}`}
          className={`flex-1 min-w-fit px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            currentStatus === tab.value
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
