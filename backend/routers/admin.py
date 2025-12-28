from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from backend.models import User
from backend.schemas import CreateSupervisorRequest, UserOut
from backend.deps import get_db, get_current_admin

router = APIRouter(prefix="/admin", tags=["Administration"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/supervisors", response_model=UserOut)
def create_supervisor(
    request: CreateSupervisorRequest,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):
    username = request.username
    password = request.password

    if "." not in username or username.startswith(".") or username.endswith("."):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username must contain a dot (.) and cannot start or end with a dot"
        )

    if len(password) < 8 or \
       not any(c.islower() for c in password) or \
       not any(c.isupper() for c in password) or \
       not any(c.isdigit() for c in password) or \
       not any(not c.isalnum() for c in password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
        )

    existing = db.query(User).filter(User.username == username).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")

    new_user = User(
        username=username,
        hashed_password=pwd_context.hash(password),
        role="supervisor",
        must_change_password=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
