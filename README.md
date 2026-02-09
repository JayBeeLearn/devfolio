<div align="center">
  <img width="1200" height="400" alt="DevFolio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" style="border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3);" />
  
  <br />

  # 💎 DevFolio: Ultra-Premium  Portfolio
  
  **The definitive mobile-first, designer-grade portfolio template with a modular  architecture.**
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

</div>

---

## ✨ Core Features

- 📱 **Mobile-First Aesthetic**: Designer-grade layouts optimized for every screen size.
- 🎨 **Dynamic Theming**: Swap between Minimal, Cyberpunk, and Elegant themes instantly.
- 🧱 **Modular Admin Panel**: A professional dashboard to manage your bio, skills, and projects without touching code.
- ☁️ **Cloud Native**: Out-of-the-box support for Firebase, Supabase, and Local storage.
- ⚡ **Performance Optimized**: Built with Vite and Framer Motion for buttery-smooth animations.

---

## 🚀 Quick Start (Local Setup)

Get up and running in under 2 minutes using the **Local Backend** mode.

1. **Clone & Install**
   ```bash
   git clone https://github.com/JayBeeLearn/devfolio.git
   cd devfolio
   npm install
   ```

2. **Configure Environment**
   Rename `.env.example` to `.env` (if not already present). For local mode, ensure:
   ```env
   VITE_BACKEND_TYPE=local
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## ☁️ Setting Up Cloud Backends

DevFolio's **Service Factory Architecture** allows you to switch backends by simply changing an environment variable.

### Option A: Firebase (Recommended)
1. Create a project on the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** and **Firebase Storage**.
3. Copy your Web App config to `.env`:
   ```env
   VITE_BACKEND_TYPE=firebase
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

### Option B: Supabase
1. Create a project on [Supabase.com](https://supabase.com/).
2. Create a table named `portfolio` with columns for your data.
3. Add your credentials to `.env`:
   ```env
   VITE_BACKEND_TYPE=supabase
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

---

## 🛠️ Customization Guide

### Accessing the Admin Panel
Once running, click the **Settings icon** in the bottom-right corner (or visit `/admin`).
- **First-time setup**: You will be prompted to create an admin password.
- **Security**: This password is encrypted/persisted in your chosen backend.

### Section Management
- **Visibility**: Toggle which sections (Hero, Skills, Experience, etc.) appear on your site.
- **Ordering**: Drag or use arrows to reorder sections.
- **Branding**: Fine-tune specific colors for Light and Dark modes.

---

## 📜 Deployment

### Vercel / Netlify
1. Connect your GitHub repository.
2. Add your `.env` variables to the deployment dashboard.
3. Use the following build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ by the DevFolio Community.
</p>
