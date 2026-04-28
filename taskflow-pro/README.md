# TaskFlow Pro – Premium MERN Task Manager SaaS

Production-ready full-stack MERN app with admin/user dashboards, role-based auth, Kanban, calendar, analytics, notifications, and reports export.

## Project Structure

```
taskflow-pro/
├── client/
├── server/
├── .env.example
└── README.md
```

## Quick Start

1. Create `.env` in `taskflow-pro/` from `.env.example`.
2. Install dependencies:
   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```
3. Run app:
   ```bash
   npm run dev
   ```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Demo Accounts (after seeding)

```bash
npm run seed --prefix server
```

- Admin: `admin@taskflowpro.com` / `Admin@123`
- User: `user@taskflowpro.com` / `User@123`

## APIs

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `PUT /api/auth/profile`
- `PUT /api/auth/change-password`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Users (Admin)
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `PATCH /api/users/block/:id`

### Tasks
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Reports
- `GET /api/reports/analytics`
- `GET /api/reports/export/pdf`
- `GET /api/reports/export/csv`

## Security

- JWT in HttpOnly cookies
- Role-based authorization middleware
- Helmet + CORS + rate limiting
- Password hashing with bcryptjs
- Request validation using express-validator
