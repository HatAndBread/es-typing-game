import { useEffect } from "react";

const useTimer = ({
  started,
  time,
  setTime,
}: {
  started: boolean;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    const cb = () => setTime(time + 0.1);
    let timeout: any;
    if (started) {
      timeout = setTimeout(cb, 100);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [started, time, setTime]);
};

export default useTimer;
