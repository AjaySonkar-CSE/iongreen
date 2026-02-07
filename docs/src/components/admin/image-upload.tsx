"use client";

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUpload({ value, onChange, label = "Image", placeholder = "https://..." }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onChange(result.url);
        setPreviewUrl(result.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    setPreviewUrl(url);
  };

  const clearImage = () => {
    onChange('');
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        
        {/* URL Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder={placeholder}
          />
          {value && (
            <button
              type="button"
              onClick={clearImage}
              className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Or Upload Image</label>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-green-600"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Choose File
              </>
            )}
          </button>
          <span className="text-xs text-gray-500">JPG, PNG, WebP (Max 5MB)</span>
        </div>
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => {
              // Handle broken image links gracefully
              setPreviewUrl('');
            }}
          />
        </div>
      )}

      {!previewUrl && (
        <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400">
          <ImageIcon className="h-8 w-8 mb-2" />
          <span className="text-xs">No image selected</span>
        </div>
      )}
    </div>
  );
}