import { useState, useEffect } from "react";

const useCountdown = (startTime, duration) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!startTime || !duration) return;

    const endTime = startTime + duration;
    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000); // Get current time in UTC seconds
      const remaining = Math.max(endTime - now, 0);
      setTimeLeft(remaining);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  return timeLeft; // Returns seconds left
};

export default useCountdown;
