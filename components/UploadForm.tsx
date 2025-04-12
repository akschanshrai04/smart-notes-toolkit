'use client';

import { useState, useRef, DragEvent } from 'react';
import { useUpload } from '@/context/UploadContext';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { setUploadData } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setStatus('Uploading...');

    const formData = new FormData();
    formData.append('pdf', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setStatus(data.message || 'Upload complete');

    console.log(data);

    setUploadData({
      pdfName: data.pdfname,
      pdfUrl: data.publicUrl,
    });

    setIsUploading(false);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-6 transition-all duration-300">
      <div 
        className={`border-2 border-dashed ${isDragging ? 'border-blue-400 bg-gray-700' : 'border-gray-600'} rounded-lg p-10 mb-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg className="w-12 h-12 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-blue-400 text-center">Drag and drop PDF here</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>
      
      {file && (
        <div className="mt-2 mb-4 text-blue-300 animate-fadeIn">
          <p>Selected file: {file.name}</p>
        </div>
      )}
      
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 w-full flex items-center justify-center"
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          'Upload PDF'
        )}
      </button>
      
      {status && (
        <p className="mt-3 text-sm text-blue-300 animate-fadeIn">{status}</p>
      )}
    </div>
  );
}
