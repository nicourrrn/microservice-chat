from fastapi import FastAPI, Request
from sqlalchemy.orm  import Session
from sqlalchemy import select

from message_service.db import (engine, models as orm_models)
from message_service.seriallizer import models as ser_models

app = FastAPI()

@app.get("/messages", response_model_exclude_none=True)
async def get_messages() -> list[ser_models.Message]:
    with Session(engine) as session: 
        sql_req = select(orm_models.Message) 
        return [ser_models.Message(id=i.id, text=i.text) 
            for i in session.scalars(sql_req)]

@app.post("/messages")
async def post_message(message: ser_models.Message) -> int:
    msg = orm_models.Message(
        text=message.text           
    ) 
    with Session(engine) as session:
        session.add(msg)
        session.commit()
        return msg.id
