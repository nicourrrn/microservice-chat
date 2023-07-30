from message_service.db import engine, models

models.Base.metadata.create_all(engine)
