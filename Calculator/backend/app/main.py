from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.calc import evaluate as calc_evaluate
from app.graph import get_points as graph_get_points

app = FastAPI(title="공학용 계산기 API", version="0.1.0")

# 프론트엔드(React/Vite)에서 API 호출 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CalcRequest(BaseModel):
    expression: str = Field(..., min_length=1, max_length=500)
    angle_mode: str = Field(default="rad", pattern="^(rad|deg)$")


class CalcResponse(BaseModel):
    result: str


class GraphRequest(BaseModel):
    expression: str = Field(..., min_length=1, max_length=500)
    xMin: float = Field(..., ge=-1e10, le=1e10)
    xMax: float = Field(..., ge=-1e10, le=1e10)
    points: int = Field(default=200, ge=2, le=2000)
    angle_mode: str = Field(default="rad", pattern="^(rad|deg)$")


class GraphResponse(BaseModel):
    points: list[list[float | None]]


@app.get("/")
def root():
    """루트: API 안내"""
    return {"message": "공학용 계산기 API", "docs": "/docs", "health": "/api/health"}


@app.get("/api/health")
def health():
    """서버 상태 확인"""
    return {"status": "ok"}


@app.post("/api/calc", response_model=CalcResponse)
def calc(body: CalcRequest):
    """수학 표현식 계산. angle_mode: rad(기본) 또는 deg(도). 예: sin(90) + deg"""
    try:
        result = calc_evaluate(body.expression, use_degrees=(body.angle_mode == "deg"))
        return CalcResponse(result=result)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/graph", response_model=GraphResponse)
def graph(body: GraphRequest):
    """함수 f(x)를 x 구간에서 샘플링. angle_mode: rad(기본) 또는 deg."""
    if body.xMin >= body.xMax:
        raise HTTPException(status_code=400, detail="xMin은 xMax보다 작아야 합니다.")
    try:
        points = graph_get_points(
            body.expression,
            body.xMin,
            body.xMax,
            body.points,
            use_degrees=(body.angle_mode == "deg"),
        )
        return GraphResponse(points=points)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
