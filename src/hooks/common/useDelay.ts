import { useEffect, useState } from "react";

export function useDelay(delay: number) {
  const [isDelayFinished, setIsDelayFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayFinished(true);
    }, delay);

    // Clean timer if component is unmounted
    return () => clearTimeout(timer);
  }, [delay]);

  return isDelayFinished;
}
