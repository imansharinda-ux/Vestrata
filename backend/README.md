# Vestrata Backend

FastAPI + PostgreSQL, built as a modular monolith.

## Run with Docker

```
docker compose up --build
```

API: http://localhost:8000/api/health
Docs: http://localhost:8000/docs

## Run without Docker

```
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

## Tests

```
pytest
```

## Migrations

```
alembic revision --autogenerate -m "message"
alembic upgrade head
```
