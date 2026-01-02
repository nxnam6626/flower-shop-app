'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const SUGGESTED_TAGS = [
  'Hoa cưới', 'Sinh nhật', 'Khai trương', 'Tốt nghiệp',
  'Valentine', 'Lễ tết', 'Tone đỏ', 'Tone trắng', 
  'Tone hồng', 'Tone vàng', 'Giá rẻ', 'Cao cấp'
]

interface TagSelectorProps {
  name: string
  value?: string[]
  onChange?: (tags: string[]) => void
}

export default function TagSelector({ name, value, onChange }: TagSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(value || [])
  const [customTag, setCustomTag] = useState('')

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    onChange?.(newTags)
  }

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      const newTags = [...selectedTags, customTag.trim()]
      setSelectedTags(newTags)
      onChange?.(newTags)
      setCustomTag('')
    }
  }

  return (
    <div className="space-y-3">
      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => toggleTag(tag)}
                className="hover:bg-pink-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Suggested tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Chọn tags:</label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                selectedTags.includes(tag)
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-pink-500'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Custom tag input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hoặc thêm tag tùy chỉnh:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
            placeholder="VD: 300k-500k"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900"
          >
            Thêm
          </button>
        </div>
      </div>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selectedTags.join(',')} />
    </div>
  )
}
