import React, { useState } from "react";
import "../style/contact.css"
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useToast } from '@chakra-ui/react'
import axios from "axios";
const contactOptions = [
  {
    label: "Address",
    value:
      "L1603 Sashtri Nagar Meerut-25004",
    icon: IoLocation,
  },
  {
    label: "PHONE NUMBER",
    value: "+91 7276301985 , +91 7276901955",
    icon: FaPhone,
  },
  {
    label: "EMAIL",
    value: "support@dhukbhanjan.com   accounts@dhukbhanjan.com",
    icon: IoMail,
  },
];

const initialState = {
  name: "",
  email: "",
  PhoneNo: "",
  subject: "",
  message: ""
}


const Contact = () => {
  const [data, setData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const handleChangeData = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSend = async () => {
    setIsLoading(true)
    if (data.name && data.email && data.PhoneNo && data.message && data.subject) {
      try {
        const response = await axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/contact/create", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.data) {
          toast({
            title: "Your Query send successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
           
          })
          setData(initialState)
          setIsLoading(false)
        } else {
          toast({
            title: "input fiels is required",
            status: "error",
            duration: 3000,
            isClosable: true,
          });

        }

      } catch (error) {
        // Log and show an error toast
        console.error("Error submitting form:", error.response.data.error);
        toast({
          title: "something wrong try again after sometime",
          status: "error",
          duration: 3000,
          isClosable: true,
         
        });
      }
      setIsLoading(false)
    } else {

      toast({
        title: 'Input Filed is required',
      
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
    }
  };
  return (
    <div data-aos="fade-in">
      <Container maxW="7xl" mt={10} py={10} px={{ base: 5, md: 8 }}>
        <Stack spacing={10}>
          <VStack align="center">
            <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={2}>
              Contact Us
            </Heading>
            <Text fontSize="lg" textAlign="center">
              FEEL FREE TO REACH US{" "}
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={20}>
            {contactOptions.map((option, index) => (
              <Flex
                borderRadius="5px"
                boxShadow={"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;"}
                padding={"30px"}
                key={index}
                direction="column"
                align="center"
                textAlign="center"
                _hover={{ bgColor: "yellow.300", borderRadius: "5px", cursor: "pointer" }}
              >
                <Icon as={option.icon} w={10} h={10} color="yellow.400" />
                <Text fontSize="lg" fontWeight="semibold">
                  {option.label.toUpperCase()}
                </Text>
                <Text fontSize="md" textAlign="center">
                  {option.value} <br />
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
          <VStack
            as="form"
            spacing={8}
            w="100%"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Write Your Name"
                    name="name"
                    value={data.name}
                    onChange={handleChangeData}
                    rounded="md"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Your Mail" required rounded="md" name="email"
                    value={data.email}
                    onChange={handleChangeData} />
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    placeholder="Your Phone Number"
                    rounded="md"
                    name="PhoneNo"
                    value={data.PhoneNo}
                    onChange={handleChangeData}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl id="subject">
                <FormLabel>Subject</FormLabel>
                <Input type="text" placeholder="Your Problem" rounded="md" name="subject"
                  value={data.subject}
                  onChange={handleChangeData} />
              </FormControl>
              <FormControl id="message">
                <FormLabel>Message</FormLabel>
                <Textarea
                  size="lg"
                  placeholder="Enter your message"
                  rounded="md"
                  name="message"
                  value={data.message}
                  onChange={handleChangeData}
                />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                isLoading={isLoading}
                padding={"25px"}
                onClick={handleSend}
                colorScheme="yellow"
                color="white"
                _hover={{
                  bg: "yellow.500",
                }}
                rounded="md"
                w={{ base: "100%", md: "max-content" }}
              >
                Send Message
              </Button>


            </VStack>
          </VStack>
        </Stack>
      </Container>
    </div>
  );
};

export default Contact;



