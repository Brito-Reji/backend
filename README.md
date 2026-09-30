# Buildathon Backend Application

Welcome to the backend repository for our Buildathon project. This service is built using Node.js, Express, TypeScript, and Prisma (with PostgreSQL).

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Local Setup & Installation](#local-setup--installation)
- [Environment Variables](#environment-variables)
- [Database Management](#database-management)
- [API Documentation](#api-documentation)
- [CI/CD & Deployment](#cicd--deployment)
- [Security Practices](#security-practices)

---

## Architecture Overview
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (Compliant with Buildathon SQL requirement)

---

## Prerequisites
Ensure you have the following installed on your machine before starting:
- [Node.js](https://nodejs.org/en/) (v18 or v20 recommended)
- [Docker](https://www.docker.com/) & Docker Compose (for local database)
- Git

---

## Local Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local database via Docker**
   ```bash
   docker compose up -d
   ```
   *(This starts PostgreSQL on port 5432 and pgAdmin on port 5050)*

4. **Run the server in development mode**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3000` with hot-reloading enabled.

---

## Environment Variables
Create a `.env` file in the root of your project based on the `.env.example` file.

```env
PORT=3000
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

---

## Database Management

We use Prisma as our ORM. The schema is located in `prisma/schema.prisma`.

**Important Commands:**
- **Push schema changes to DB:** `npx prisma db push`
- **Generate Prisma Client:** `npx prisma generate` (Run this after pulling new changes)
- **Open Prisma Studio (DB Viewer):** `npx prisma studio`

*Note: As per Buildathon Phase 1 guidelines, the ER Diagram and Database Design must be finalized and submitted within the first 2 days.*

---

## API Documentation
*(To be updated as endpoints are developed)*

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/health`| GET    | Server status check | No |
| ...      | ...    | ...         | ... |

---

## CI/CD & Deployment
We have GitHub Actions set up in `.github/workflows/`:
- **`ci.yml`**: Runs on PRs and pushes to `dev`/`main`. Automates installation and builds to catch errors early.
- **`cd.yml`**: Runs on pushes to `main`. Handles automatic deployment to our production environment.

---

## Security Practices
*(Documented for final presentation and evaluation)*
- **Authentication**: (To be implemented - e.g., JWT)
- **Input Validation**: (To be implemented - e.g., Zod / express-validator)
- **Environment Secrets**: All sensitive keys are stored in `.env` and injected via CI/CD pipelines. They are never committed to the repository.

---

*This documentation is actively maintained by the backend team throughout the Buildathon.*
