'use client'

export default function TagFilter({ 
  tags,
  currentTag 
}: { 
  tags: string[]
  currentTag?: string
}) {
  const handleFilterChange = (tag?: string) => {
    if (tag) {
      window.location.href = `/gallery?tag=${encodeURIComponent(tag)}`
    } else {
      window.location.href = '/gallery'
    }
  }

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      <button
        onClick={() => handleFilterChange()}
        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
          !currentTag
            ? 'bg-gray-800 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        }`}
      >
        Tất cả
      </button>
      
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleFilterChange(tag)}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
            currentTag === tag
              ? 'bg-pink-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
