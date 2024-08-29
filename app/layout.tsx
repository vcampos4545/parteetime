// app/layout.tsx

import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
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
            {children}
          </TeeTimeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
