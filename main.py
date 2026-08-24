from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from database import engine, get_db
import models
import crud
from routes import users_router, habits_router, logs_router


models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Streakify MVP",
    description="A habit tracking application to help users build streaks and track their progress",
    version="1.0.0"
)

# Include routers
app.include_router(users_router)
app.include_router(habits_router)
app.include_router(logs_router)


@app.get("/users/{user_id}/dashboard")
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    """Get user dashboard with all habits and progress"""
    habits = crud.get_user_habits(db, user_id=user_id)
    total_habits = len(habits)

    if total_habits == 0:
        return {"totalHabits": 0, "activeHabits": 0, "completedToday": 0, "consistencyScore": 0}

    today = date.today()
    completed_today_count = 0
    results = []

    for h in habits:
        streak = crud.get_streak_data(db, h.id)

        logged_today = db.query(models.HabitLog).filter(
            models.HabitLog.habit_id == h.id,
            func.date(models.HabitLog.log_date) == today,
            models.HabitLog.completed == True
        ).first()

        if logged_today:
            completed_today_count += 1

        results.append({"habitName": h.name, **streak})

    score = int((completed_today_count / total_habits) * 100)

    return {
        "totalHabits": total_habits,
        "activeHabits": total_habits,
        "completedToday": completed_today_count,
        "currentStreaks": results,
        "consistencyScore": score
    }


@app.get("/users/{user_id}/habits")
def read_user_habits(user_id: int, db: Session = Depends(get_db)):
    """Get all habits for a user"""
    return crud.get_user_habits(db, user_id=user_id)

