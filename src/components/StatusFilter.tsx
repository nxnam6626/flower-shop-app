'use client'

export default function StatusFilter({ 
  currentStatus 
}: { 
  currentStatus: string 
}) {
  const filters = [
    { label: 'Tất cả', value: 'ALL', color: 'gray' },
    { label: 'Mới', value: 'NEW', color: 'blue' },
    { label: 'Đã xong', value: 'DONE', color: 'green' },
  ]

  const handleFilterChange = (value: string) => {
    // Force full page reload to fetch new data from server
    window.location.href = `/consultations?status=${value}`
  }

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {filters.map((filter) => {
        const isActive = currentStatus === filter.value
        
        return (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
              isActive
                ? filter.color === 'blue'
                  ? 'bg-blue-500 text-white'
                  : filter.color === 'green'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
