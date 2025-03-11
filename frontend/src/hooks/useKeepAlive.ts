import { useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";

export function useKeepAlive(
  isActive: boolean,
  interval = 1000 * 60 * 10,
  maxRetries = 5,
  retryDelay = 50000
) {
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setRetryCount(0);
      return;
    }

    let isCancelled = false;

    const sendKeepAlive = async () => {
      if (!isActive || isCancelled) return;

      try {
        await axiosInstance.get("/");
        console.log("✅ Keep-Alive: response received.");
        setRetryCount(0);
      } catch {
        console.warn(
          `⚠️ Backend is unavailable. Retrying in ${retryDelay / 1000} seconds`
        );

        if (retryCount < maxRetries) {
          setTimeout(() => {
            if (!isCancelled) {
              setRetryCount((prev) => prev + 1);
              sendKeepAlive();
            }
          }, retryDelay);
        } else {
          console.error("❌ Backend is unavailable.");
        }
      }
    };

    sendKeepAlive();

    const timer = setInterval(sendKeepAlive, interval);

    return () => {
      isCancelled = true;
      clearInterval(timer);
    };
  }, [isActive, interval, retryCount]);

  return retryCount;
}
