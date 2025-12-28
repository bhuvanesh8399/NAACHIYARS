from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    must_change_password: bool


class CreateSupervisorRequest(BaseModel):
    username: str
    password: str


class ChangePasswordRequest(BaseModel):
    new_password: str


class UserOut(BaseModel):
    id: int
    username: str
    role: str
    must_change_password: bool

    model_config = {"from_attributes": True}
