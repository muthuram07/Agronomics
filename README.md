# Agri-Intelligence Dashboard 🌾

> **Project Agronomics**: A next-generation agricultural analytics platform empowering farmers with real-time market insights, AI-driven crop diagnosis, and simplified government comparisons.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Python Flask](https://img.shields.io/badge/Python_Flask-backend-blue?style=for-the-badge&logo=python&logoColor=white)

---

## 🚀 Overview

**Agronomics** has been transformed from a static informational site into a dynamic **Agri-Intelligence Dashboard**. The platform leverages the **Ultra-Clean Light** design system to provide a zero-distraction interface for farmers to access critical data even in bright outdoor conditions.

### ✨ Key Features

*   **📊 Smart Market Dashboard**: Real-time integration with Agmarknet APIs to track commodity prices across mandis.
*   **🤖 AI Crop Doctor**: Computer vision-powered crop disease diagnosis (via Python YOLOv5 backend).
*   **🔐 Secure Authentication**: Robust Firebase Auth supporting **Google Sign-In**, Email/Password, and a developer-friendly **Guest Mode**.
*   **📈 Profit Calculator**: Intelligent algorithms that combine weather forecasts and market trends to recommend "Sell" or "Hold" actions.
*   **🎨 Ultra-Clean Design**: A "Flat Design 2.0" aesthetic using purely functional whitespace, Emerald-600 accents, and **Geist Sans** typography for maximum legibility.

---

## 🛠️ Tech Stack

### Frontend (Modern Experience)
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Components**: [shadcn/ui](https://ui.shadcn.com/) + Radix UI
*   **Icons**: Lucide React
*   **State**: React Context (Auth, Zen Mode)

### Backend (Intelligence Layer)
*   **Server**: Python Flask
*   **ML Model**: PyTorch / YOLOv5 (`best.pt`)
*   **Database**: Firebase Realtime Database

---

## 📂 Project Structure

```bash
Agronomics/
├── agronomics-nextjs/       # 🚀 NEW: Modern Frontend Application
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions & Firebase config
│   └── public/              # Static assets
├── app.py                   # 🧠 ML Inference Server (Python)
├── best.pt                  # Trained YOLOv5 Model
├── templates/               # Legacy templates (Deprecating)
└── static/                  # Legacy assets
```

---

## ⚡ Getting Started

### Prerequisites
*   **Node.js** (v18 or higher)
*   **Python** (v3.9 or higher)

### 1️⃣ Frontend Setup (Next.js)
Navigate to the frontend directory and install dependencies:

```bash
cd agronomics-nextjs
npm install
npm run dev
```
> The dashboard will be available at [http://localhost:3000](http://localhost:3000).

### 2️⃣ Backend Setup (Python)
In a separate terminal, start the inference server:

```bash
# From the root directory
pip install -r requirements.txt
python app.py
```
> The ML API will run at [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

## 🔐 Credentials & Config

**Firebase Configuration**
The application is pre-configured with the `agro-project-31` project.
*   **Auth Domain**: `agro-project-31.firebaseapp.com`
*   **Guest Mode**: Enabled for testing without credentials.

---

## 📸 Visual Tour

### Intelligent Dashboard
*Real-time sparks charts and price tables optimized for readability.*

### Market Analysis
*Deep-dive analytics to compare historical price trends.*

---

## 🤝 Contribution

1.  Fork the repo
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request
