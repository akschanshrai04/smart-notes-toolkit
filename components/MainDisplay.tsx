'use client';

import { useEffect, useState } from 'react';
import { useUpload } from '@/context/UploadContext';
import { createClient } from '@/utils/supabase/client';
import MindMapFlowWrapper from './MindMapFlowWrapper';

interface Flashcard {
  question: string;
  answer: string;
}

export default function MainDisplay() {
  const { uploadData } = useUpload();
  const [userId, setUserId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [mindmap, setMindmap] = useState<any>(null); // can define type if needed
  useEffect(() => {
    setSummary("The Peer-to-Peer Book Exchange Platform is a solution to the high cost of textbooks for students, who often only need them for a semester. Current options are unstructured and inefficient, making it difficult for students to find affordable books on time. The platform allows students to buy, sell, or exchange books with others in their college community through features like user registration, book listing and searching, chat system, and rating system. The tech stack includes React.js or Vue.js for frontend, Node.js with Express.js or Django for backend, MongoDB (NoSQL) or PostgreSQL for database, and Firebase Authentication or JWT for secure login. The platform aims to save costs for students, promote sustainability, and build a community of sharing and collaboration.")
    setFlashcards([
        {
            "answer": "Textbooks are a significant expense for students, finding affordable second-hand books is difficult, existing options are unstructured and inefficient, leading to wasted resources and limited access to affordable learning materials.",
            "question": "What is the problem with the current textbook purchase situation for students?"
        },
        {
            "answer": "By creating a web-based platform for students to buy, sell, or exchange books directly with peers in their college community with features like user registration, book listing & searching, chat system, rating system, and an exchange option.",
            "question": "How does the Peer-to-Peer Book Exchange propose to solve the textbook issue?"
        },
        {
            "answer": "User registration & profiles, book listing & searching, chat system, rating system, and an exchange option.",
            "question": "What are some of the key features of the Peer-to-Peer Book Exchange?"
        },
        {
            "answer": "The frontend will use React.js or Vue.js, while the backend will run Node.js with Express.js or Django.",
            "question": "What frontend and backend technologies are employed in the proposed tech stack for the Peer-to-Peer Book Exchange?"
        },
        {
            "answer": "By encouraging book reuse, the proposed platform reduces paper waste and promotes an eco-friendly approach to education.",
            "question": "How does the solution encourage sustainability and eco-friendly approaches to education?"
        },
        {
            "answer": "The chat system allows for secure communication; a review system encourages ratings and feedback by buyers, improving credibility among students.",
            "question": "What measures does the system have in place to ensure students' trust?"
        }
    ])

    setMindmap({
      "Peer-to-Peer Book Exchange": {
          "Impact": [
              "Cost Savings",
              "Sustainability",
              "Convenience",
              "Community Building"
          ],
          "Platform": {
              "Backend": "Node.js with Express.js or Django for handling backend logic and requests",
              "Database": "MongoDB (NoSQL) or PostgreSQL to store book listings, user profiles, and reviews",
              "Frontend": "React.js or Vue.js for a dynamic, responsive user interface",
              "Authentication": "Firebase Authentication or JWT-based secure login system to ensure only verified students can use the platform"
          },
          "Conclusion": "Addresses a real and pressing college problem with a practical, scalable, and cost-effective solution",
          "Problem Statement": {
              "Issue 1": "Textbooks are a significant expense for students",
              "Issue 2": "Finding affordable second-hand books is difficult",
              "Issue 3": "Existing options are unstructured and inefficient",
              "Issue 4": "Lack of dedicated platform for textbook exchanges"
          },
          "Proposed Solution": {
              "Key Features": [
                  "User Registration & Profiles",
                  "Book Listing & Searching",
                  "Chat System",
                  "Rating System",
                  "Exchange Option"
              ],
              "Web-based Platform": "Students can buy, sell, or exchange books directly with peers in their college community"
          },
          "Implementation Strategy": [
              "User Authentication",
              "Book Listing System",
              "Search & Filter Feature",
              "Chat & Negotiation",
              "Review System"
          ]
      }
  })
  
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("user data : " , user);
        setUserId(user?.id || null);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (!uploadData || !userId) return;

    const sendToN8N = async () => {
      try {
        const response = await fetch('http://localhost:5678/webhook-test/upload-finished', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pdfName: uploadData.pdfName,
            pdfUrl: uploadData.pdfUrl,
            userId: userId
          }),
        });

        const result = await response.json();
        console.log("n8n response:", result);

        // Extract and store the values
        setSummary(result.summary || '');
        setFlashcards(result.flashcards || []);
        setMindmap(result.mindmap || null);
      } catch (err) {
        console.error("Error sending to n8n:", err);
      }
    };

    sendToN8N();
  }, [uploadData, userId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Main Content for the Display</h1>

      {uploadData && (
        <div className="mt-4 space-y-2">
          <p><strong>Uploaded PDF Name:</strong> {uploadData.pdfName}</p>
          <p><strong>PDF URL:</strong> <a className="text-blue-600 underline" href={uploadData.pdfUrl} target="_blank" rel="noreferrer">{uploadData.pdfUrl}</a></p>
        </div>
      )}

      {summary && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">📄 Summary</h2>
          <p className="bg-gray-100 p-4 rounded">{summary}</p>
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">🧠 Flashcards</h2>
          <ul className="space-y-4">
            {flashcards.map((card, index) => (
              <li key={index} className="bg-white border p-4 rounded shadow-sm">
                <p className="font-medium text-gray-800">Q: {card.question}</p>
                <p className="text-gray-600 mt-1">A: {card.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {mindmap && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Mindmap Diagram</h2>
          <MindMapFlowWrapper 
            jsonData={mindmap}
            height="600px"
            width="100%" 
          />
        </div>
      )}
    </div>
  );
}
