import { useState } from "react";

const useCounter = ({ initialValue = 0 }: { initialValue?: number }) => {
  const [counter, setCounter] = useState<number>(initialValue);
  const increase = () => setCounter(counter + 1);
  const decrease = () => setCounter(counter - 1);
  return {
    decrease,
    counter,
    increase,
  };
};

export default useCounter;
