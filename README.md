# 🚀 Bykorp Digital Agency

A modern, full-stack digital agency website built with React 19, MongoDB Atlas, and Express.js.

## ✨ Features

- **🎨 Modern UI/UX**: Built with React 19 + Tailwind CSS
- **🌙 Dark Mode**: Automatic theme switching
- **📱 Responsive Design**: Mobile-first approach
- **🎠 Interactive Carousels**: Swiper.js integration
- **📝 Contact Forms**: Full reservation management
- **☁️ Cloud Database**: MongoDB Atlas integration
- **🔐 Secure API**: Express.js backend with CORS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Swiper.js** - Modern touch slider
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **TypeScript** - Full-stack type safety

## 🚀 Live Demo

- **Frontend**: [GitHub Pages](https://yourusername.github.io/bykorp-digital-agency/)
- **API**: Deploy backend to Render, Railway, or Vercel

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bykorp-digital-agency.git
   cd bykorp-digital-agency
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bykorp_agency
   PORT=3001
   NODE_ENV=development
   ```

4. **Start development servers**
   ```bash
   npm run dev:full
   ```
   - Frontend: http://localhost:5174
   - Backend: http://localhost:3001

## 📦 Deployment

### Frontend (GitHub Pages)

1. **Configure repository settings**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

2. **Deploy automatically**
   ```bash
   npm run deploy
   ```

3. **Or push to main branch** (GitHub Actions will deploy automatically)

### Backend Deployment Options

#### Option 1: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

#### Option 2: Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with one click

#### Option 3: Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🔧 Scripts

```bash
npm run dev          # Start frontend only
npm run server       # Start backend only  
npm run dev:full     # Start both frontend & backend
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to GitHub Pages
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── react-app/           # Frontend React application
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route components
│   ├── hooks/          # Custom React hooks
│   └── main.tsx        # React entry point
├── server/             # Backend Express application
│   └── index.ts        # Express server with MongoDB
└── shared/             # Shared TypeScript types
    └── types.ts
```

## 🌍 Environment Variables

### Development (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bykorp_agency
PORT=3001
NODE_ENV=development
```

### Production (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help, please open an issue or contact us at contact@bykorp.com

---

Made with ❤️ by [Bykorp Digital Agency](https://github.com/yourusername/bykorp-digital-agency)
