from sqlalchemy import create_engine
from .models import Base
import os

# engine = create_engine("sqlite:///db.sqlite", echo=True)
username = os.getenv('db_username')
password = os.getenv('db_password')
db_name = os.getenv('db_name')
engine = create_engine(
        f"postgresql+psycopg://{username}:{password}@db:5432/{db_name}",
        echo=True)


Base.metadata.create_all(engine)
