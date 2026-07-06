import { useEffect, useState, useRef } from "react";
import mqtt from "mqtt";

export const useMqtt = () => {
  const [dht, setDht] = useState({});
  const [status, setStatus] = useState("waiting..");

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      console.log("connected!");

      client.subscribe(["ieee/test", "ieee/device/status"], (err) => {
        if (!err) console.log("Subscribed");
      });
    });

    client.on("message", (topic, message) => {
      switch (topic) {
        case "ieee/test":
          console.log("Message:", message.toString());

          const { temperature, humidity, timestamp } = JSON.parse(message.toString());

          setDht({
            temp: temperature,
            humidity: humidity,
          });

          localStorage.setItem("timestamp", timestamp);

          break;

        case "ieee/device/status":
          const status  = message.toString()
          setStatus(status);

          break;
      }
    });

    return () => {
      client.end(); // cleanup on unmount
    };
  }, []);

  return {dht, status};
};
