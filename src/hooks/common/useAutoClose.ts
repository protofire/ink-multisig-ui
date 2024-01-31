import { useEffect, useState } from "react";

interface Props {
  initialTime?: number;
  handleClose: () => void;
  autoRun?: boolean;
}

interface UseAutoCloseReturn {
  countdown: number;
  startAutoClose: () => void;
}

export function useAutoClose({
  initialTime = 5,
  handleClose,
  autoRun = true,
}: Props): UseAutoCloseReturn {
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      handleClose();
    }

    return () => clearTimeout(timer);
  }, [countdown, handleClose]);

  useEffect(() => {
    if (autoRun) {
      setCountdown(initialTime);
    }
  }, [autoRun, initialTime]);

  return { countdown, startAutoClose: () => setCountdown(initialTime) };
}

export default useAutoClose;
