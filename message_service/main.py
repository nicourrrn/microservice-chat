from fastapi import FastAPI, Header, WebSocket   
from sqlalchemy.orm  import Session
from sqlalchemy import select
import aiohttp
from typing import Annotated
from message_service.db import (engine, models as orm_models)
from message_service.seriallizer import models as ser_models
from message_service.cache import client

app = FastAPI()

@app.get("/list", response_model_exclude_none=True)
async def get_messages() -> list[ser_models.Message]:
    with Session(engine) as session: 
        sql_req = select(orm_models.Message) 
        return [ser_models.Message(id=i.id, text=i.text) 
            for i in session.scalars(sql_req)]

@app.post("/send")
async def post_message(message: ser_models.Message,
                       authorization: Annotated[str | None, Header()] ) -> int:
    msg = orm_models.Message(
        text=message.text           
    ) 
    # Useless space only for redis message broker demonstration
    if authorization is not None:
        await client.get_id_by_token(authorization) 

    async with aiohttp.ClientSession() as session:
        async with session.post("http://auth:3000/get_id",
                                data={"token": authorization}) as response: 
            print(f"User id is: {await response.json()}")

    with Session(engine) as session:
        session.add(msg)
        session.commit()
        return msg.id


clients = []

@app.websocket("/msg")
async def msg_publisher(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    print("New client!!!")
    while True:
        msg = await websocket.receive_text()
        for c in clients:
            if c is not websocket: 
                await c.send_text(msg) 
        orm_msg = orm_models.Message(text=msg)
        with Session(engine) as s:
            s.add(orm_msg)
            s.commit()


