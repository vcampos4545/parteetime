import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";

interface CourseeTeeTimesProps {
  teeTimes: CourseTeeTimes;
}

export default function CourseTeeTimes({ teeTimes }: CourseeTeeTimesProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton w="100%">
          <Box flex="1" textAlign="left">
            {teeTimes.courseName} ({teeTimes.distance})
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex flexWrap="wrap" w="100%" gap="5px" align="center">
          {teeTimes.teeTimes.map((teeTimes, index) => (
            <Flex key={index} direction="column" w="32%">
              <Text>{teeTimes.time}</Text>
              <Text>${teeTimes.price}</Text>
              <Button>Book</Button>
            </Flex>
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
