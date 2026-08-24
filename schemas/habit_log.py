from pydantic import BaseModel
from datetime import datetime


class HabitLogCreate(BaseModel):
    """Schema for creating a habit log entry"""
    log_date: datetime
    completed: bool = True


class HabitLogResponse(BaseModel):
    """Schema for habit log response"""
    id: int
    habit_id: int
    log_date: datetime
    completed: bool

    class Config:
        from_attributes = True
