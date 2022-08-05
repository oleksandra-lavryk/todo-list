import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  return <p>You are {time} seconds on this page</p>;
}
