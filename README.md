# ulinked

A modern, feature-rich linktree alternative built with Next.js 14, HeroUI, and TypeScript.

## ✨ Features

- 🎨 **Modern UI** — Built with HeroUI and Tailwind CSS for a clean, responsive design
- 📸 **Gallery** — Showcase photos and videos in an elegant album layout
- 🎮 **Discord Integration** — Display real-time Discord activities via [Lanyard](https://github.com/Phineas/lanyard)
- 🤖 **AI Chat (uMimic)** — Interactive AI-powered chat with customizable personalities
- 📝 **Blog Support** — Share your thoughts and projects
- 🌙 **Dark/Light Mode** — Built-in theme switching
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/xyztavo/ulinked.git
cd ulinked
bun install  # or npm install / yarn install
```

### 2. Configure Your Profile

Edit the main configuration file at [`config/config.ts`](./config/config.ts):

````ts
const config: Config = {
  options: {
    blog: true,
    gallery: true,
    umimic: true, // Enable AI chat
  },
  nickname: "ustav",
  lanyard: {
    active: true,
    discordId: "801073563368947742",
  },
  accentColor: "#7300ff",
  avatarImgSrc: "/assets/profile.png",
  buttons: [
    {
      title: "My Gym App",
      link: "https://ugogym.vercel.app/",
    },
    // Add more buttons...
  ],
  githubLink: "https://github.com/xyztavo",
  # ulinked

  A minimal linktree-style site built with Next.js, HeroUI and Tailwind.

  ## ✨ Highlights

  - Clean, responsive UI (HeroUI + Tailwind)
  - Gallery support for photos/videos
  - Discord status via Lanyard
  - Optional AI chat (uMimic) with selectable personalities

  ## 🚀 Quick Start

  ```bash
  git clone https://github.com/xyztavo/ulinked.git
  cd ulinked
  bun install   # or npm install / yarn install
  bun dev       # or npm run dev / yarn dev
````

Edit your profile and features in `config/config.ts`. See `config/` for ready examples.

## 🤖 uMimic (AI Chat)

To enable uMimic, edit `config/config.umimic.ts` (set `apiBaseUrl`, `greeting`, and `personalities`) and enable `umimic` in `config/config.ts`. You also need a uMimic backend (see `xyztavo/umimic`).

How it works: the frontend sends messages and conversation history to your backend, which returns AI replies. Conversation history is stored locally and auto-clears daily.

Customize personalities in `config/config.umimic.ts` and tweak UI in `components/mimic/`.

## 🖼️ Gallery

The gallery supports albums with images and videos. Configure albums and media in `config/config.gallery.ts` — media are stored under `public/assets/` and rendered with a clean album layout.

## 📝 Blog

Built-in blog support uses markdown posts and simple components under `components/blog/`. Enable the blog in `config/config.ts` and add posts in the `app/` routes or the `blog` folder depending on your setup.

## Project Structure (short)

`app/`, `components/`, `config/`, `public/`, `styles/` — check the `config/` folder for example files.

## Built With

- Next.js 14
- HeroUI + Tailwind CSS
- Framer Motion (animations)
- Axios (HTTP)

## Screenshots

  <img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss1.png" />
  <img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss2.png" />
  <img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss3.png" />
  <img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss4.png" />
   - Update `apiBaseUrl` in your config
