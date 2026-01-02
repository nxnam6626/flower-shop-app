'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Camera, Image as ImageIcon, X } from 'lucide-react'

interface ImageUploadProps {
  name: string
  required?: boolean
  onChange?: (file: File | null) => void
}

export default function ImageUpload({ name, required, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
      onChange?.(file)
    }
  }

  const clearImage = () => {
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (cameraInputRef.current) cameraInputRef.current.value = ''
    onChange?.(null)
  }

  return (
    <div>
      {preview ? (
        // Preview mode
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        // Upload buttons
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition"
          >
            <Camera size={32} className="text-gray-400" />
            <span className="text-sm font-medium">Chụp ảnh</span>
          </button>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <ImageIcon size={32} className="text-gray-400" />
            <span className="text-sm font-medium">Chọn từ thư viện</span>
          </button>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        name={name}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        required={required && !preview}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
