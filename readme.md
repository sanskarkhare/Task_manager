# Task Management Application

A production-ready full-stack Task Management application built with **Next.js**, **Express**, **Prisma**, and **Socket.io**.

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, React Query
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Real-time**: Socket.io
- **Auth**: JWT, bcrypt

## 🛠️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone <repo-url>
    cd Task-manager
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in `backend/` based on `backend/.env.example`.
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
    JWT_SECRET="secret"
    PORT=3001
    ```

4.  **Database Setup**
    Ensure PostgreSQL is running, then run migrations:
    ```bash
    cd backend
    npx prisma migrate dev --name init
    ```

5.  **Running the App**
    From the root directory:
    ```bash
    npm run dev
    ```
    - Frontend: http://localhost:3000
    - Backend: http://localhost:3001

## 🧪 Testing

Run backend unit tests:
```bash
cd backend
npm test
```

## 📦 Deployment

- **Frontend**: Deploy to [Vercel](https://vercel.com).
- **Backend**: Deploy to [Render](https://render.com) using the `backend/Dockerfile` or native Node environment.
- **Database**: Use a managed PostgreSQL (e.g., Render, Neon, Supabase).

## 🗄️ Database Justification

**PostgreSQL** was chosen for its robust relational data model, which fits the `User` <-> `Task` relationship perfectly. **Prisma** ensures type safety across the database layer, preventing runtime errors and improving developer experience.
