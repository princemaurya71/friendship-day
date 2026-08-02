# Happy Friendship Day - Animated Frosted Glass Greeting Card

An interactive, production-ready, hands-free animated single-page web application celebrating **Happy Friendship Day**. Designed with a modern **Frosted Glass (Glassmorphism)** aesthetic, ambient background lights, automated multi-stage timeline animations, Background Music, and celebratory confetti bursts.
<img width="1073" height="735" alt="image" src="https://github.com/user-attachments/assets/2493ecee-84f0-48c3-ba47-8740fc598489" />

---

## ✨ Features

- 🪄 **Hands-Free Automated Timeline Sequence**:
  - **Scene 1 (0s – 1.5s)**: Glowing 3D envelope scales in with ambient background mesh orbs.
  - **Scene 2 (1.5s – 3.0s)**: Flap unfolds smoothly with a peaceful Web Audio chime sweep and frosted glass bloom.
  - **Scene 3 (3.0s – 5.0s)**: Sequential text reveal featuring recipient badge, glowing header, memory photo frame, personal message, and friendship quote.
  - **Scene 4 (5.0s+)**: Multi-cannon confetti burst, sound FX, and continuous floating sparkles, stars, and hearts loop.
- 🎨 **Frosted Glass Aesthetic**: Glassmorphism (`backdrop-blur-2xl`, frosted panel borders, ring highlights), ambient glow orbs, and vibrant color palettes.
- 🛠️ **Full Customization**:
  - Change recipient name, sender name, personal message, and select from preset friendship quotes.
  - Add or choose custom memory photos (Polaroid-style frame with tape detail).
  - Switch between 5 theme presets: *Frosted Indigo*, *Frosted Rose*, *Frosted Cyber*, *Frosted Ethereal*, and *Frosted Obsidian*.
- 💌 **Interactive "Sent with Love" & Share**:
  - Clickable "Sent with Love" button triggers celebratory confetti, chime sounds, and opens the Share Modal.
  - Quick share to WhatsApp, X (Twitter), device native share API, or copy preview message to clipboard.
- 🎵 **Background Music**: This makes website pretty much good.
- 🕹️ **Interactive Control Bar**: Toggle play/pause, replay sequence, skip to final card, toggle playback speed (0.5x, 1.0x, 1.5x), mute/unmute audio, customize card, and shoot manual confetti.
- 📱 **100% Mobile & Desktop Responsive**: Fits comfortably within `100vh` / `100dvh` viewport without unwanted scrolling.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Motion / Framer Motion](https://motion.dev/)
- **FX**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sound**: Personal Favourite Song

---

## 📁 Project Structure

```
├── src/
│   ├── Assets/audio
    ├── components/
│   │   ├── BackgroundEffects.tsx  # Floating particles, ambient frosted mesh orbs
│   │   ├── CardContent.tsx        # Internal message, memory photo, quote & "Sent with Love"
│   │   ├── ControlBar.tsx         # Bottom floating timeline toolbar & controls
│   │   ├── CustomizeModal.tsx     # Card editor modal for names, messages & themes
│   │   ├── EnvelopeCard.tsx       # 3D Envelope & unfolded glassmorphism container
│   │   ├── FriendshipCard.tsx     # Main application state & timeline orchestra
│   │   └── ShareModal.tsx         # Share greeting modal & clipboard helper
│   ├── data/
│   │   └── themes.ts              # Theme presets & default friendship quotes
│   ├── utils/
│   │   ├── audio.ts               # Web Audio API sound synthesizer engine
│   │   └── confetti.ts            # Canvas confetti cannons & heart sparkle FX
│   ├── types.ts                   # TypeScript interfaces & types
│   ├── App.tsx                    # Main App entry wrapper
│   ├── index.css                  # Tailwind CSS imports & scrollbar utilities
│   └── main.tsx                   # React root launcher
├── metadata.json                  # 
├── package.json                   # Project dependencies & scripts
├── tsconfig.json                  # TypeScript compiler setup
└── vite.config.ts                 # Vite setup
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository and navigate into the project folder:
   ```bash
   git clone <repository-url>
   cd friendship-card
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

---

## 💻 Building for Production

To build the application for production:

```bash
npm run build
```

This will run TypeScript type checks and generate optimized static assets in the `dist/` directory.

---

## 📄 License

Feel free to customize and share with your best friends!

