FROM --platform=linux/amd64 python:3.8-slim-buster

WORKDIR /app

RUN pip3 install paho-mqtt config

COPY . .

EXPOSE 8081

CMD python3 Health_data_pub.py

EXPOSE 8080
