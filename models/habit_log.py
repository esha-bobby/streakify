from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean, UniqueConstraint
from database import Base


class HabitLog(Base):
    __tablename__ = "habit_logs"
    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))
    log_date = Column(DateTime, nullable=False)
    completed = Column(Boolean, default=True)

    __table_args__ = (UniqueConstraint('habit_id', 'log_date', name='_habit_date_uc'),)
