<div align="center">
  <img src="public/social-preview.png" alt="Screenshot Studio Banner" width="100%" />
  
  # 📸 Screenshot Studio
  
  **A beautiful, open-source tool for composing, mocking up, and presenting screenshots.**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC.svg)](https://tailwindcss.com)

  [Live Demo](https://screenshot-studio.vercel.app/) • [Report Bug](https://github.com/ayushsolanki29/screenshot-studio/issues)
</div>

---

## ✨ Features

Screenshot Studio turns raw screenshots into premium, commercial-grade presentations in seconds. Inspired by the aesthetics of Linear, Vercel, and Raycast.

- **🪄 Intelligent Auto-Crop**: Automatically detects and removes browser chrome, Windows taskbars, and macOS docks.
- **🗺️ Infinite Canvas**: Pan and zoom freely using gesture controls (`@use-gesture/react`) for a professional editing experience.
- **🎨 50+ Pluggable Layouts**: Includes Hero, Stack, Perspective, Grid, Fan, Layered, and floating layouts.
- **✨ Advanced Effects**: Dial in the perfect look with custom shadow strength, blur, distance, glassmorphism, noise, and rounded corners.
- **🌈 Premium Backgrounds**: Curated library of minimalist gradients, mesh patterns, and solid colors.
- **🚀 High-Res Export**: Render directly from the DOM to high-quality 2x/4x PNGs instantly.
- **📋 Copy to Clipboard**: Seamless integration with your OS clipboard.

## 🚀 Quick Start

Ensure you have Node.js 20+ installed.

```bash
# 1. Clone the repository
git clone https://github.com/ayushsolanki29/screenshot-studio.git
cd screenshot-studio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:5173` to see the app. You can test the layouts using the sample images provided in the `/public` folder!

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **State**: React Context API
- **Animations**: Framer Motion
- **Canvas/Export**: `html2canvas`, `@use-gesture/react`

## 📦 Deployment (Vercel)

This project is fully configured for deployment on Vercel. 

1. Push your code to GitHub.
2. Import the project into Vercel.
3. The framework preset (Vite) and routing (`vercel.json`) will be detected automatically.
4. Deploy!

## 📄 License

This project is 100% free and open-source under the [MIT License](LICENSE). 

Created by [Ayush Solanki](https://github.com/ayushsolanki29).
