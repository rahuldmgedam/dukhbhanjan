"use client";

import { Box, Center, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5); // Start with the initial count of 5

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(intervalId); // Clear the interval when count reaches 1
          navigate("/"); // Navigate to home page
          return prev;
        }
        return prev - 1; // Decrement the count by 1
      });
    }, 1000);
  
    return () => clearInterval(intervalId); // Cleanup the interval
  }, [navigate]);
  

  return (
    <Box textAlign="center" mt={90}>
          <Heading color={"green.500"}> Order Placed Successfully</Heading>
      <Center>
        <Box boxSize="sm">
        
          <Image
          width={"500px"}
          height={"300px"}
            src="https://cdn.dribbble.com/users/282075/screenshots/4756095/icon_confirmation.gif"
            alt="Order done"
          />
        </Box>
      </Center>
      <Text color={"gray.500"} fontSize={"30px"} fontWeight={500}>
        Thank you for ordering from "Dhukh Bhanjan"
      </Text>
      <Text color={"gray.500"}>
        Redirecting to Home Page in {count} seconds
      </Text>
    </Box>
  );
}
