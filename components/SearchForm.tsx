"use client";
import { TeeTimeContext } from "@/components/TeeTimeContext";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Text,
  InputLeftElement,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

export default function SearchForm() {
  const [zipCode, setZipCode] = useState("");
  const [date, setDate] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [errorMessage, setErrorMessage] = useState("");
  const ctx = useContext(TeeTimeContext);

  const handleSearch = async () => {
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
    console.log(data);
    ctx.setCourseTeeTimes(data as CourseTeeTimes[]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  // navigator.geolocation.getCurrentPosition((position) => {
  //   console.log("Position: ", position);
  // });
  return (
    <Flex direction="column" gap="4">
      <Heading>Search for tee times near you</Heading>

      <InputGroup>
        <InputLeftElement w="150px">
          <Input
            type="date"
            id="date"
            name="date"
            value={date || ""}
            onChange={(date) => setDate(date.target.value)}
          />
        </InputLeftElement>
        <Input
          pl="160px"
          pr="110px"
          placeholder="Enter ZIP code"
          name="zipCode"
          value={zipCode}
          onChange={(zipCode) => setZipCode(zipCode.target.value)}
        />
        <InputRightElement w="100px">
          <Button minW="100px" onClick={handleSearch} colorScheme="teal">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>

      {errorMessage && <Text color="red">{errorMessage}</Text>}

      {/* Filters */}
      {ctx.courseTeeTimes.length > 0 && (
        <>
          <Flex direction="row" gap="5px">
            <FormControl>
              <FormLabel htmlFor="timeOfDay">Time of Day</FormLabel>
              <Select
                id="timeOfDay"
                name="timeOfDay"
                value={filters.timeOfDay || ""}
                onChange={handleChange}
              >
                <option value="">Any Time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </Select>{" "}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="minPrice">Minimum Price</FormLabel>
              <Input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="maxPrice">Maximum Price</FormLabel>
              <Input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice || ""}
                onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Heading>Displaying Tee Times for {date}</Heading>
        </>
      )}
    </Flex>
  );
}
