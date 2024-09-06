// app/page.tsx

"use client";

import { TeeTimeContext } from "@/components/TeeTimeContext";
import { useContext } from "react";

const Home: React.FC = () => {
  const ctx = useContext(TeeTimeContext);

  return <div>Index Route</div>;
};

export default Home;
