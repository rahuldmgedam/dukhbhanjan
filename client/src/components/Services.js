import React, { useState } from "react";
import {
  Heading,
  Box,
  Stack,
  Button,
  Image,
  useColorModeValue,
  SimpleGrid,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import data from "../data";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  PhoneNo: "",
  subject: "",
  message: ""
}


const ServicesCard = ({ title, img }) => {
  const [data, setData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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

  const handleButtonClick = () => {
    // window.location.href = "tel:+917060308055";
    onOpen()
  };

  return (
    <Box
    
    maxW={"320px"}
    w={"full"}
    bg={useColorModeValue("white", "gray.900")}
    boxShadow={"2xl"}
    borderRadius={"10px"}
    p={6}
    textAlign={"center"}
    transition={"transform 0.3s ease-in-out"}
    _hover={{ transform: "scale(1.05)" }} // Zoom effect on hover
  >
    <Image
      height={"200px"}
      width={"300px"}
      src={img}
      mb={4}
      _after={{
        content: '""',
        w: 4,
        h: 4,
        bg: "green.300",
        border: "2px solid white",
        pos: "absolute",
        bottom: 0,
        right: 3,
      }}
    />
    <Heading fontSize={"xl"} fontFamily={"body"}>
      {title}
    </Heading>

    <Stack mt={8} direction={"row"} spacing={4}>
      <Button
        flex={1}
        fontSize={"sm"}
        rounded={"full"}
        bg={"yellow.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(241 196 15 / 48%), 0 10px 10px -5px rgb(241 196 15 / 43%)"
        }
        _hover={{
          bg: "yellow.500",
        }}
        _focus={{
          bg: "yellow.500",
        }}
        onClick={handleButtonClick}
      >
        Connect With Us
      </Button>
    </Stack>
    <Modal
    size={"xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Your Problem With Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <VStack
            as="form"
            spacing={8}
            w="100%"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
             
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
           
          </ModalBody>
        </ModalContent>
      </Modal>
  </Box>
  );
};

export default function Services() {
  return (
    <Box mt={20} data-aos="fade-right">
      <Heading as="h1" textAlign="center" my={8}>
        What We Provide...
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }}  pl={[8,5]} spacing={7}>
        {data && data.map(({ id, title, img }) => (
          <ServicesCard key={id} title={title} img={img} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
