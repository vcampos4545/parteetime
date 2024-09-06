import React from "react";
import { Button, Flex, Text, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      px="20px"
      w="100%"
      h="60px"
      bg="white"
      color="black"
      borderBottom="0.5px solid #333"
    >
      <Flex direction="row" align="center" gap="25px">
        <Link href="/">
          <Flex direction="row" align="center" gap="20px">
            <Image src="/images/logo.jpg" alt="golf" w="40px" h="40px" />
            <Text fontSize="30px" fontWeight={600}>
              PARTEETIME
            </Text>
          </Flex>
        </Link>
        <a href="/tee-times">
          <Text>Tee Times</Text>
        </a>
        <Text>Course Near Me</Text>
      </Flex>
      <Button bg="#1AAF4B">
        <Text color="white">Sign In</Text>
      </Button>
    </Flex>
  );
}
