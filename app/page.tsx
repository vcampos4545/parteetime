// app/page.tsx

"use client";

import SearchForm from "@/components/SearchForm";
import TeeTime from "@/components/TeeTime";
import { TeeTimeContext } from "@/components/TeeTimeContext";
import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";

const Home: React.FC = () => {
  const ctx = useContext(TeeTimeContext);

  return (
    <Flex direction="column" w="100%" align="center">
      <Box maxW="600px" w="100%" pt="20px">
        <SearchForm />
        <Flex flexWrap="wrap" mt={8} align="center" gap="10px">
          {ctx.teeTimes.map((teeTime, index) => (
            <TeeTime key={index} teeTime={teeTime} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
