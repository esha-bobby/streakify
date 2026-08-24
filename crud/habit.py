from sqlalchemy.orm import Session
from models import Habit
from schemas.habit import HabitCreate

def create_habit(db: Session, habit: HabitCreate):
    """Create a new habit for a user"""
    db_habit = Habit(
        name=habit.name,
        target_days_per_week=habit.target_days_per_week,
        user_id=habit.user_id
    )
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

def get_habit(db: Session, habit_id: int):
    """Get a habit by ID"""
    return db.query(Habit).filter(Habit.id == habit_id).first()


def get_user_habits(db: Session, user_id: int):
    """Get all habits for a user"""
    return db.query(Habit).filter(Habit.user_id == user_id).all()


def delete_habit(db: Session, habit_id: int):
    """Delete a habit by ID"""
    db_habit = db.query(Habit).filter(Habit.id == habit_id).first()
    if db_habit:
        db.delete(db_habit)
        db.commit()
    return db_habit
