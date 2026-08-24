from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserCreate(BaseModel):
    """Schema for creating a new user"""
    name: str
    email: EmailStr


class UserResponse(BaseModel):
    """Schema for user response"""
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True
