"use client";
import { TeeTimeContext } from "@/components/TeeTimeContext";
import {
  Box,
  Button,
  Flex,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import CourseTeeTimes from "./CourseTeeTimes";

export default function SearchForm() {
  const [zipCode, setZipCode] = useState("");
  //initialize date as today
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const ctx = useContext(TeeTimeContext);

  useEffect(() => {
    searchTeeTimes();
  }, [date]);

  const searchTeeTimes = async () => {
    setIsLoading(true);
    if (!date) {
      setErrorMessage("Please select a date.");
      return;
    }
    const resp = await fetch(
      "/api/teetimes?" +
        new URLSearchParams({
          date,
          location: zipCode,
        })
    );
    const data = await resp.json();
    ctx.setCourseTeeTimes(data as CourseTeeTimes[]);
    setIsLoading(false);
  };

  return (
    <Flex direction="column" w="100%" align="center" pb="50px">
      <Box maxW="1100px" w="100%" pt="20px" px="20px">
        <Flex direction="column" gap="4">
          <Flex direction="row">
            <Flex
              direction="row"
              border="0.5px solid #333"
              h="55px"
              rounded="10px"
              overflow="hidden"
            >
              <Input
                h="100%"
                w="fit-content"
                border="none"
                borderRadius={0}
                type="date"
                id="date"
                name="date"
                value={date || ""}
                onChange={(date) => setDate(date.target.value)}
              />
              <Input
                h="100%"
                borderRadius={0}
                w="400px"
                border="none"
                borderLeft="0.5px solid #333"
                borderRight="0.5px solid #333"
                placeholder="Enter course, city, or zip code"
                name="zipCode"
                value={zipCode}
                onChange={(zipCode) => setZipCode(zipCode.target.value)}
              />
              <Button
                h="100%"
                minW="100px"
                border="none"
                color="white"
                borderRadius={0}
                onClick={searchTeeTimes}
                bg="#1AAF4B"
              >
                Search
              </Button>
            </Flex>
            <Spacer />
            <Button
              h="55px"
              bg="orange"
              color="white"
              px="20px"
              borderRadius="10px"
            >
              <Text fontWeight={250}>Hot Deals near me</Text>
            </Button>
          </Flex>
          <Flex direction="row" gap="40px">
            {/* Filters */}
            <Filters date={date} setDate={setDate} />

            <Flex direction="column" flexGrow={1} gap="20px">
              <Flex direction="row" align="center">
                <Text mr="20px">View by: </Text>
                <Flex direction="row">
                  <Button>Course</Button>
                  <Button>Map</Button>
                </Flex>
                <Spacer />
                <Text mr="20px">Sort by: </Text>
                <Select placeholder="Distance" w="fit-content">
                  <option value="option1">Price</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Flex>
              {isLoading && (
                <Flex direction="column" gap="20px">
                  <Skeleton height="150px" borderRadius="20px" />
                  <Skeleton height="150px" borderRadius="20px" />
                  <Skeleton height="150px" borderRadius="20px" />
                </Flex>
              )}
              {!isLoading && (
                <Flex direction="column" gap="20px">
                  <Text fontSize="25px">{new Date(date).toDateString()}</Text>
                  {ctx.courseTeeTimes.map((courseTeeTimes, index) => (
                    <CourseTeeTimes
                      key={index}
                      index={index}
                      teeTimes={courseTeeTimes}
                    />
                  ))}
                  {ctx.courseTeeTimes.map((courseTeeTimes, index) => (
                    <CourseTeeTimes
                      key={index}
                      index={index}
                      teeTimes={courseTeeTimes}
                    />
                  ))}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

function Filters({
  date,
  setDate,
}: {
  date: string;
  setDate: (date: string) => void;
}) {
  const timeRange = "11am - 2pm";
  const priceRange = "$20 - $50";
  const distanceRange = "30mi";
  return (
    <Flex
      direction="column"
      w="250px"
      h="fit-content"
      border="0.5px solid #333"
      rounded="10px"
      p="20px"
      gap="20px"
    >
      <Flex
        direction="column"
        border="0.5px solid #333"
        rounded="10px"
        p="10px"
      >
        <Input
          h="100%"
          w="fit-content"
          border="none"
          borderRadius={0}
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(date) => setDate(date.target.value)}
        />
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />

      <Flex direction="row" align="center">
        <Text>Filter Options</Text> <Spacer /> <Text>Reset</Text>
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />

      <Flex direction="row" align="center">
        <Text>Hot Deals</Text> <Spacer /> <Switch />
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />

      <Flex direction="column" gap="10px">
        <Flex direction="row" align="center">
          <Text>Start Time</Text> <Spacer /> <Text>{timeRange}</Text>
        </Flex>
        <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />

      <Flex direction="column" gap="10px">
        <Flex direction="row" align="center">
          <Text>Price Range</Text> <Spacer /> <Text>{priceRange}</Text>
        </Flex>
        <RangeSlider aria-label={["min", "max"]} defaultValue={[10, 30]}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />

      <Flex direction="column" gap="10px">
        <Flex direction="row" align="center">
          <Text>Distance</Text> <Spacer /> <Text>{distanceRange}</Text>
        </Flex>
        <Slider aria-label="slider-ex-1" defaultValue={30}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />

      <Flex direction="row" align="center">
        <Text>Golfers</Text>
        <Spacer />
        <Select placeholder="Any" w="fit-content">
          <option value="option2">1</option>
          <option value="option3">2</option>
          <option value="option2">3</option>
          <option value="option3">4</option>
        </Select>
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />

      <Flex direction="row" align="center">
        <Text>Holes</Text>
        <Spacer />
        <Select placeholder="Any" w="fit-content">
          <option value="option2">9</option>
          <option value="option3">18</option>
        </Select>
      </Flex>

      <div style={{ width: "100%", border: "0.25px solid #444" }} />
    </Flex>
  );
}
