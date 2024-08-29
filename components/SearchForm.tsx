"use client";
import { TeeTimeContext } from "@/components/TeeTimeContext";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

export default function SearchForm() {
  const [zipCode, setZipCode] = useState("");
  const [date, setDate] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const ctx = useContext(TeeTimeContext);

  const handleSearch = async () => {
    // onSearch(filters);
    const resp = await fetch(
      "/api/teetimes?" +
        new URLSearchParams({
          date,
          facilityIds: "4996",
          alias: "oak-hills-park-golf-course",
        })
    );
    const data = await resp.json();
    console.log(data[0]);
    ctx.setTeeTimes(data[0].teetimes as TeeItUpTeeTime[]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <Flex direction="column" gap="4">
      <Heading>Search for tee times near you</Heading>

      <Input
        placeholder="Enter ZIP code"
        name="zipCode"
        value={zipCode}
        onChange={(zipCode) => setZipCode(zipCode.target.value)}
      />
      <Flex direction="row"></Flex>
      <FormControl>
        <FormLabel htmlFor="date">Date</FormLabel>
        <Input
          type="date"
          id="date"
          name="date"
          value={date || ""}
          onChange={(date) => setDate(date.target.value)}
        />
      </FormControl>

      <Button onClick={handleSearch} colorScheme="teal">
        Search
      </Button>
      {/* Filters */}
      {ctx.teeTimes.length > 0 && (
        <>
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
          <Flex direction="row" gap="2">
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
        </>
      )}
    </Flex>
  );
}
