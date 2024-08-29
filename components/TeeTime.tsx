import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface TeeTimeProps {
  teeTime: TeeItUpTeeTime;
}

export default function TeeTime({ teeTime }: TeeTimeProps) {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" w="30%">
      <Text fontSize="xl">{teeTime.courseId}</Text>
      <Text>{teeTime.teetime}</Text>
      <Text>
        $
        {teeTime.rates && teeTime.rates.length > 0
          ? teeTime.rates[0].greenFeeWalking
          : "No time"}
      </Text>
    </Box>
  );
}
