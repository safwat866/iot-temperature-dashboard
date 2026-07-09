import { useEffect, useState } from "react";
import { useMqtt } from "../utils/useMqtt";

const Status = () => {
  const { dht, status } = useMqtt();
  const [time, setTime] = useState();

  let state;

  if (status == "online") {
    state = <span className="text-green-500">Online</span>;
  } else if (status == "offline") {
    state = <span className="text-red-500">Offline</span>;
  } else {
    state = <span>{status}</span>;
  }

  function formatTime(timeStr) {
    // تقسيم النص
    let [hours, minutes] = timeStr.split(":");
    hours = parseInt(hours);

    // تحديد هل هو AM أم PM
    const ampm = hours >= 12 ? "pm" : "am";

    // تحويل نظام 24 ساعة لنظام 12 ساعة
    hours = hours % 12;
    hours = hours ? hours : 12; // الساعة 00 تصبح 12

    // دمج النتيجة النهائية
    return `${hours}:${minutes} ${ampm}`;
  }

  useEffect(() => {
    if (status == "online") {
      setTime("Now");
      return;
    }
    const timestamp = localStorage.getItem("timestamp");
    if (timestamp) {
      setTime(formatTime(timestamp));
    }
  }, [status]);

  // const currentTime = new Date();

  // if (lastUpdate - currentTime < 5000) {
  //   formatLastUpdate = "Now";
  // } else {
  //   formatLastUpdate = lastUpdate?.toLocaleString() || "...";
  // }

  return (
    <div className="mb-12">
      <div>Device: {state}</div>
      {time && <div>Last update: {time}</div>}
    </div>
  );
};

export default Status;
