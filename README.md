# 🔥 Heatcheck

A modern video streaming platform showcasing the hottest hip-hop and R&B music videos, featuring artists like Drake, Travis Scott, Kendrick Lamar, SZA, and more.

## ✨ Features

- **Video Streaming**: High-quality video playback with custom controls
- **YouTube Integration**: Real-time data from YouTube Data API v3
- **Cast Support**: Chromecast and Apple TV casting functionality
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, minimalist interface with Tailwind CSS
- **Real Artists**: Features actual music videos from top hip-hop and R&B artists

## 🎵 Featured Artists

- Drake, Travis Scott, Kendrick Lamar
- SZA, The Weeknd, Doja Cat
- Lil Baby, Gunna, Bad Bunny
- Cardi B, Megan Thee Stallion
- And many more top artists

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **UI Components**: Shadcn/ui
- **API**: YouTube Data API v3
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- YouTube Data API v3 key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/heatcheck.git
   cd heatcheck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your YouTube API key to `.env`:
   ```env
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   VITE_APP_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔑 YouTube API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Create credentials → **API Key**
5. Restrict the key to YouTube Data API v3
6. Add the key to your environment variables

## 📦 Build for Production

```bash
npm run build
```

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/heatcheck)

Or deploy manually:

```bash
npm i -g vercel
vercel
```

## 📱 Features Overview

### Video Player
- Custom video controls (play/pause, progress, volume)
- Like, share, and cast buttons
- Responsive video sizing
- Thumbnail previews

### Up Next Queue
- Horizontal scrolling video list
- Click to switch videos instantly
- Video thumbnails and metadata
- Smooth animations and transitions

### Cast Integration
- Chromecast support
- Apple TV support
- Mock casting functionality
- Seamless device switching

## 🎨 Design System

- **Base font size**: 14px
- **Typography**: Optimized for readability
- **Colors**: Modern light theme with professional branding
- **Components**: Reusable UI components with Shadcn/ui
- **Responsive**: Mobile-first design approach

## 📄 License

This project is for demonstration purposes. Music video content is owned by respective artists and labels.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Ryan McCaulsky** - ryan.mccaulsky@gmail.com

---

**🔥 Built with passion for music and clean code**