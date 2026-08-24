from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from database import get_db
from schemas.habit_log import HabitLogCreate, HabitLogResponse
from models import HabitLog
import crud


router = APIRouter(
    prefix="/habits",
    tags=["logs"],
    responses={404: {"description": "Not found"}}
)


@router.post("/{habit_id}/logs", response_model=HabitLogResponse)
def log_habit(habit_id: int, log: HabitLogCreate, db: Session = Depends(get_db)):
    """Create a habit log entry for a specific habit"""
    return crud.create_habit_log(db=db, habit_id=habit_id, log_data=log)


@router.put("/{habit_id}/logs/{log_date}")
def update_log(habit_id: int, log_date: date, completed: bool, db: Session = Depends(get_db)):
    """Update a habit log entry"""
    db_log = crud.update_habit_log(db, habit_id=habit_id, log_date=log_date, completed=completed)
    if not db_log:
        raise HTTPException(status_code=404, detail="Log not found")
    return db_log
