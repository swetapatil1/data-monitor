import paho.mqtt.client as mqtt
import time

host_ip = '172.17.0.3'
port = 1883
keepalive = 60


def on_connect(client, userdata, flags, rc):
    if rc==0:
        print("connected OK Returned code=",rc)
    else:
        print("Bad connection Returned code=",rc)


def on_message(client, userdata, message):
    print("{}:{}".format(str(message.topic), str(message.payload.decode("utf-8"))))


if __name__ == "__main__":
    client = mqtt.Client("Subscriber")
    try:
        client.on_connect = on_connect
        client.on_message = on_message
        client.connect(host_ip, port, keepalive)
        client.loop_start()

        client.subscribe("Patient1/#")
        client.subscribe("Patient2/#")


    except:
        print("An exception occurred")