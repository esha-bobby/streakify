# Streakify Project Summary

## Overview

Streakify is a calm habit-tracking application that helps users turn small daily actions into consistent routines. Users can create habits, choose a weekly target, log daily progress, and view current streaks and consistency from a simple dashboard.

## User Workflow

1. Enter a name and email address.
2. Create habits with a name and target days per week.
3. View habits on the dashboard.
4. Log habits as completed for the current day.
5. See updated streaks, daily completion, and consistency.
6. Switch between multiple users in the same browser.
7. Return later with the same email to reload existing habits from PostgreSQL.
8. Delete habits when they are no longer needed.

## Metrics

### Total Habits

The number of habits belonging to the current user.

```text
totalHabits = number of user habits
```

### Active Habits

Currently equal to the total number of habits. This metric leaves room for future archived or inactive habits.

```text
activeHabits = totalHabits
```

### Completed Today

The number of habits with a completed log dated today.

```text
completedToday = completed habits logged today
```

### Consistency Score

The percentage of the user's habits completed today.

```text
consistencyScore = (completedToday / totalHabits) * 100
```

### Progress Percentage

The frontend displays the same daily completion ratio as a circular progress indicator.

```text
progress = round((completedToday / totalHabits) * 100)
```

### Target Days Per Week

Each habit has a target frequency from 1 to 7 days per week. This communicates the intended routine frequency.

### Current Streak

The number of consecutive completed calendar days connected to today or yesterday. The streak resets when the latest completed day is older than yesterday.

### Longest Streak

The highest number of consecutive completed days recorded for a habit.

## API Workflow

The React frontend uses a centralized API service to communicate with FastAPI.

### User endpoints

```text
POST   /users
GET    /users/{user_id}
DELETE /users/{user_id}
```

### Habit endpoints

```text
POST   /habits
GET    /habits/{habit_id}
GET    /users/{user_id}/habits
DELETE /habits/{habit_id}
```

### Progress endpoints

```text
GET  /users/{user_id}/dashboard
GET  /habits/{habit_id}/streak
POST /habits/{habit_id}/logs
PUT  /habits/{habit_id}/logs/{log_date}
```

## Tech Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Python, FastAPI, SQLAlchemy
- **Database:** PostgreSQL
- **Validation:** Pydantic
- **Frontend hosting:** Vercel
- **Backend hosting:** Render

## Architecture

```text
frontend/src/       React interface and reusable components
frontend/src/api.js API service layer
routes/             FastAPI route definitions
schemas/            Request and response validation
models/             SQLAlchemy database models
crud/               Database operations
database.py         Database connection setup
```

The application separates UI components, API communication, request validation, database models, and persistence logic. This keeps the MVP small while making it straightforward to extend.

## Portfolio Description

> Built and deployed Streakify, a full-stack habit-tracking application that helps users build consistent routines through daily logging and streak-based progress tracking. Developed a React/Vite frontend with responsive dashboard interactions and a FastAPI/PostgreSQL backend organized into modular routes, schemas, database models, and CRUD services. Implemented habit creation, daily completion logging, current and longest streak calculations, consistency scoring, multi-user switching, and persistent cloud data storage.

## Current Scope

Streakify currently focuses on daily completion and streak metrics. It does not include authentication passwords, notifications, social features, calendar history, weekly charts, or gamification.
