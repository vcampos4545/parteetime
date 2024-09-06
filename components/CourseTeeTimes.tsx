import {
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface CourseeTeeTimesProps {
  index: number;
  teeTimes: CourseTeeTimes;
}

const courseImages = [
  "course1.jpg",
  "course2.jpg",
  "course3.jpg",
  "course4.jpg",
];

export default function CourseTeeTimes({
  index,
  teeTimes,
}: CourseeTeeTimesProps) {
  const dropDown = useDisclosure();

  return (
    <Flex direction="column">
      <Flex
        cursor="pointer"
        onClick={dropDown.onToggle}
        direction="row"
        h="150px"
        borderRadius="20px"
        border="0.5px solid #333"
        overflow="hidden"
        gap="10px"
      >
        <Image
          w="250px"
          objectFit="fill"
          src={`/images/${courseImages[index % 4]}`}
        />
        <Flex p="10px" direction="column">
          <Text>
            {teeTimes.courseName} ({teeTimes.distance})
          </Text>
          <Text>LOCATION | DISTANCE</Text>
        </Flex>
        <Spacer />
        <Flex direction="column" justify="flex-end" p="10px">
          <Button>View Tee Times</Button>
        </Flex>
      </Flex>
      {dropDown.isOpen && (
        <Flex flexWrap="wrap" w="100%" gap="5px" align="center">
          {teeTimes.teeTimes.map((teeTimes, index) => (
            <Flex key={index} direction="column" flexGrow={1}>
              <Text>{teeTimes.time}</Text>
              <Text>${teeTimes.price}</Text>
              <Button>Book</Button>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
