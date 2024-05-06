"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function Cancel() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningIcon boxSize={"50px"} color={"red.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        YOUR PAYMENT HAS BEEN CANCELLED
      </Heading>
      <Text color={"gray.500"}>"Please Try Again Later"</Text>
    </Box>
  );
}
