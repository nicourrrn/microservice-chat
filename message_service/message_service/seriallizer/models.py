from pydantic import BaseModel

class Message(BaseModel):
    id: int = -1 
    text: str
    
    sender_id: int | None = None

class User(BaseModel):
    id: int 
    name: str

    messages: list[Message] | None = None
