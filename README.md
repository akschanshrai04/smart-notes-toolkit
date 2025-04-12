# 🧠 Smart Notes Toolkit

A full-stack **AI-powered productivity tool** that transforms your PDFs into structured, interactive learning material. Upload any PDF and get:

- 📄 Summarized content
- 🧠 Flashcards for quick revision
- 🗺 Mind maps visualized using React Flow

Built with **Next.js**, **Supabase**, and **n8n** + OpenRouter (LLMs), this app helps students, researchers, and professionals turn large documents into digestible knowledge.

---

## 📌 Key Features

- ✅ **PDF Upload System**
  - Upload via the browser
  - Stored securely on Supabase Storage

- ✨ **AI Automation (via n8n + OpenRouter)**
  - Summarizes PDFs using LLMs
  - Generates flashcards in Q/A format
  - Extracts mind map data in hierarchical JSON

- 🧠 **Mind Map Visualization**
  - Uses React Flow
  - Top-down graph layout
  - Expand-on-click behavior for large maps (planned)

- 🔐 **Authentication**
  - User login via Supabase Auth
  - Each user's uploads and results are private

- 📚 **History of Summaries**
  - View previous uploads with metadata
  - Easily re-download summaries and flashcards

---

## 💻 Tech Stack

| Layer      | Tech                                                                 |
|------------|----------------------------------------------------------------------|
| Frontend   | [Next.js](https://nextjs.org/), [React Flow](https://reactflow.dev/) |
| Backend    | [Supabase](https://supabase.com/) (DB, Auth, Storage)                |
| Automation | [n8n](https://n8n.io/) with [OpenRouter](https://openrouter.ai/)     |

---

## 📁 Folder Structure

```
smart-notes-toolkit/
├── app/
│   ├── upload/               # PDF upload page
│   ├── dashboard/            # Display of results: summary, mindmap, flashcards
│   └── api/                  # (Optional) server routes
├── components/
│   ├── UploadForm.tsx        # Handles file upload
│   ├── MainDisplay.tsx       # Calls n8n & renders outputs
│   └── ReactFlowMindMap.tsx  # Mind map renderer
├── lib/                      # Supabase client, utilities
├── public/                   # Static assets, test PDFs
├── styles/                   # Custom CSS
└── README.md
```

---

## 🛠 Setup Instructions

### 1. Clone and install

```bash
git clone https://github.com/your-username/smart-notes-toolkit.git
cd smart-notes-toolkit
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
N8N_WEBHOOK_URL=https://your-n8n-instance.webhook.url/webhook/smartnotes
```

### 3. Run locally

```bash
npm run dev
```

---

## 🔗 How It Works

1. **User uploads PDF**
2. **Supabase** stores it and metadata is added to DB
3. **n8n** is triggered via webhook
   - It parses the PDF, summarizes content
   - Generates mind map structure and flashcards using OpenRouter
4. Data is stored back in Supabase DB
5. Frontend queries and renders summary, mindmap, and cards

---

## 🧠 Planned Enhancements

- [ ] Click-to-expand mind map nodes
- [ ] Flashcard shuffle and mode toggles
- [ ] Export notes as Markdown
- [ ] User stats & dashboard

---# 🧠 Smart Notes Toolkit

A full-stack **AI-powered productivity tool** that transforms your PDFs into structured, interactive learning material. Upload any PDF and get:

- 📄 Summarized content
- 🧠 Flashcards for quick revision
- 🗺 Mind maps visualized using React Flow

Built with **Next.js**, **Supabase**, and **n8n** + OpenRouter (LLMs), this app helps students, researchers, and professionals turn large documents into digestible knowledge.

---

## 📌 Key Features

- ✅ **PDF Upload System**
  - Upload via the browser
  - Stored securely on Supabase Storage

- ✨ **AI Automation (via n8n + OpenRouter)**
  - Summarizes PDFs using LLMs
  - Generates flashcards in Q/A format
  - Extracts mind map data in hierarchical JSON

- 🧠 **Mind Map Visualization**
  - Uses React Flow
  - Top-down graph layout
  - Expand-on-click behavior for large maps (planned)

- 🔐 **Authentication**
  - User login via Supabase Auth
  - Each user's uploads and results are private

- 📚 **History of Summaries**
  - View previous uploads with metadata
  - Easily re-download summaries and flashcards

---

## 💻 Tech Stack

| Layer      | Tech                                                                 |
|------------|----------------------------------------------------------------------|
| Frontend   | [Next.js](https://nextjs.org/), [React Flow](https://reactflow.dev/) |
| Backend    | [Supabase](https://supabase.com/) (DB, Auth, Storage)                |
| Automation | [n8n](https://n8n.io/) with [OpenRouter](https://openrouter.ai/)     |

---

## 📁 Folder Structure

```
smart-notes-toolkit/
├── app/
│   ├── upload/               # PDF upload page
│   ├── dashboard/            # Display of results: summary, mindmap, flashcards
│   └── api/                  # (Optional) server routes
├── components/
│   ├── UploadForm.tsx        # Handles file upload
│   ├── MainDisplay.tsx       # Calls n8n & renders outputs
│   └── ReactFlowMindMap.tsx  # Mind map renderer
├── lib/                      # Supabase client, utilities
├── public/                   # Static assets, test PDFs
├── styles/                   # Custom CSS
└── README.md
```

---

## 🛠 Setup Instructions

### 1. Clone and install

```bash
git clone https://github.com/your-username/smart-notes-toolkit.git
cd smart-notes-toolkit
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
N8N_WEBHOOK_URL=https://your-n8n-instance.webhook.url/webhook/smartnotes
```

### 3. Run locally

```bash
npm run dev
```

---

## 🔗 How It Works

1. **User uploads PDF**
2. **Supabase** stores it and metadata is added to DB
3. **n8n** is triggered via webhook
   - It parses the PDF, summarizes content
   - Generates mind map structure and flashcards using OpenRouter
4. Data is stored back in Supabase DB
5. Frontend queries and renders summary, mindmap, and cards

---

## 🧠 Planned Enhancements

- [ ] Click-to-expand mind map nodes
- [ ] Flashcard shuffle and mode toggles
- [ ] Export notes as Markdown
- [ ] User stats & dashboard

---
