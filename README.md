# Speech-to-Text Transcription System

## Overview

This project captures live audio, transcribes it in real time, labels speakers, extracts keywords, and tracks timestamps and call duration. It includes:

* **Backend**: FastAPI service handling audio streaming and transcription logic.
* **Desktop GUI**: PyQt5 application for recording and displaying live results.
* **(Future) Web UI**: React frontend for browser-based interaction.

---

## Prerequisites

Before you begin, ensure you have:

* **Python 3.8+** installed
* **Git** for cloning and version control
* **Node.js & npm** (for the React frontend)
* **MongoDB** running locally or accessible via URI (optional)
* **Qdrant** running locally or accessible via URL (optional)

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Manshor-Sadat/Speech-To--Text---Frontend.git
   cd Speech-To--Text---Frontend
   ```
2. **Create a Python virtual environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate      # macOS/Linux
   venv\Scripts\activate       # Windows PowerShell
   ```
3. **Install Python dependencies**

   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
4. **Install Node.js dependencies** (for React frontend)

   ```bash
   cd react-frontend
   npm install
   cd ..
   ```

---

## Configuration

Create a `.env` file in the project root with your keys and URIs:

```ini
# Transcription engines
ASSEMBLYAI_API_KEY=your_assemblyai_key
OPENAI_API_KEY=your_openai_key   # for Whisper

# Databases (optional)
MONGODB_URI=mongodb://localhost:27017/transcriptions
QDRANT_URL=http://localhost:6333

# Twilio (optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

Adjust settings in `app/config.py`:

```python
# Choose engine: "assemblyai" or "whisper"
TRANSCRIBE_ENGINE = "assemblyai"
```

Enable/disable features in `app/settings.py`:

```python
ENABLE_DIARIZATION = True
ENABLE_KEYWORD_EXTRACTION = True
```

---

## Running the Backend

1. **Activate your virtual environment** (if not already active):

   ```bash
   source venv/bin/activate
   ```
2. **Start the FastAPI server**:

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
3. **Verify** by opening [http://localhost:8000/docs](http://localhost:8000/docs) in your browser to see the API docs.

---

## Running the Desktop GUI

1. **Ensure the backend is running** at `http://localhost:8000`.
2. **Launch the PyQt5 app**:

   ```bash
   python gui/main.py
   ```
3. **Use the interface**:

   * Click **Start Recording** to begin transcription.
   * Watch live transcription, speaker labels, timestamps, and keywords.
   * Click **Stop** to end and see call duration.

---

## Running the React Frontend (optional)

1. **Navigate to the frontend directory**:

   ```bash
   cd react-frontend
   ```
2. **Start the dev server**:

   ```bash
   npm start
   ```
3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Setup (Optional)

* **MongoDB**: Ensure `mongod` is running. Default URI `mongodb://localhost:27017/transcriptions` can be changed in .env.
* **Qdrant**: Run via Docker:

  ```bash
  docker run -p 6333:6333 qdrant/qdrant
  ```

---

## Twilio Integration (Optional)

1. **Install Twilio**:

   ```bash
   pip install twilio
   ```
2. **Configure** `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in .env
3. **Enable** Twilio routes in `app/settings.py`:

   ```python
   ENABLE_TWILIO = True
   ```
4. **Use** the `/twilio-webhook` endpoint to receive call audio streams.

---

## Testing

* **Backend tests** (if available):

  ```bash
  pytest tests/
  ```

---

Troubleshooting

port conflicts**: ensure ports 8000 (backend) & 3000 (frontend) are free.
Dependency issues**: upgrade pip and reinstall requirements.

---

ontributing

1. Fork the project
2. Create a new branch: `git checkout -b feature/x`
3. Commit your changes: `git commit -m "Add feature X"`
4. Push: `git push origin feature/x`
5. Open a Pull Request

