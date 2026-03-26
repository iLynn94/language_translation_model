from fastapi import FastAPI
from pydantic import BaseModel
from app.model.model import predict_pipeline
from app.model.model import __version__ as model_version
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")


class TextIn(BaseModel):
    text: str


class PredictionOut(BaseModel):
    language: str


@app.get("/")
def home():
    return FileResponse('static/index.html')

@app.get("/hello")
def hello():
    return {"message": "It works!"}


@app.post("/predict", response_model=PredictionOut)
def predict(payload: TextIn):
    language = predict_pipeline(payload.text)
    return {"language": language}

# docker build -t language-translation-model .

# docker run -p 8000:80 language-translation-model