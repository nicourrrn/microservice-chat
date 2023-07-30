from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship 
from sqlalchemy import String, ForeignKey

class Base(DeclarativeBase):
    ...

class User(Base):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(32))

    messages: Mapped[list['Message']] = relationship(back_populates='user',
                                                     cascade='all, delete-orphan')

    def __repl__(self) -> str:
        return f"User({self.name})"

class Message(Base):
    __tablename__ = 'messages'

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(String(128))
    sender_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"))

    user: Mapped[User | None] = relationship(back_populates='messages')

    def __repl__(self) -> str:
        return f"Message({self.text})"
