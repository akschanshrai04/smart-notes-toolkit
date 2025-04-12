'use client';

import { useEffect, useState } from 'react';
import { useUpload } from '@/context/UploadContext';
import { createClient } from '@/utils/supabase/client';
import { ReactFlowProvider } from 'reactflow';
// import Mindmap from './Mindmap';
import Mindmap from './Mindmap';

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

    setMindmap([
      {
        "id": "platform",
        "Label": "Peer-to-Peer Book Exchange Platform"
      },
      {
        "id": "problem",
        "Label": "Problems",
        "parentId": "platform"
      },
      {
        "id": "problem_textbooks",
        "Label": "Textbooks are a significant expense for students",
        "parentId": "problem"
      },
      {
        "id": "problem_second_hand_books",
        "Label": "Finding affordable second-hand books is difficult",
        "parentId": "problem"
      },
      {
        "id": "problem_unstructured",
        "Label": "Existing options are unstructured and inefficient",
        "parentId": "problem"
      },
      {
        "id": "problem_wasted_resources",
        "Label": "Lack of dedicated platform results in wasted resources",
        "parentId": "problem"
      },
      {
        "id": "solution",
        "Label": "Proposed Solution",
        "parentId": "platform"
      },
      {
        "id": "solution_platform",
        "Label": "Web-based platform for students to buy, sell, or exchange books",
        "parentId": "solution"
      },
      {
        "id": "features",
        "Label": "Key Features",
        "parentId": "solution_platform"
      },
      {
        "id": "features_registration",
        "Label": "User Registration & Profiles",
        "parentId": "features"
      },
      {
        "id": "features_listing",
        "Label": "Book Listing & Searching",
        "parentId": "features"
      },
      {
        "id": "features_chat",
        "Label": "Chat System",
        "parentId": "features"
      },
      {
        "id": "features_review",
        "Label": "Rating System",
        "parentId": "features"
      },
      {
        "id": "features_exchange",
        "Label": "Exchange Option",
        "parentId": "features"
      },
      {
        "id": "tech_stack",
        "Label": "Tech Stack",
        "parentId": "platform"
      },
      {
        "id": "tech_stack_frontend",
        "Label": "Frontend: React.js or Vue.js",
        "parentId": "tech_stack"
      },
      {
        "id": "tech_stack_backend",
        "Label": "Backend: Node.js with Express.js or Django",
        "parentId": "tech_stack"
      },
      {
        "id": "tech_stack_database",
        "Label": "Database: MongoDB or PostgreSQL",
        "parentId": "tech_stack"
      },
      {
        "id": "tech_stack_authentication",
        "Label": "Authentication: Firebase Authentication or JWT",
        "parentId": "tech_stack"
      },
      {
        "id": "implementation",
        "Label": "Implementation Strategy",
        "parentId": "platform"
      },
      {
        "id": "implementation_authentication",
        "Label": "1. User Authentication",
        "parentId": "implementation"
      },
      {
        "id": "implementation_listing",
        "Label": "2. Book Listing System",
        "parentId": "implementation"
      },
      {
        "id": "implementation_search",
        "Label": "3. Search & Filter Feature",
        "parentId": "implementation"
      },
      {
        "id": "implementation_chat",
        "Label": "4. Chat & Negotiation",
        "parentId": "implementation"
      },
      {
        "id": "implementation_review",
        "Label": "5. Review System",
        "parentId": "implementation"
      },
      {
        "id": "impact",
        "Label": "Impact",
        "parentId": "platform"
      },
      {
        "id": "impact_cost",
        "Label": "Cost Savings",
        "parentId": "impact"
      },
      {
        "id": "impact_sustainability",
        "Label": "Sustainability",
        "parentId": "impact"
      },
      {
        "id": "impact_convenience",
        "Label": "Convenience",
        "parentId": "impact"
      },
      {
        "id": "impact_community",
        "Label": "Community Building",
        "parentId": "impact"
      },
      {
        "id": "conclusion",
        "Label": "Conclusion",
        "parentId": "platform"
      }
    ])
  
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
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-800">Main Content for the Display</h1>

      {uploadData && (
        <div className="mt-4 space-y-2">
          <p className="font-semibold text-blue-700"><strong>Uploaded PDF Name:</strong> {uploadData.pdfName}</p>
          <p className="text-blue-600 underline"><strong>PDF URL:</strong> <a href={uploadData.pdfUrl} target="_blank" rel="noreferrer">{uploadData.pdfUrl}</a></p>
        </div>
      )}

      {summary ? (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-blue-800">📄 Summary</h2>
          <p className="text-blue-600">{summary}</p>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
        </div>
      )}

      {flashcards.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-blue-800">🧠 Flashcards</h2>
          <ul className="space-y-4">
            {flashcards.map((card, index) => (
              <li key={index} className="bg-white border p-4 rounded-lg shadow-sm">
                <p className="font-medium text-blue-800">Q: {card.question}</p>
                <p className="text-blue-600 mt-1">A: {card.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
        </div>
      )}

      {mindmap ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Mindmap Diagram</h2>
          <Mindmap 
            data={mindmap}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-8">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
        </div>
      )}
    </div>
  );
}
