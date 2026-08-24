<img width="1435" height="686" alt="Screenshot 2026-08-24 at 10 46 33 PM" src="https://github.com/user-attachments/assets/0cd06fd4-0ab9-4b9e-8ee4-ab1912cd0d58" />
# Streakify

Streakify is a simple habit tracker built around one idea, small steps become meaningful progress when you keep showing up. It gives people a focused space to create routines, log daily wins, and see their current streaks and consistency at a glance, without turning self-improvement into a noisy competition.

## What It Does

- Creates and manages personal habits
- Sets a weekly target for each habit
- Logs completed habits for the current day
- Calculates current and longest streaks
- Shows a lightweight dashboard with daily progress
- Supports multiple users on the same browser

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** PostgreSQL
- **Deployment:** Vercel for the frontend and Render for the API and database
- **Frontend:** React, Vite, JavaScript, CSS

The frontend keeps API communication in a small service layer and uses environment variables for the backend URL. The FastAPI backend is organized into separate routes, schemas, models, and CRUD modules, keeping the application easy to extend while staying intentionally small.

## Run Locally

Start the backend:

```bash
python3 -m uvicorn main:app --reload --port 8000
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://127.0.0.1:5173` and the API documentation is available at `http://127.0.0.1:8000/docs`.

## Project Structure

```text
frontend/   React user interface
routes/     FastAPI endpoints
schemas/    Request and response validation
models/     SQLAlchemy database models
crud/       Database operations
```

Built as an MVP to explore thoughtful product design, practical API integration, and clean full-stack structure.
