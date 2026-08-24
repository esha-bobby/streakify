from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, timedelta
from fastapi import HTTPException
from models import Habit, HabitLog
from schemas.habit_log import HabitLogCreate


def get_streak_data(db: Session, habit_id: int):
    """Calculate current and longest streak for a habit"""
    logs = db.query(HabitLog).filter(
        HabitLog.habit_id == habit_id,
        HabitLog.completed == True
    ).order_by(HabitLog.log_date.desc()).all()

    if not logs:
        return {"current_streak": 0, "longest_streak": 0}

    # Calculate current streak
    current_streak = 0
    today = date.today()
    last_log_date = logs[0].log_date.date()

    if last_log_date == today or last_log_date == today - timedelta(days=1):
        current_streak = 1
        for i in range(len(logs) - 1):
            if (logs[i].log_date.date() - logs[i+1].log_date.date()).days == 1:
                current_streak += 1
            else:
                break

    # Calculate longest streak
    longest_streak = 0
    temp_streak = 1
    longest_streak = 1
    for i in range(len(logs) - 1):
        if (logs[i].log_date.date() - logs[i+1].log_date.date()).days == 1:
            temp_streak += 1
            longest_streak = max(longest_streak, temp_streak)
        else:
            temp_streak = 1

    return {"current_streak": current_streak, "longest_streak": longest_streak}


def create_habit_log(db: Session, habit_id: int, log_data: HabitLogCreate):
    """Create a habit log entry"""
    habit = db.query(Habit).filter(Habit.id == habit_id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    existing_log = db.query(HabitLog).filter(
        HabitLog.habit_id == habit_id,
        func.date(HabitLog.log_date) == log_data.log_date.date()
    ).first()

    if existing_log:
        raise HTTPException(status_code=400, detail="Habit already logged for this date")

    if log_data.log_date.date() > date.today():
        raise HTTPException(status_code=400, detail="Cannot log future dates")

    db_log = HabitLog(habit_id=habit_id, **log_data.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


def update_habit_log(db: Session, habit_id: int, log_date: date, completed: bool):
    """Update a habit log entry"""
    db_log = db.query(HabitLog).filter(
        HabitLog.habit_id == habit_id,
        func.date(HabitLog.log_date) == log_date
    ).first()

    if db_log:
        db_log.completed = completed
        db.commit()
        db.refresh(db_log)

    return db_log
