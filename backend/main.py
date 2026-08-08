from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import base64
import requests
import json
import os
import io
from PIL import Image

# ============================================================
# MIMO API 配置（密钥从环境变量 / .env 文件读取，切勿硬编码提交）
# ============================================================
def _load_env_file(path: str) -> None:
    """加载同目录 .env 文件中的环境变量（仅当环境变量未设置时）"""
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, value = line.partition("=")
                key, value = key.strip(), value.strip().strip('"').strip("'")
                if key and key not in os.environ:
                    os.environ[key] = value
    except FileNotFoundError:
        pass

_load_env_file(os.path.join(os.path.dirname(__file__), ".env"))

MIMO_API_KEY = os.environ.get("MIMO_API_KEY", "")
MIMO_API_URL = os.environ.get("MIMO_API_URL", "https://api.xiaomimimo.com/v1/chat/completions")
MIMO_MODEL = os.environ.get("MIMO_MODEL", "mimo-v2.5")  # 支持文本+图片+音频的多模态模型

if not MIMO_API_KEY:
    print("⚠️ 警告: 未检测到 MIMO_API_KEY，请在 backend/.env 中配置（参考 .env.example）")

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

# ============================================================
# MIMO 多模态 API 代理 — 地瓜品质智能评级
# ============================================================
@app.post("/api/mimo/grade")
async def mimo_grade(image: UploadFile = File(...), prompt: str = Form(...)):
    """
    接收前端上传的地瓜图片 + 预设提示词，
    转发到 MIMO 多模态模型进行品质评级。
    """
    try:
        # 1. 读取图片并压缩（大图会消耗更多 token，压缩到最长边 1024px）
        image_bytes = await image.read()
        mime_type = image.content_type or "image/jpeg"

        try:
            img = Image.open(io.BytesIO(image_bytes))
            # 统一转为 RGB（去除透明通道，兼容 JPEG 压缩）
            if img.mode in ("RGBA", "P", "LA"):
                img = img.convert("RGB")
            max_side = 1024
            if max(img.size) > max_side:
                ratio = max_side / max(img.size)
                img = img.resize((int(img.width * ratio), int(img.height * ratio)))
            buf = io.BytesIO()
            img.save(buf, format="JPEG", quality=85)
            image_bytes = buf.getvalue()
            mime_type = "image/jpeg"
        except Exception:
            # 图片解析失败则按原样上传
            pass

        # 2. 转为 base64
        image_b64 = base64.b64encode(image_bytes).decode("utf-8")

        # 3. 构建请求体（兼容 MiMo OpenAI 格式，含图片）
        # 注意：mimo-v2.5 默认启用思维链模式，该模式下不支持自定义 temperature
        payload = {
            "model": MIMO_MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime_type};base64,{image_b64}"
                            }
                        },
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ],
            "max_completion_tokens": 2048
        }

        # 4. 调用 MIMO API
        resp = requests.post(
            MIMO_API_URL,
            json=payload,
            headers={
                "api-key": MIMO_API_KEY,
                "Content-Type": "application/json"
            },
            timeout=120
        )

        if not resp.ok:
            raise HTTPException(
                status_code=resp.status_code,
                detail=f"MIMO API 返回错误 ({resp.status_code}): {resp.text[:500]}"
            )

        data = resp.json()

        # 5. 提取模型回复文本
        content = (
            data.get("choices", [{}])[0]
                .get("message", {})
                .get("content", "")
        )

        return {
            "code": 200,
            "content": content,
            "model": MIMO_MODEL,
            "usage": data.get("usage", {})
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"评级服务异常: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)