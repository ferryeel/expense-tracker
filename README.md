# InsightPro

Experience the next generation of financial tracking with **Horizontal Intelligence**. Optimized for wide-screen utility, InsightPro eliminates vertical scrolling by delivering side-by-side snapshots, ledgers, and analytics in a high-fidelity, frosted-glass interface.

---

## 📽️ Tutorial & Full Feature Walkthrough

Experience InsightPro in action. This 1-minute tutorial covers the premium landing page, horizontal workspace navigation, and real-time ledger synchronization.

![InsightPro Tutorial Walkthrough](C:/Users/user/.gemini/antigravity/brain/b461224a-82ac-4270-a660-9bd12c7f8380/insightpro_full_tutorial_v834_1772655514852.webp)

---

## ✨ Elite Features

- **Horizontal Intelligence** – A 3-column workspace designed for wide-screen efficiency.
- **Modern Light Aesthetic** – Professional frosted-glass (Glassmorphism) UI with indigo precision accents.
- **Real-time Operational Ledger** – High-density transaction documentation with instant feedback.
- **Adaptive Analytics** – Magnitude allocation maps that update in real-time.
- **Premium Landing Experience** – A high-conversion entry point with pulsating CTA and hero visualization.

---

## 🚀 Tech Stack

- **Core**: Next.js 13, React, TypeScript
- **Styling**: Tailwind CSS v4 (Migrated for peak performance)
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk Integration

---

## 🛠️ Setup & Installation

### 1. Prerequisites
- Node.js v18+
- Supabase Account
- Clerk Account

### 2. Initialization
```bash
# Clone and install
npm install

# Set up environment
cp .env.example .env.local
```

### 3. Database Sync
Add your `DATABASE_URL` to `.env.local` and synchronize:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Deploy Dev Server
```bash
npm run dev
```
Accessible at `http://localhost:3000`

---

## 📂 System Architecture

```
insight-pro/
├── pages/           # Horizontal Dashboard & API Engine
├── components/      # Glassmorphic Widget Ecosystem
├── lib/             # Prisma & Database Abstractions
├── styles/          # Tailwind v4 Style Engine
└── prisma/          # Intelligence Schema
```

---

## 📜 Documentation

For a detailed technical breakdown of the UI overhaul and implementation decisions, refer to the [walkthrough.md](C:/Users/user/.gemini/antigravity/brain/b461224a-82ac-4270-a660-9bd12c7f8380/walkthrough.md).

---

© 2026 InsightPro • Intelligent Financial Systems.