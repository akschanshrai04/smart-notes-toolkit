'use client';

import { useState } from 'react';
import { useUpload } from '@/context/UploadContext';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const { setUploadData } = useUpload();

  const handleUpload = async () => {
    if (!file) return;

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
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">📄 Upload a PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2 border px-2 py-1 rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
      <p className="mt-3 text-sm">{status}</p>
    </div>
  );
}
