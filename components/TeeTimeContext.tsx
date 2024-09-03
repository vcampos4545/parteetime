"use client";
import React, { createContext, useState } from "react";

interface TeeTimeContext {
  courseTeeTimes: CourseTeeTimes[];
  setCourseTeeTimes: React.Dispatch<React.SetStateAction<CourseTeeTimes[]>>;
}

const TeeTimeContext = createContext<TeeTimeContext>({
  courseTeeTimes: [],
  setCourseTeeTimes: () => {},
});

const TeeTimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [courseTeeTimes, setCourseTeeTimes] = useState<CourseTeeTimes[]>([]);

  return (
    <TeeTimeContext.Provider value={{ courseTeeTimes, setCourseTeeTimes }}>
      {children}
    </TeeTimeContext.Provider>
  );
};

export { TeeTimeContext, TeeTimeProvider };
