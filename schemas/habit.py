from pydantic import BaseModel
from datetime import datetime


class HabitCreate(BaseModel):
    """Schema for creating a new habit"""
    name: str
    target_days_per_week: int
    user_id: int


class HabitResponse(BaseModel):
    """Schema for habit response"""
    id: int
    name: str
    target_days_per_week: int
    user_id: int

    class Config:
        from_attributes = True
