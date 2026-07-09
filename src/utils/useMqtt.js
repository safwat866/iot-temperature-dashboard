import { useEffect, useState, useRef } from "react";
import mqtt from "mqtt";

export const useMqtt = () => {
  const [dht, setDht] = useState([]);
  const [status, setStatus] = useState("waiting..");
  const [isLoading, setIsLoading] = useState(true);

  let counter = 0;

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

          const { temperature, humidity, timestamp } = JSON.parse(
            message.toString(),
          );

          setDht((prev) => {
            const next = [
              ...prev,
              {
                name: "read " + ++counter,
                temp: temperature,
                humidity: humidity,
              },
            ];
            return next.slice(-30);
          });

          localStorage.setItem("timestamp", timestamp);

          setIsLoading(false);

          break;

        case "ieee/device/status":
          const status = message.toString();
          setStatus(status);

          setIsLoading(false);
          break;
      }
    });

    return () => {
      client.end(); // cleanup on unmount
    };
  }, []);

  return { dht, status, isLoading };
};
