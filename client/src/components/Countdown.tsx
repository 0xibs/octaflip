import useCountdown from "../hooks/useCountdown";
import { formatTime } from "../utils/helpers";

export const CountdownTimer = ({
  startTime,
  duration,
}: {
  startTime: any;
  duration: any;
}) => {
  const timeLeft = useCountdown(startTime, duration);

  return (
    <div className="w-auto text-5xl text-stone-100">{formatTime(timeLeft)}</div>
  );
};
