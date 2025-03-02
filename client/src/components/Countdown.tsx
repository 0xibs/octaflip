import useCountdown from "../hooks/useCountdown";
import { formatTime } from "../utils/helpers";

export const CountdownTimer = ({
  startTime,
  duration,
  playersInGame,
}: {
  startTime: any;
  duration: any;
  playersInGame: number;
}) => {
  const timeLeft = useCountdown(startTime, duration);

  return (
    <div className="flex flex-col justify-center">
      <div className="w-auto text-5xl text-stone-100">
        {formatTime(timeLeft)}
      </div>
      {/* {timeLeft < 1 && playersInGame > 1 && (
        <div className="text-red-500">Game has ended</div>
      )} */}
    </div>
  );
};
