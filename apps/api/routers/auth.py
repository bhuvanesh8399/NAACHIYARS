from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt
from passlib.context import CryptContext

from apps.api.models import User
from apps.api.schemas import LoginRequest, LoginResponse, ChangePasswordRequest, UserOut
from apps.api.deps import get_db, get_current_user, get_current_active_user, SECRET_KEY, ALGORITHM, oauth2_scheme

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ACCESS_TOKEN_EXPIRE_MINUTES = int(__import__('os').getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 15))


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/login", response_model=LoginResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == credentials.username).first()
    if not user or not pwd_context.verify(credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    access_token = create_access_token({"sub": str(user.id)})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "must_change_password": user.must_change_password
    }


@router.post("/refresh", response_model=LoginResponse)
def refresh_token(current_user: User = Depends(get_current_user)):
    access_token = create_access_token({"sub": str(current_user.id)})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": current_user.role,
        "must_change_password": current_user.must_change_password
    }


@router.post("/logout", status_code=204)
def logout(current_user: User = Depends(get_current_user)):
    return None


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.post("/change-password")
def change_password(
    request: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_password = request.new_password
    if len(new_password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password too long (bcrypt max 72 bytes). Use <= 72 bytes."
        )
    if len(new_password) < 8 or \
       not any(c.islower() for c in new_password) or \
       not any(c.isupper() for c in new_password) or \
       not any(c.isdigit() for c in new_password) or \
       not any(not c.isalnum() for c in new_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
        )
    current_user.hashed_password = pwd_context.hash(new_password)
    current_user.must_change_password = False
    db.add(current_user)
    db.commit()
    return {"detail": "Password changed successfully"}
