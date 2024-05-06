import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import Sun from "./imgs/sun.png";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate()
  var currentDate = new Date();
  // Get the current year
  var currentYear = currentDate.getFullYear();

  return (
    <div style={{ marginTop: "40px" }}>
<hr />
      <Box p={{ base: 5, md: 8 }} maxW="5xl" marginInline="auto">
        <Stack
          spacing={{ base: 8, md: 0 }}
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
        >
          <Box maxW="300px">
            <Image w="100px" src={Sun} alt="Dhukh Bhanjan" />

            <Text mt={2} color="gray.500" fontSize="md">
              "Dhukh Bhanjan Astrology: Illuminating Paths, Alleviating Pains."
            </Text>
          </Box>
          <HStack
            spacing={4}
            d={{ base: "none", sm: "flex" }}
            justifyContent={{ sm: "space-between", md: "normal" }}
          >
            <VStack spacing={4} ml={{base:"-20px", md:"opx"}} alignItems="center" textAlign={"center"}>
              <Text fontSize="md" fontWeight="bold">
                ADDRESS
              </Text>
              <VStack spacing={2} alignItems="flex-start" color="gray.500">
                <Text _hover={{cursor:"pointer", color:"black"}} ml={{ base: "30px" }}>L1603 Sashtri Nagar Meerut-25004</Text>
              </VStack>
            </VStack>
             <VStack
spacing={4}
alignItems="center"
textAlign={"center"}
// ml={"6rem"}
ml={{base:"0rem", md:"6rem"}}
padding-top={"30px"}
>
<Text fontSize="md" fontWeight="bold">
  WEBSITE INFO
</Text>
<VStack spacing={2} alignItems="flex-start" color="gray.500">
  <Text onClick={()=>navigate("/terms&conditions")} to="terms&conditions" _hover={{cursor:"pointer", color:"black"}}>
    Terms And Conditions
  </Text>
</VStack>
<VStack mt={"-10px"} alignItems="flex-start" color="gray.500">
  <Text _hover={{cursor:"pointer", color:"black"}} onClick={()=>navigate("/policy")} to="privacy&policy">
    Privacy and Policy
  </Text>
</VStack>
</VStack> 
          </HStack>
        </Stack>

        <Divider my={4} />

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={3}
          justifyContent="space-between"
        >
          <Text fontSize="md" color={"gray.500"}>
            Give Us Call :-
            <Link style={{ color: "gray" }}>
              +91 7276301985 || +91 7276901955
            </Link>
          </Text>
          <Stack spacing={2} direction={{ base: "column", md: "row" }}>
            <Button
              leftIcon={<FaFacebook size={"20px"}/>}
              as={Link}
              href="#"
              rounded="md"
              color={"white"}
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
            ></Button>
            <Button
              leftIcon={<IoLogoYoutube size={"20px"}/>}
              as={Link}
              href="https://youtube.com/@Dhukhbhanjan?si=9As3OXYEDouEzcvh"
              target="_blank"
              rounded="md"
              color="white"
              bg="red.500"
              _hover={{ bg: "red.600" }}
            ></Button>
            <Button
           
              leftIcon={<FaInstagram  size={"20px"}/>}
              as={Link}
              href="https://www.instagram.com/dhukh_bhanjan?igsh=dTJhcTUwZmFtZTJh"
              target="_blank"
              rounded="md"
              color="white"
              bg="pink.500"
              _hover={{ bg: "pink.600" }}
            ></Button>
          </Stack>
        </Stack>
      </Box>
      <Box w="100%" p={4}>
        <Center>
          <Text color={"gray"} fontWeight={"600"} fontSize={"lg"}>
            Designed and Developed by &copy;
          </Text>
          <Link
            href="http://royalswebtech.com"
            isExternal
            target="_blank"
          >
            <Text
              color={"gray"}
              _hover={{ color: "black" }}
              fontWeight={"600"}
              fontSize={"lg"}
            >
              Royals WebTech
            </Text>
          </Link>
          <Text
            ml={1}
            color={"gray"}
            fontWeight={"600"}
            fontSize={{base:"13px", md:"lg"}}   
            href="http://royalswebtech.com/"
          >
          &nbsp;{currentYear}
          </Text>
        </Center>
      </Box>
    </div>
  );
};

export default Footer;