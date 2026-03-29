# 🏥 MediSegAi

**MediSegAi** is an AI-powered clinical assistant designed to bridge the gap between complex diagnostic data and actionable medical insights. By combining advanced computer vision for scan analysis with an intelligent LLM-driven assistant, MediSegAi streamlines the workflow for healthcare professionals and patients alike.

## 🚀 Key Features

* **Intelligent AI Guidance:** Real-time clinical assistance and instant "One-Click" lab result analysis.
* **Medical Record Vault:** A dedicated, centralized digital filing system—no more lost papers or messy folders.
* **Secure Persistent Sessions:** Integrated with `iron-session` for secure, cookie-based authentication that keeps you logged in safely.
* **Interactive Dashboard:** A high-performance GUI built with Next.js for managing patient data and AI insights in one place.
* **Centralized Database:** Robust integration with MongoDB to ensure data consistency across the entire platform.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend:** Django (API), Node.js
* **AI/ML:** Gemini API, LangChain
* **Security:** Iron-Session
* **Database:** MongoDB

---

## ⚙️ Getting Started

Follow these steps to get your local development environment up and running.

### 1. Prerequisites
Ensure you have **Node.js** and **npm** installed on your machine.

### 2. Installation
Clone the repository and install the necessary dependencies:

```bash
npm install
```
# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Security
# Note: Password must be at least 32 characters long
SESSION_PASSWORD=your_secure_32_character_password_Open http://localhost:3000 with your browser to see the result.here

# Environment
NODE_ENV=development

#Running the project
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

## 🛡️ Security Note
This project uses iron-session to manage user sessions via encrypted cookies. Ensure your **SESSION_PASSWORD** is kept secret and never committed to version control.
