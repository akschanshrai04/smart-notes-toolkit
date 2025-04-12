"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type UploadData = {
  pdfUrl: string;
  pdfName: string;
};

type UploadContextType = {
  uploadData: UploadData | null;
  setUploadData: (data: UploadData) => void;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [uploadData, setUploadData] = useState<UploadData | null>(null);

  return (
    <UploadContext.Provider value={{ uploadData, setUploadData }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within UploadProvider");
  }
  return context;
};
