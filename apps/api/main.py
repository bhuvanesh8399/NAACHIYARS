from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from passlib.context import CryptContext

from apps.api.routers import auth, admin
from apps.api.models import Base, engine, SessionLocal, User

load_dotenv(".env")

app = FastAPI(title="NAACHIYARS Web API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(admin.router)

# Create database tables
Base.metadata.create_all(bind=engine)

# Seed default users if none exist
try:
    db = SessionLocal()
    admin_user = db.query(User).filter(User.role == "admin").first()
    if not admin_user:
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        default_admin = User(
            username="admin.user",
            hashed_password=pwd_context.hash("Admin.secure1"),
            role="admin",
            must_change_password=False
        )
        default_supervisor = User(
            username="supervisor.user",
            hashed_password=pwd_context.hash("Supervisor@123"),
            role="supervisor",
            must_change_password=True
        )
        default_user = User(
            username="normal.user",
            hashed_password=pwd_context.hash("User@123"),
            role="user",
            must_change_password=False
        )
        db.add(default_admin)
        db.add(default_supervisor)
        db.add(default_user)
        db.commit()
        db.refresh(default_admin)
        db.refresh(default_supervisor)
        db.refresh(default_user)
finally:
    db.close()
