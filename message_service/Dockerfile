FROM python:latest 

ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 


WORKDIR /app
COPY . .

RUN pip install poetry
RUN poetry config virtualenvs.create false && poetry install 

CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0"]
