<p align="center">
  <img src="frontend/public/logo.svg" width="120" alt="Quiz Builder logo" />
</p>

<h1 align="center">Quiz Builder</h1>

<p align="center">
  Full-Stack JS test assignment — build quizzes with <strong>BOOLEAN</strong>, <strong>INPUT</strong> and
  <strong>CHECKBOX</strong> questions. NestJS + PostgreSQL + Prisma API, Next.js (Pages Router) frontend.
</p>

---

## Requirements

- Node.js 18+
- Docker (for PostgreSQL)
- Beekeeper Studio or any other SQL client (optional, to inspect the database)

## Project structure

```
quiz-builder/
├── backend/     NestJS REST API (port 3001)
└── frontend/    Next.js Pages Router app (port 3000)
```

---

## 1. Set up the database

The API expects PostgreSQL with:

| Setting  | Value          |
| -------- | -------------- |
| Host     | `localhost`    |
| Port     | `5432`         |
| User     | `postgres`     |
| Password | `postgres`     |
| Database | `quiz_builder` |

These values are already configured in `backend/.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=quiz_builder
```

### Option A — quick container (current setup)

```bash
docker run -d \
  --name quiz-builder-pg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=quiz_builder \
  -p 5432:5432 \
  postgres:16-alpine
```

### Option B — project docker compose

```bash
cd backend
docker compose up -d   # starts quizBuilderDB on localhost:5433
```

> If you use this option, change `POSTGRES_PORT=5433` in `backend/.env`.
> If port 5433 is already taken by another container, stop it or change the
> mapping in `backend/docker-compose.yml` (for example `"5440:5432"`).

You can verify the connection in Beekeeper Studio using the credentials above.

---

## 2. Start the backend

```bash
cd backend
npm install

npx prisma generate   # generate the Prisma client
npx prisma db push    # create tables from prisma/schema.prisma
npx prisma db seed    # insert the sample quiz

npm run start:dev     # runs on http://localhost:3001
```

## 3. Start the frontend

```bash
cd frontend
npm install
npm run dev           # runs on http://localhost:3000
```

The frontend reads the API URL from `frontend/.env` (already configured):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Open **http://localhost:3000** in your browser.

---

## Create a sample quiz

Two ways:

1. **Seed script** (already done above):

   ```bash
   cd backend
   npx prisma db seed
   ```

   This creates a "Sample quiz" containing one question of each type.

2. **Through the UI** — open http://localhost:3000/create,
   enter a title, add questions, pick a type for each one and press **Save quiz**.

---

## API endpoints

| Method   | Endpoint          | Description                    |
| -------- | ----------------- | ------------------------------ |
| `POST`   | `/quizzes`        | Create a quiz with questions   |
| `GET`    | `/quizzes`        | List all quizzes               |
| `GET`    | `/quizzes/:id`    | Get one quiz with its questions|
| `DELETE` | `/quizzes/:id`    | Delete a quiz                  |

### Example payload for `POST /quizzes`

```jsonc
{
  "title": "My quiz",
  "questions": [
    { "text": "Is Kyiv the capital?", "type": "BOOLEAN", "correctAnswer": true },
    { "text": "Capital of France?",   "type": "INPUT",   "answer": "Paris" },
    {
      "text": "Pick even numbers",
      "type": "CHECKBOX",
      "options": [
        { "text": "2", "isCorrect": true },
        { "text": "3", "isCorrect": false }
      ]
    }
  ]
}
```
