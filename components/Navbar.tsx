import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      px="20px"
      w="100%"
      h="50px"
      bg="green"
      color="white"
    >
      <Text>Par-Tee Time</Text>
      <Button>
        <Text>Sign In</Text>
      </Button>
    </Flex>
  );
}
