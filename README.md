<div align="center">
  <img src="https://crypto-dashboard-vg.vercel.app/logo.png" width="80px" alt="Crypto Dashboard Logo"/>
  <h1>🚀 Crypto Dashboard</h1>
  <p><strong>Real-time cryptocurrency tracking dashboard with live market data, trending coins, and comprehensive analytics</strong></p>
  
  <div>
    <a href="https://cryptodash-houewwvpj-dhruvgarg4521s-projects.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-View%20Dashboard-blue?style=for-the-badge&logo=vercel" alt="Live Demo"/>
    </a>
    <a href="https://github.com/dhruvgarg4521/cryptodash" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github" alt="GitHub"/>
    </a>
  </div>
  
  <br/>
  
  <img src="https://img.shields.io/badge/Next.js-14.2.4-black?style=flat&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18-blue?style=flat&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat&logo=tailwind-css" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/PWA-Supported-green?style=flat&logo=pwa" alt="PWA"/>
</div>

---

## 📊 Live Demo

**🌐 [View Live Dashboard](https://cryptodash-houewwvpj-dhruvgarg4521s-projects.vercel.app/)**

---

## ✨ Features

### 🔥 **Real-time Market Data**
- **Live cryptocurrency prices** from CoinGecko API
- **Auto-refresh every 5 minutes** for up-to-date information
- **Global market cap** and market trends
- **24-hour price changes** with color-coded indicators

### 📈 **Comprehensive Analytics**
- **Top 10 cryptocurrencies** by market cap
- **Trending coins** with price performance
- **Detailed coin information** with charts and statistics
- **Market outlook** with global crypto statistics

### 🔍 **Advanced Search & Explore**
- **Instant search** across all cryptocurrencies
- **Explore page** with paginated coin listings
- **Detailed coin pages** with comprehensive data
- **Interactive charts** and price history

### 🎨 **Modern UI/UX**
- **Dark/Light theme** toggle
- **Responsive design** for all devices
- **PWA support** for mobile installation
- **Smooth animations** and transitions

### 🛡️ **Performance & Reliability**
- **Rate limiting** to respect API limits
- **Fallback data** for offline scenarios
- **Optimized loading** with skeleton screens
- **Error handling** with user-friendly messages

### 🔐 **Authentication**
- **Google OAuth** integration
- **Secure session management**
- **User preferences** storage

---

## 🖼️ Screenshots

### 📱 Dashboard Overview
![Dashboard](https://github.com/user-attachments/assets/32a14d0c-2c8a-4544-9435-863e32d636e0)

### 🔍 Search Functionality
![Search](https://github.com/user-attachments/assets/ec0e6292-c782-49e2-ad0e-53445d8d1d2d)

### 🌐 Explore Page
![Explore](https://github.com/user-attachments/assets/c5e5e1b3-fbff-4f2a-90b1-5bc6f5105f7b)

### 🪙 Coin Details
![Coin Details](https://github.com/user-attachments/assets/f08e6b86-ce82-468b-aaa8-e41c59b987db)

### 🌖 Theme Toggle
![Theme](https://github.com/user-attachments/assets/83f22249-fa0f-4af1-b971-26c6596dcf16)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   https://github.com/dhruvgarg4521/cryptodash.git
   cd Crypto-Dashboard-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.sample .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   # CoinGecko API (Optional - for higher rate limits)
   COINGECKO_API_KEY=your_coingecko_api_key
   
   # Google OAuth (Required for authentication)
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **CoinGecko API** - Cryptocurrency data
- **NextAuth.js** - Authentication
- **Next-PWA** - Progressive Web App
- **Vercel** - Deployment platform

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `COINGECKO_API_KEY` | CoinGecko API key for higher rate limits | No |
| `GOOGLE_ID` | Google OAuth client ID | Yes |
| `GOOGLE_SECRET` | Google OAuth client secret | Yes |
| `NEXTAUTH_URL` | NextAuth.js URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret | Yes |

### API Rate Limits

- **Free tier**: 50 calls/minute
- **Pro tier**: 1000 calls/minute (with API key)
- **Auto-refresh**: Every 5 minutes
- **Fallback data**: Available when API is unavailable

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

3. **Manual deployment**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### Environment Variables for Production

Set these in your Vercel dashboard:
```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
COINGECKO_API_KEY=your-coingecko-api-key
```

---

## 📊 Performance

### Optimizations
- **Image optimization** with Next.js
- **Code splitting** and lazy loading
- **PWA caching** strategies
- **API rate limiting** and fallbacks
- **Responsive design** for all devices

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📝 License

This project is licensed under the **AGPL v3 License**.

---

## 📞 Support & Contact

[![GitHub](https://img.shields.io/badge/GitHub-black.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dhruvgarg4521/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dhruv-garg-546a38248/)

---

<div align="center">
  <p><strong>Built with ❤️ by Dhruv Garg</strong></p>
</div>
