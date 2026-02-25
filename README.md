# TaskFlow — Scalable Task Management Web App

A full-stack web application with **authentication**, a **protected dashboard**, and **complete CRUD operations** — built with Next.js, Express, MongoDB, and Tailwind CSS.

---

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | Next.js 15 (App Router), Tailwind CSS |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB Atlas (Mongoose ODM)        |
| Auth       | JWT (JSON Web Tokens), bcryptjs     |

---

## Features

- **User Authentication** — Register & login with JWT-based session management
- **Password Validation** — Enforced on both client & server (min 6 chars, 1 uppercase, 1 number)
- **Protected Dashboard** — Only accessible to authenticated users, auto-redirects to login
- **Full CRUD** — Create, read, update (toggle status), and delete tasks
- **Search & Filter** — Real-time search by title + filter by status (All / Pending / Completed)
- **User Profile Display** — Shows logged-in user's name and email in the navbar
- **Toast Notifications** — Auto-dismiss success/error/info messages on every action
- **Confirm Delete Modal** — Prevents accidental deletions with a confirmation dialog
- **Stats Dashboard** — Live counters for total, pending, and completed tasks
- **Modern SaaS UI** — Dark gradient theme with glassmorphism, responsive design

---

## Project Structure

```
prime-frontend-task/
├── backend/
│   ├── server.js              # Express server entry point
│   ├── .env                   # Environment variables
│   ├── models/
│   │   ├── User.js            # User schema (name, email, password)
│   │   └── Task.js            # Task schema (title, status, user ref)
│   ├── controllers/
│   │   ├── authController.js  # Register & login logic
│   │   └── taskController.js  # CRUD operations
│   ├── routes/
│   │   ├── authRoutes.js      # POST /register, POST /login
│   │   ├── userRoutes.js      # GET /profile, PUT /profile
│   │   └── taskRoutes.js      # POST, GET, PUT, DELETE /tasks
│   └── middleware/
│       └── authMiddleware.js  # JWT verification middleware
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx           # Landing page
│       │   ├── layout.tsx         # Root layout with AuthProvider
│       │   ├── globals.css        # Global styles + animations
│       │   ├── login/page.js      # Login page
│       │   ├── register/page.js   # Register page
│       │   └── dashboard/page.js  # Protected dashboard
│       ├── components/
│       │   ├── ProtectedRoute.jsx # Auth guard component
│       │   ├── Toast.jsx          # Toast notification component
│       │   └── ConfirmModal.jsx   # Delete confirmation modal
│       ├── context/
│       │   └── AuthContext.js     # Auth state management
│       └── services/
│           └── api.js             # API service layer
└── README.md
```

---

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone <repo-url>
cd prime-frontend-task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

The API will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Body                              | Description        |
| ------ | -------------------- | --------------------------------- | ------------------ |
| POST   | `/api/auth/register` | `{ name, email, password }`       | Register a new user |
| POST   | `/api/auth/login`    | `{ email, password }`             | Login & get JWT    |

### User Profile (Protected)

| Method | Endpoint             | Body                  | Description         |
| ------ | -------------------- | --------------------- | ------------------- |
| GET    | `/api/user/profile`  | —                     | Get current user    |
| PUT    | `/api/user/profile`  | `{ name, email }`     | Update profile      |

### Tasks (Protected)

| Method | Endpoint             | Body / Query                          | Description          |
| ------ | -------------------- | ------------------------------------- | -------------------- |
| POST   | `/api/tasks`         | `{ title, description? }`            | Create a task        |
| GET    | `/api/tasks`         | `?search=keyword&status=pending`      | List & filter tasks  |
| PUT    | `/api/tasks/:id`     | `{ title?, description?, status? }`   | Update a task        |
| DELETE | `/api/tasks/:id`     | —                                     | Delete a task        |

> All protected routes require `Authorization: Bearer <token>` header.

---

## Scaling Considerations

If this application needed to support **10,000+ users**, here's what I would implement:

### 1. Database Layer
- **Indexing** — Add MongoDB indexes on `user` + `status` fields in the Task collection and `email` in User collection for fast lookups
- **Connection pooling** — Use Mongoose's built-in connection pool (default 5, increase to 50+ for high traffic)
- **Read replicas** — Use MongoDB Atlas secondary reads for GET-heavy endpoints like task listing
- **Sharding** — Shard the Tasks collection by `user` field to distribute data across nodes

### 2. Backend / API Layer
- **Horizontal scaling** — Run multiple Express instances behind a load balancer (Nginx or AWS ALB)
- **Rate limiting** — Add `express-rate-limit` to prevent abuse (e.g., 100 requests/min per IP)
- **Caching** — Use Redis to cache frequently accessed data (user profiles, task counts) with short TTLs
- **Input validation** — Add `express-validator` or `joi` for strict request validation at scale
- **Pagination** — Implement cursor-based pagination on GET `/tasks` instead of returning all tasks

### 3. Frontend Layer
- **Static generation** — Pre-render the landing page with Next.js SSG for instant loads
- **Code splitting** — Next.js already handles this via dynamic imports
- **Optimistic updates** — Update UI immediately before API confirms (better perceived performance)
- **Service workers** — Add offline support for viewing cached tasks

### 4. Infrastructure
- **Containerization** — Dockerize both services for consistent deployments
- **CI/CD** — GitHub Actions for automated testing and deployment
- **Monitoring** — Add health check endpoints (`/api/health`) and integrate with monitoring tools (e.g., Datadog, PM2)
- **Environment separation** — Separate staging and production environments with different MongoDB clusters

### 5. Security at Scale
- **Refresh tokens** — Implement refresh token rotation instead of long-lived JWTs
- **CORS whitelisting** — Restrict origins to the deployed frontend domain only
- **Helmet.js** — Add security headers in production
- **Request size limits** — Cap payload sizes to prevent abuse

---

## Screenshots

| Page       | Description                                |
| ---------- | ------------------------------------------ |
| Landing    | Hero section with feature grid             |
| Login      | Dark glassmorphism form with validation    |
| Register   | Account creation with inline validation    |
| Dashboard  | Task management with stats, search, filter |

---

## Author

Built as part of the **Frontend Developer Intern — Round 0 Task** for Prime.
