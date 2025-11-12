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

```ts
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
  instagramLink: "https://www.instagram.com/luna.gustah/",
  // ...other social links
  footer: "made with ❤️, ustav",
};
```

### 3. Configure Gallery (Optional)

Edit [`config/config.gallery.ts`](./config/config.gallery.ts) to add your albums and media.

### 4. Run Development Server

```bash
bun dev  # or npm run dev / yarn dev
```

Visit `http://localhost:3000` to see your site!

## 🤖 uMimic — AI Chat Feature

uMimic is an interactive AI chat component that lets visitors talk to a personalized AI version of you.

### Setup uMimic

1. **Configure Personalities** — Edit [`config/config.umimic.ts`](./config/config.umimic.ts):

```ts
export const UmimicConfig: UmimicConfigT = {
  apiBaseUrl: "https://your-backend-url.com", // Your uMimic backend URL
  greeting: "hey whats up? how's your day going?",
  
  personalities: [
    {
      name: "Casual",
      prompt: `Your personality prompt here...`,
    },
    {
      name: "Formal",
      prompt: `Your formal personality prompt...`,
    },
  ],
};
```

2. **Backend Setup** — uMimic requires a backend API to handle AI requests:
   - Check out the official backend: [xyztavo/umimic](https://github.com/xyztavo/umimic)
   - Deploy your own instance or use the provided endpoint
   - Update `apiBaseUrl` in your config

3. **Enable in Config** — Make sure `umimic: true` in your main `config.ts`

### How It Works

- Click the ✨ **Stars** button to open the chat modal
- Select between different personality modes (e.g., Casual, Formal)
- Messages are sent to the backend API with conversation history
- Responses include typewriter animation for a natural feel
- Conversation history is saved locally and auto-clears daily

### Customization

- **Personalities**: Add/edit in `config.umimic.ts` with custom system prompts
- **Styling**: Components are in `components/mimic/` for easy customization
- **Greeting**: Change the default greeting message
- **Links**: Include your social links in the AI's knowledge base

## 📦 Project Structure

```
ulinked/
├── app/                    # Next.js app directory
├── components/
│   ├── app/               # Main app components
│   ├── mimic/             # uMimic chat components
│   ├── blog/              # Blog components
│   └── icons/             # Icon components
├── config/                # Configuration files
│   ├── config.ts          # Main config
│   ├── config.gallery.ts  # Gallery config
│   ├── config.umimic.ts   # AI chat config
│   └── config.blog.ts     # Blog config
├── public/assets/         # Static assets
└── styles/                # Global styles
```

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) — React framework
- [HeroUI](https://heroui.com/) — UI component library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Lanyard](https://github.com/Phineas/lanyard) — Discord activity tracking
- [Axios](https://axios-http.com/) — HTTP client

## 📝 Usage

Refer to the example configuration files in the `config/` directory for sample setups and options:
- `config/config.ts`
- `config/config.gallery.ts`
- `config/config.umimic.ts`

This README keeps the usage section concise—open those files for a ready-to-edit example configuration.
## screen shots
<img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss1.png" />
<img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss2.png" />
<img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss3.png" />
<img src="https://raw.githubusercontent.com/xyztavo/ulinked/refs/heads/main/public/assets/ss4.png" />
