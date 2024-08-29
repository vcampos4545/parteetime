"use client";
import React, { createContext, useState } from "react";

interface TeeTime {
  // Define the properties of a tee time object
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  // ... other properties
}

interface TeeTimeContext {
  teeTimes: TeeItUpTeeTime[];
  setTeeTimes: React.Dispatch<React.SetStateAction<TeeItUpTeeTime[]>>;
}

const TeeTimeContext = createContext<TeeTimeContext>({
  teeTimes: [],
  setTeeTimes: () => {},
});

const TeeTimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [teeTimes, setTeeTimes] = useState<TeeItUpTeeTime[]>([]);

  return (
    <TeeTimeContext.Provider value={{ teeTimes, setTeeTimes }}>
      {children}
    </TeeTimeContext.Provider>
  );
};

export { TeeTimeContext, TeeTimeProvider };
