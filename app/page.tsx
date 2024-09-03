// app/page.tsx

"use client";

import SearchForm from "@/components/SearchForm";
import CourseTeeTimes from "@/components/CourseTeeTimes";
import { TeeTimeContext } from "@/components/TeeTimeContext";
import { Accordion, Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";

const Home: React.FC = () => {
  const ctx = useContext(TeeTimeContext);

  return (
    <Flex direction="column" w="100%" align="center">
      <Box maxW="800px" w="100%" pt="20px" px="20px">
        <SearchForm />
        <Flex flexWrap="wrap" mt={8} align="center" gap="10px">
          <Accordion allowToggle w="100%">
            {ctx.courseTeeTimes.map((courseTeeTimes, index) => (
              <CourseTeeTimes key={index} teeTimes={courseTeeTimes} />
            ))}
          </Accordion>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
