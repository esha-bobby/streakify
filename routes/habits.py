from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from database import get_db
from schemas.habit import HabitCreate, HabitResponse
from models import HabitLog
import crud


router = APIRouter(
    prefix="/habits",
    tags=["habits"],
    responses={404: {"description": "Not found"}}
)


@router.post("", response_model=HabitResponse)
def create_habit(habit: HabitCreate, db: Session = Depends(get_db)):
    """Create a new habit for a user"""
    return crud.create_habit(db=db, habit=habit)


@router.get("/{habit_id}", response_model=HabitResponse)
def read_habit(habit_id: int, db: Session = Depends(get_db)):
    """Get a habit by ID"""
    db_habit = crud.get_habit(db, habit_id=habit_id)
    if db_habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return db_habit


@router.get("/{habit_id}/streak")
def get_streak(habit_id: int, db: Session = Depends(get_db)):
    """Get streak data for a habit (current and longest streak)"""
    return crud.get_streak_data(db=db, habit_id=habit_id)


@router.delete("/{habit_id}")
def delete_habit(habit_id: int, db: Session = Depends(get_db)):
    """Delete a habit by ID"""
    return crud.delete_habit(db, habit_id=habit_id)
