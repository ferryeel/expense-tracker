# Expense Tracker

A Next.js full-stack expense tracking application with Supabase PostgreSQL, Prisma ORM, authentication, and real-time charts.

## Features

- **User Authentication** – Sign up and log in securely.
- **Expense Management** – Add, edit, and delete expenses with categories.
- **Categories** – Create and manage custom expense categories.
- **Dashboard** – View expense summary, charts, and spending trends.
- **Charts** – Visualize spending data with Chart.js.

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS (ready to add)
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Authentication**: Clerk (commented out by default; uncomment to enable)

## Setup

### Prerequisites

- Node.js v18+
- npm or yarn
- Supabase account (free tier works great)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials (see below).

3. **Configure Supabase:**
   - Go to [supabase.com](https://supabase.com) and create a new project.
   - Copy your project URL and API keys from **Settings > API**.
   - Add `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.

4. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
   This creates the `User`, `Category`, and `Expense` tables in your Supabase database.

5. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000`

## Project Structure

```
expense-tracker/
├── pages/           # Next.js pages and API routes
├── lib/             # Shared utilities (Prisma, Supabase clients)
├── prisma/          # Prisma schema and migrations
├── styles/          # Global CSS
├── public/          # Static assets
├── .env.example     # Environment variable template
└── package.json     # Dependencies
```

## Database Schema

### User
- `id` – Unique identifier
- `email` – User email (unique)
- `name` – User name (optional)
- `createdAt`, `updatedAt` – Timestamps

### Category
- `id` – Unique identifier
- `name` – Category name (e.g. "Food", "Transport")
- `color` – Hex color for UI visualization
- `userId` – Foreign key to User
- `createdAt`, `updatedAt` – Timestamps

### Expense
- `id` – Unique identifier
- `amount` – Expense amount (float)
- `description` – Optional description
- `date` – Transaction date
- `userId` – Foreign key to User
- `categoryId` – Foreign key to Category
- `createdAt`, `updatedAt` – Timestamps

## Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npx prisma generate   # Regenerate Prisma client
npx prisma migrate dev # Create and run migrations
npx prisma studio    # Open Prisma Studio (visual database editor)
```

## Next Steps

- [ ] Add Clerk authentication and protect routes
- [ ] Build UI components (forms, dashboard, charts)
- [ ] Implement Expense CRUD operations
- [ ] Add Chart.js visualization for spending trends
- [ ] Deploy to Vercel

## Troubleshooting

**Error: "Cannot find type definition for 'node'?"**
- Run: `npm install --save-dev @types/node`

**Error: "DATABASE_URL not set"?**
- Ensure `.env.local` exists and contains your Supabase connection string.

**Error: "Prisma Client not generated"?**
- Run: `npx prisma generate`