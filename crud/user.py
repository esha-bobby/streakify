from sqlalchemy.orm import Session
from models import User
from schemas.user import UserCreate


def create_user(db: Session, user: UserCreate):
    """Create a new user in the database"""
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, user_id: int):
    """Get a user by ID"""
    return db.query(User).filter(User.id == user_id).first()


def delete_user(db: Session, user_id: int):
    """Delete a user by ID"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user
