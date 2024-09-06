// app/layout.tsx

import Navbar from "@/components/Navbar";
import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import "./globals.css";
import { TeeTimeProvider } from "@/components/TeeTimeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <TeeTimeProvider>
            <Navbar />
            {/* TODO: REMOVE */}
            <Flex
              w="100%"
              h="60px"
              align="center"
              justify="center"
              borderRadius="8px"
              bg="red"
              mb="20px"
            >
              <Text color="white">
                ALERT!! THIS IS A BETA SITE. ONLY CHANGING THE DATE IS
                FUNCTIONAL
              </Text>
            </Flex>
            {children}
          </TeeTimeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
