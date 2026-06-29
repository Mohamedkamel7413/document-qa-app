<<<<<<< HEAD
# 📄 Document Q&A AI Application

An intelligent full-stack application that allows users to upload PDF documents and ask natural language questions about their content, powered by Google Gemini AI.

---

## 🚀 Features

- 📂 Upload any PDF document
- 💬 Ask questions in natural language
- 🌍 Supports Arabic and English responses
- ⚡ Fast semantic search using FAISS
- 🤖 Powered by Google Gemini AI

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Python & Flask | REST API server |
| Google Gemini API | AI text generation & embeddings |
| FAISS | Vector similarity search |
| PyPDF2 | PDF text extraction |

### Frontend
| Technology | Purpose |
|---|---|
| React.js | User interface |
| Tailwind CSS | Styling |
| Axios | HTTP requests |

---

## ⚙️ Installation

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors faiss-cpu pypdf2 python-dotenv google-genai numpy
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables
Create `.env` file in backend folder:
GEMINI_API_KEY=your_gemini_api_key_here
---

## 💡 How It Works

1. **Upload PDF** → Extract text from document
2. **Text Chunking** → Split into 500-word chunks
3. **Embedding** → Convert chunks to vectors using Gemini
4. **FAISS Indexing** → Store vectors for fast search
5. **Ask Questions** → Match question to relevant chunks
6. **AI Response** → Gemini generates the answer

---

## 👨‍💻 Author

**Mohamed Kamel**
- GitHub: github.com/Mohamedkamel7413 
- LinkedIn: www.linkedin.com/in/mohamed-ghanem-133727348

---

## 📄 License
MIT License
=======
# document-qa-app
>>>>>>> 5547808c4af28f7a3037834204038df9602b91f6
