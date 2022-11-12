#_sensors_emulator.py
import sys
sys.path.append('../../')
import config
import paho.mqtt.client as mqtt
import time
import csv

host_ip = '0.0.0.0'
port = 8883
keepalive = 60
print_message = "{}: {}"

def on_connect(client, userdata, flags, rc):
    if rc==0:
        print("connected OK Returned code=",rc)
    else:
        print("Bad connection Returned code=",rc)

def on_publish(client,userdata,result):
    print("data published \n")


def publish_value(client, topic, value):
    print(print_message.format(topic, value))
    result = client.publish(topic=topic, payload=value, qos=2)
    return result

def topic_name(id, parameter):
    return "Patient{0}/{1}".format(id, parameter)


if __name__ == "__main__":
    client = mqtt.Client(protocol=mqtt.MQTTv311)
    client.on_connect = on_connect
    client.on_publish=on_publish
    client.connect(host_ip,port,keepalive)
    client.loop_start()


    while True:
        with open('/home/patient_data.csv') as csvfile:
            reader = csv.reader(csvfile)
            i=0
            for row in reader:
                if(i==0):
                    i+=1
                    continue
                patient_id=int(row[0])
                temp_value = float(row[1])
                heart_rate_value = float(row[2])
                bp_syst_val=float(row[3])
                bp_diast_val=float(row[4])
                spo2_val=float(row[5])
                publish_value(client, topic_name(patient_id, "body temperature"), temp_value)
                publish_value(client,topic_name(patient_id,"heart rate"), heart_rate_value)
                publish_value(client, topic_name(patient_id, "Systolic Blood pressure"), bp_syst_val)
                publish_value(client, topic_name(patient_id, "Diastolic Blood Pressure"),bp_diast_val)
                publish_value(client, topic_name(patient_id, "Spo2"), spo2_val)
                time.sleep(1)
                i+=1

    client.disconnect()
    client.loop_stop()
