import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/upload", formData);
      setUploaded(true);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("Error uploading file!");
    }
    setLoading(false);
  };

  const handleAsk = async () => {
    if (!question) return alert("Please enter a question!");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/ask", {
        question,
        language,
      });
      setAnswer(response.data.answer);
    } catch (error) {
      alert("Error getting answer!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          📄 Document Q&A
        </h1>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Upload PDF
          </h2>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-gray-500 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Question Section */}
        {uploaded && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ask a Question
            </h2>
            <select
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700"
            >
              <option value="english">English</option>
              <option value="arabic">العربية</option>
            </select>
            <input
              type="text"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700"
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition duration-200"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>
        )}

        {/* Answer Section */}
        {answer && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Answer:
            </h2>
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;