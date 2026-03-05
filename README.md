# Expense Tracker

A modern, full-featured expense tracking application built with Next.js, React, and Tailwind CSS. Track your spending by category, visualize trends with interactive charts, and manage your finances with ease.

---

## 📽️ Features & Quick Start

### ✨ Core Features

- **Category Management** – Create and organize expense categories with custom colors
- **Expense Tracking** – Record expenses with descriptions, amounts, and dates
- **Real-time Analytics** – View stats including total expenses, monthly/weekly breakdowns
- **Interactive Charts** – Pie charts for category breakdown, bar charts for trends
- **Modern UI** – Clean, responsive design built with Tailwind CSS and Glassmorphism
- **Single-click Dashboard Navigation** – Switch between Overview, Expenses, Categories, and Charts tabs

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ferryeel/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   # The .env and .env.local files are pre-configured for SQLite
   # No additional configuration needed!
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at **http://localhost:3000**

---

## 📖 Usage Guide

### Dashboard Overview
The dashboard is divided into 4 main sections:

#### 1. **Overview Tab** (Home)
- Quick expense form for adding new expenses
- Summary of the 10 most recent expenses
- Statistics overview showing total, current month, and current week spending

#### 2. **Expenses Tab**
- Complete list of all recorded expenses
- Filter by category, date range
- Delete expenses (click the trash icon)
- See category associations for each expense

#### 3. **Categories Tab** (Domains)
- **Add New Domain**: Enter category name and select a color
- **View Active Segments**: See all created categories
- **Delete Categories**: Hover and click the X button to remove a category
- All expenses using a category are preserved when viewing

#### 4. **Charts Tab**
- **Category Pie Chart**: Visual breakdown of expenses by category
- **Monthly Bar Chart**: Track spending trends over months
- **Weekly Trends**: See weekly expense patterns
- **Timeline**: Interactive expense timeline

### Workflow Example

1. **Create a Category**
   - Go to "Categories" tab
   - Enter category name (e.g., "groceries", "transportation")
   - Select a color
   - Click "Register Domain"

2. **Add an Expense**
   - Go to "Expenses" or "Overview" tab
   - Enter amount
   - Add optional description (e.g., "grocery shopping")
   - Select the category from dropdown
   - Choose date (defaults to today)
   - Submit the form

3. **View Analytics**
   - Go to "Charts" tab
   - See which categories consume the most budget
   - Review spending trends over time

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 13, React 18, TypeScript |
| **Styling** | Tailwind CSS v4, Glassmorphism UI |
| **Backend** | Next.js API Routes |
| **Database** | SQLite (local development) |
| **ORM** | Prisma v5 |
| **Charts** | Chart.js, React Chart.js 2 |
| **Authentication** | Mock Clerk (Development) |

---

## 📁 Project Structure

```
expense-tracker/
├── pages/
│   ├── index.tsx              # Home page
│   ├── dashboard/
│   │   └── index.tsx          # Main dashboard
│   ├── api/
│   │   ├── categories/        # Category CRUD endpoints
│   │   ├── expenses/          # Expense CRUD endpoints
│   │   └── stats.ts           # Statistics endpoint
│   └── _app.tsx              # App wrapper
├── components/
│   ├── DashboardContent.tsx   # Main dashboard layout
│   ├── CategoryManager.tsx    # Category creation/management
│   ├── ExpenseForm.tsx        # Expense input form
│   ├── ExpenseList.tsx        # Expense listing
│   ├── StatsOverview.tsx      # Statistics cards
│   ├── CategoryPieChart.tsx   # Chart visualizations
│   ├── MonthlyBarChart.tsx
│   ├── TimelineChart.tsx
│   └── HomeContent.tsx
├── hooks/
│   ├── useCategories.ts       # Category state management
│   ├── useExpenses.ts         # Expense state management
│   └── useStats.ts            # Statistics state management
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── clerk-mock.tsx         # Mock authentication
│   ├── supabase.ts            # Database utilities
│   └── utils.ts               # Helper functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── dev.db                 # SQLite database (auto-created)
├── styles/
│   └── globals.css            # Global styles
└── public/
    └── [Assets]
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma generate # Generate Prisma client
npx prisma db push  # Sync database schema
npx prisma studio  # Open Prisma Studio (DB explorer)

# Linting
npm run lint        # Run ESLint
```

---

## 🗂️ Database Schema

The application uses a simple 3-model schema:

```prisma
model User {
  id        String      @id @default(cuid())
  email     String      @unique
  name      String?
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  categories Category[]
  expenses   Expense[]
}

model Category {
  id        String      @id @default(cuid())
  name      String
  color     String      @default("#6366f1")
  userId    String
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  user      User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  expenses  Expense[]
  @@unique([userId, name])
}

model Expense {
  id          String      @id @default(cuid())
  amount      Float
  description String?
  date        DateTime    @default(now())
  userId      String
  categoryId  String
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  category    Category    @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  @@index([userId])
  @@index([categoryId])
  @@index([date])
}
```

---

## 🐛 Known Limitations & Development Notes

- **Mock Authentication**: Currently uses mock Clerk authentication for development
- **SQLite Database**: Uses local SQLite for development; production should use PostgreSQL
- **Single User**: App is designed for single-user demo; can be extended for multi-user

---

## 🔄 Recent Fixes & Improvements

✅ **Fixed Prisma Configuration** – Resolved v7 Accelerate dependency issues, downgraded to Prisma v5  
✅ **Database Connectivity** – Switched from unreachable PostgreSQL to local SQLite  
✅ **Category Creation** – Fixed foreign key constraint by implementing user auto-creation  
✅ **Category Dropdown** – Resolved category list synchronization across components  
✅ **JSON Error Handling** – Fixed API error responses to return valid JSON  

---

## 📝 License

MIT © 2026

---

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

---

© 2026 Expense Tracker • Personal Finance Management