# Task Management Application

A production-ready full-stack Task Management application built with **Next.js**, **Express**, **Prisma**, and **Socket.io**.

## 🌐 Live Demo
[https://task-manager-frontend-psi-six.vercel.app](https://task-manager-frontend-psi-six.vercel.app)

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

## 🐳 Docker Support

Run the entire application stack (Frontend, Backend, and PostgreSQL) with a single command:

```bash
docker-compose up --build
```
This will start:
- **Frontend** on port `3000`
- **Backend** on port `3001`
- **PostgreSQL** on port `5432`

## 📚 API Documentation

### Auth
- **POST** `/api/auth/register` - Create a new user
- **POST** `/api/auth/login` - Authenticate user and get token
- **GET** `/api/auth/me` - Get current user profile
- **PUT** `/api/auth/me` - Update current user profile
- **GET** `/api/auth/users` - List all users

### Tasks
- **GET** `/api/tasks` - Get all tasks (supports filtering)
- **POST** `/api/tasks` - Create a new task
- **GET** `/api/tasks/:id` - Get task by ID
- **PUT** `/api/tasks/:id` - Update task
- **DELETE** `/api/tasks/:id` - Delete task

### Notifications
- **GET** `/api/notifications` - Get user notifications
- **PATCH** `/api/notifications/:id/read` - Mark notification as read

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

## 🏗️ Architecture & Design Decisions

### 1. Database Choice: PostgreSQL + Prisma
- **PostgreSQL** was chosen for its reliability and robust relational data capabilities. It perfectly models the relationship between Users and Tasks (One-to-Many).
- **Prisma** is used as the ORM to provide strict type safety between the database and the backend code. This catches errors at build time rather than runtime and provides a clean API for complex queries.

### 2. Authentication: JWT (Stateless)
- Authentication is handled using **JSON Web Tokens (JWT)**. This allows the backend to remain stateless, which is ideal for scalability (e.g., deploying on serverless platforms like Vercel or container services like Render).
- **bcrypt** is used to securely hash passwords before storage.
- An **Auth Middleware** intercepts protected routes, verifying the token signature and attaching the user to the request context.

### 3. Backend Architecture: Layered Approach
The backend is structured using a **Controller-Service-Repository** pattern to ensure Separation of Concerns:
- **Routes**: Define the API endpoints and map them to controllers.
- **Controllers**: Handle HTTP requests/responses and input validation.
- **Services**: Contain the core business logic (e.g., verifying task ownership).
- **Repositories**: Handle direct database interactions (performing CRUD operations via Prisma).
- **DTOs (Data Transfer Objects)**: We use **Zod** schemas to validate incoming data, ensuring strict type adherence and preventing invalid data from entering the system.

### 4. Real-time Updates: Socket.io
- **Socket.io** is integrated to provide real-time feedback to users without page refreshes.
- When a task is assigned to a user, the backend emits a `notification` event to the specific user's socket room (joined via their User ID).
- The frontend listens for this event and instantly updates the notification list and UI indicators, creating a responsive and collaborative user experience.
