FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY ./requirements.txt /app/requirements.txt

COPY ./static /app/static

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./app /app/app
#building the app
#docker build -t language-detection-app .
#running the app
#docker run -p 8000:80 language-detection-app