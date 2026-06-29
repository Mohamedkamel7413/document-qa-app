from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import faiss
import numpy as np
from PyPDF2 import PdfReader
from google import genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure Gemini
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options={"api_version": "v1"}
)

# Store chunks and index globally
chunks = []
index = None

def extract_text_from_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def split_into_chunks(text, chunk_size=500):
    words = text.split()
    return [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]

def get_embedding(text):
    result = client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=text
    )
    return result.embeddings[0].values

@app.route("/upload", methods=["POST"])
def upload():
    global chunks, index
    file = request.files["file"]
    text = extract_text_from_pdf(file)
    chunks = split_into_chunks(text)
    
    embeddings = [get_embedding(chunk) for chunk in chunks]
    embeddings_np = np.array(embeddings).astype("float32")
    
    index = faiss.IndexFlatL2(len(embeddings[0]))
    index.add(embeddings_np)
    
    return jsonify({"message": "File uploaded successfully!", "chunks": len(chunks)})

@app.route("/ask", methods=["POST"])
def ask():
    global chunks, index
    data = request.json
    question = data.get("question")
    language = data.get("language", "english")
    
    question_embedding = np.array([get_embedding(question)]).astype("float32")
    _, indices = index.search(question_embedding, k=3)
    
    context = " ".join([chunks[i] for i in indices[0]])
    
    prompt = f"""Answer the question based on the context below.
    Reply in {'Arabic' if language == 'arabic' else 'English'}.
    
    Context: {context}
    Question: {question}
    Answer:"""
    
    response = client.models.generate_content(
        model="models/gemini-2.0-flash",
        contents=prompt
    )
    
    return jsonify({"answer": response.text})

if __name__ == "__main__":
    app.run(debug=True)