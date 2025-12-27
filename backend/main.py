from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel # 新增：用于接收前端传来的JSON数据
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 新增：定义登录的数据结构 ---
class LoginSchema(BaseModel):
    username: str
    password: str

# --- 新增：登录接口 ---
@app.post("/api/login")
def login(data: LoginSchema):
    # 这里我们硬编码账号密码，演示足够了
    if data.username == "admin" and data.password == "123456":
        return {
            "code": 200, 
            "message": "登录成功", 
            "token": "fake-jwt-token-zhangwu-2025",
            "user": "管理员"
        }
    else:
        # 如果密码不对，抛出错误
        raise HTTPException(status_code=400, detail="账号或密码错误")

# ... (后面保留原本的 /api/home/stats 等接口，不要删) ...
@app.get("/api/home/stats")
def get_home_stats():
    return {
        "forest_coverage": 34.5,
        "sandy_land_fixed": 200,
        "industry_output": 56.8,
        "tourist_visits": 12000
    }

@app.get("/api/industry/compare")
def get_industry_compare():
    return {
        "goji": [
            {"label": "土壤微量元素", "zhangwu": 92, "ningxia": 85}, 
            {"label": "平均日照时长", "zhangwu": 95, "ningxia": 88},
            {"label": "果实饱满度", "zhangwu": 90, "ningxia": 85}
        ],
        "silica": {"reserves": 800000, "purity": 99.8}
    }

@app.get("/api/tourism/route")
def get_route():
    return [
        {"title": "集结", "desc": "治沙学校"},
        {"title": "第一站", "desc": "董福财陈列馆"},
        {"title": "第二站", "desc": "万亩松林"},
        {"title": "体验", "desc": "有机农产采摘"},
        {"title": "终点", "desc": "硅砂产业园"}
    ]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)