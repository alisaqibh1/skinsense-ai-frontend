# 🩺 SkinSense AI

AI-powered skin disease detection app. React frontend + FastAPI backend, built around a pretrained DINOv2 vision model, with Groq/Llama 3 generating AI medical advice from the prediction.

This repo is the **frontend**. It talks to a separate FastAPI backend deployed on Hugging Face Spaces, which in turn serves predictions from a private Hugging Face model repo.

### 🔗 Links

- **Live app:** [skinsenseai-pk.vercel.app](https://skinsenseai-pk.vercel.app)
- **Frontend repo:** [github.com/alisaqibh1/skinsense-ai-frontend](https://github.com/alisaqibh1/skinsense-ai-frontend)
- **Backend repo:** [github.com/alisaqibh1/skinsense-ai-backend](https://github.com/alisaqibh1/skinsense-ai-backend)
- **Model repo (Hugging Face):** [huggingface.co/alisaqib14/skin-disease-model](https://huggingface.co/alisaqib14/skin-disease-model) — private; the link will show an access-denied page unless you have permission

---

## 🏗️ System Architecture

```
┌─────────────────┐      HTTPS       ┌──────────────────────┐      loads at build     ┌────────────────────────┐
│  React Frontend  │ ───────────────▶ │  FastAPI Backend      │ ───────────────────────▶ │  DINOv2 Model            │
│  (Vercel)         │ ◀─────────────── │  (Docker, HF Spaces)  │      (Git LFS, bundled)  │  (private HF model repo) │
└─────────────────┘      JSON        └──────────┬────────────┘                          └────────────────────────┘
                                                  │
                                                  ▼
                                          ┌────────────────┐
                                          │  Groq API        │
                                          │  (Llama 3)        │
                                          │  medical advice   │
                                          └────────────────┘
```

**Flow:** user uploads/captures a skin image → frontend sends it to the backend → DINOv2 classifies the condition → the prediction is passed to Groq's Llama 3 to generate a plain-language medical explainer → result + PDF report returned to the frontend.

The model itself is a **pretrained DINOv2** (vision transformer) with a classification head — it wasn't trained from scratch or on a self-collected dataset. It was sourced from Hugging Face and re-hosted under a private model repo, then wired up to a full product around it: backend API, PDF reporting, disease encyclopedia, and the frontend below.

---

## 🔍 How SkinSense AI Works (end to end)

1. **Capture** — user uploads a photo or takes one via the in-browser camera (`UploadSection.jsx`), with configurable resolution/quality (`VITE_CAMERA_WIDTH/HEIGHT`, `VITE_IMAGE_QUALITY`).
2. **Send to backend** — the image is sent over HTTPS (Axios) to the FastAPI backend running on Hugging Face Spaces.
3. **Preprocess** — the backend preprocesses the image per `preprocessor_config.json` (resize/normalize) to match what DINOv2 expects.
4. **Classify** — the preprocessed image is run through the **DINOv2** model (loaded once at Space startup, bundled via Git LFS, so no download delay per request) to predict the skin condition from a set of 31 supported diseases.
5. **Generate medical advice** — the raw prediction is passed to **Groq's Llama 3** API, which turns the classification into a plain-language explanation and general advice (this is the "AI-powered medical advice" step — it's language generation on top of the classifier's output, not a second diagnostic model).
6. **Return & display** — the backend returns the prediction + generated advice as JSON; the frontend renders it in `ResultCard.jsx`.
7. **Report** — the user can generate a downloadable **PDF report** of the result (`jsPDF` + `html2canvas`) directly in the browser.
8. **Reference** — a built-in **disease encyclopedia** (`DiseasesPage.jsx`, `/diseases` route) lets users browse all 31 supported conditions independent of an upload.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and configure API URL
# VITE_API_BASE_URL=<your backend URL, e.g. the HF Space endpoint>

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

> Note: the backend is not on `localhost:8000` by default in production — it runs on Hugging Face Spaces. Point `VITE_API_BASE_URL` at the deployed Space (or run the backend locally per its own README if you're developing against it locally).

---

## 📦 Tech Stack

- **React 18.2** – UI framework
- **Vite 5.0** – Build tool
- **Tailwind CSS** – Styling
- **Framer Motion** – Animations
- **React Router DOM** – Routing
- **Axios** – HTTP client
- **jsPDF + html2canvas** – PDF generation
- **Lucide React** – Icons

---

## 🎨 Features

- ✅ Image upload & camera capture
- ✅ Real-time disease detection
- ✅ AI-powered medical advice
- ✅ PDF report generation
- ✅ Disease encyclopedia (31 diseases)
- ✅ Responsive design
- ✅ Smooth animations

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation
│   ├── Hero.jsx             # Hero section
│   ├── Stats.jsx            # Statistics
│   ├── HowItWorks.jsx       # How it works
│   ├── UploadSection.jsx    # Upload & camera
│   ├── ResultCard.jsx       # Results & PDF
│   ├── Testimonials.jsx     # Testimonials
│   ├── Footer.jsx           # Footer
│   └── DiseasesPage.jsx     # Disease list
├── assets/                  # Images & fonts
├── App.jsx                  # Main app
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

---

## ⚙️ Configuration

Create a `.env` file:

```env
# Backend API
VITE_API_BASE_URL=https://your-space-name.hf.space
VITE_API_TIMEOUT=30000

# Camera settings
VITE_CAMERA_WIDTH=1280
VITE_CAMERA_HEIGHT=720
VITE_IMAGE_QUALITY=0.9

# App info
VITE_APP_NAME=SkinSense AI
VITE_APP_VERSION=2.0.0
```

---

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Color Palette

```css
Red:         #DC2626  /* Primary */
Teal:        #0891B2  /* Secondary */
Light Green: #DCFCE7  /* Background */
White:       #FFFFFF  /* Main BG */
Dark Gray:   #111827  /* Text */
```

---

## 📱 Routes

- `/` – Home page with upload
- `/diseases` – Disease encyclopedia

---

## 🔗 Backend, Model & Deployment Pipeline

The frontend deploys straightforwardly to Vercel (push to `main` → auto-deploy). The interesting part is the backend/model side:

**1. Model hosting** — the DINOv2 weights (`pytorch_model.bin`, ~347MB, plus `config.json` / `preprocessor_config.json`) live in a **private Hugging Face model repo**, tracked with **Git LFS** (Git itself has a 100MB file cap, so plain `git push` rejects a 347MB weights file).

**2. Backend deployment** — the FastAPI backend runs as a **Dockerized Hugging Face Space**, not a serverless function. The model is **bundled directly into the Space repo via Git LFS** rather than downloaded at container build time — Hugging Face Space secrets (like the HF access token) are only available at *runtime*, not during `docker build`, so a `RUN python download_model.py` step in the Dockerfile fails with 401s no matter what token is set. Bundling the weights via LFS sidesteps that entirely, and as a bonus the model loads once and stays warm — no cold-start delay per request.

**3. CI/CD (GitHub Actions)** — the backend repo has a GitHub Actions workflow named **"Deploy to HuggingFace Space"** that keeps the **Hugging Face Space in sync with GitHub**: on every push to `main`, it pushes the updated repo (code + LFS-tracked model files) to the Hugging Face Space's git remote, which triggers a fresh Space rebuild. This means the source of truth stays on GitHub while HF Spaces handles the actual hosting/runtime — check the Actions tab if the live Space ever looks out of date with GitHub; a red ❌ run means that push didn't sync.

**4. Frontend ↔ backend ↔ model, tied together:**
```
GitHub (backend repo, main branch)
   │  push
   ▼
GitHub Actions workflow
   │  git push → HF Space remote
   ▼
Hugging Face Space (Docker build, model via Git LFS)
   │  serves REST API
   ▼
Vercel-hosted React frontend  (VITE_API_BASE_URL → HF Space URL)
```

A few of the harder problems solved along the way: Hugging Face Space README metadata only accepts a fixed set of color values (`colorTo`/`colorFrom`); a **private** model repo needs an HF token with **write**, not just read, permission for LFS auth to succeed; and Windows' `echo >>` can silently write `requirements.txt` in UTF-16, which Hugging Face's build step can't parse as a normal requirements file — worth checking file encoding if a HF Space build fails on a `requirements.txt` line that looks fine.

---

## ⚠️ Important Notes

- The model is pretrained (DINOv2 + classification head) — this project's contribution is the system built around it, not the model training itself.
- Camera requires HTTPS in production.
- PDF generation works in modern browsers.
- Mobile responsive design.

---

## 📄 License

Educational purposes only.

## 🤝 Contributing

Contributions welcome! Please open an issue first.

---

**Made with ❤️ using React + Vite, FastAPI, DINOv2, and Groq/Llama 3**
