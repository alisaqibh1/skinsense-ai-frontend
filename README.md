# 🩺 SkinSense AI - Frontend

React-based frontend for SkinSense AI skin disease detection application.

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
# VITE_API_BASE_URL=http://localhost:8000

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Tech Stack

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **jsPDF + html2canvas** - PDF generation
- **Lucide React** - Icons

## 🎨 Features

- ✅ Image upload & camera capture
- ✅ Real-time disease detection
- ✅ AI-powered medical advice
- ✅ PDF report generation
- ✅ Disease encyclopedia (31 diseases)
- ✅ Responsive design
- ✅ Smooth animations

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

## ⚙️ Configuration

Create `.env` file:

```env
# Backend API
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Camera settings
VITE_CAMERA_WIDTH=1280
VITE_CAMERA_HEIGHT=720
VITE_IMAGE_QUALITY=0.9

# App info
VITE_APP_NAME=SkinSense AI
VITE_APP_VERSION=2.0.0
```

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Color Palette

```css
Red:         #DC2626  /* Primary */
Teal:        #0891B2  /* Secondary */
Light Green: #DCFCE7  /* Background */
White:       #FFFFFF  /* Main BG */
Dark Gray:   #111827  /* Text */
```

## 📱 Routes

- `/` - Home page with upload
- `/diseases` - Disease encyclopedia

## 🔗 Backend Repository

This frontend requires the SkinSense AI backend:
https://github.com/alisaqibh1/skinsense-ai-backend

## ⚠️ Important Notes

- Requires backend running on port 8000
- Camera requires HTTPS in production
- PDF generation works in modern browsers
- Mobile responsive design

## 📄 License

Educational purposes only.

## 🤝 Contributing

Contributions welcome! Please open an issue first.

---

**Made with ❤️ using React + Vite**
