import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Checkbox,
  Image,
  Flex,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

const initialdata = {

  fname: "",
  lname: "",
  phone: "",
  dob: "",
  hours: "",
  min: "",
  pob: "",
  selectedTime: "",
}



const Kundali = () => {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState(initialdata);
  const toast = useToast()

  const handleCheckboxChange = (time) => {
    setSelectedTime(time);
    setFormData({ ...formData, selectedTime: time });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value }
    });
  };



  const handleSubmit = async() => {
  
    if(formData.pob && formData.fname && formData.lname && formData.phone && formData.dob && formData.hours && formData.min && formData.selectedTime){
     
    setIsLoading(true)
    try {
      // Make the HTTP request and wait for the response
      const response = await axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/kundali/create", formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      // Log the response data
      // Show a success toast
      if (response.data) {
        toast({
          title: "kundali submitted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
      
        })
        setFormData(initialdata)
        setDate(new Date());
        setSelectedTime(null);
        setIsLoading(false)
      } else {
        toast({
          title: response.data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false)
      }

    } catch (error) {
      setIsLoading(false)
      // Log and show an error toast
      console.error("Error submitting form:", error.response.data.error);
      toast({
        title: error.response.data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
   
    }else{
      toast({
        title: 'Fill Input field first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      }) 
    }
  };
  return (
    <>
      <div data-aos="flip-right">
        <Stack mt={20} minH="80vh" direction={{ base: "column-reverse", md: "row" }}>
          <Flex flex={1}>
            <Image ml={"20px"}
            mt={"20px"}
            borderRadius={"10px"}
              alt="Cover image"
              objectFit="cover"
              src="https://media.istockphoto.com/id/1293628662/photo/zodiac-signs-inside-of-horoscope-circle-astrology-in-the-sky-with-many-stars-and-moons.jpg?s=612x612&w=0&k=20&c=iaL8MEHQTxr6NRELN8HKRqm3yZ4ZHrSx8kk8Il13AYc="
            />
          </Flex>
          <Flex p={8} flex={1} align="center" justify="center">
            <Stack spacing={4}>
              <Stack align="center">
                <Heading fontSize="2xl">Fill The Kundali Form</Heading>
              </Stack>
              <VStack
                as="form"
                spacing={8}
                boxSize={{ base: "xs", sm: "sm", md: "md" }}
                h="max-content !important"
                bg={useColorModeValue("white", "gray.700")}
                rounded="lg"
                boxShadow="lg"
                p={{ base: 5, sm: 10 }}
              >
                <VStack spacing={4} w="100%">
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    <FormControl id="fname " width={"auto"}>
                      <FormLabel> First Name</FormLabel>
                      <Input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        placeholder="Your First Name"
                        rounded="md"
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl id="lname">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        value={formData.lname}
                        type="text"
                        name="lname"
                        placeholder="Your Last Name"
                        rounded="md"
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl id="phone">
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        value={formData.phone}
                        type="tel"
                        name="phone"
                        placeholder="Your Phone Number"
                        rounded="md"
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl id="dob">
                      <FormLabel>Select Your DOB</FormLabel>
                      <Input placeholder='Basic usage' value={formData.dob}  name="dob"  required onChange={handleChange} type='date'/>
                      {/* <SingleDatepicker
                        name="date-input"
                        date={date}
                        onDateChange={handleDateChange}
                        required
                      /> */}
                    </FormControl>

                    <FormControl id="hours">
                      <FormLabel>Hours</FormLabel>
                      <Input
                        value={formData.hours}
                        type="number"
                        name="hours"
                        placeholder="Write Hours"
                        rounded="md"
                        required
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="min">
                      <FormLabel>Minutes</FormLabel>
                      <Input
                        value={formData.min}
                        type="number"
                        name="min"
                        placeholder="Writes Minutes"
                        rounded="md"
                        required
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="pob">
                      <FormLabel>Place of Birth</FormLabel>
                      <Input
                        value={formData.pob}
                        type="text"
                        name="pob"
                        placeholder="Place of Birth"
                        rounded="md"
                        required
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Select : {selectedTime}</FormLabel>
                      <Checkbox
                        isChecked={selectedTime === "AM"}
                        onChange={() => handleCheckboxChange("AM")}
                      >
                        AM
                      </Checkbox>
                      <Checkbox
                        isChecked={selectedTime === "PM"}
                        onChange={() => handleCheckboxChange("PM")}
                      >
                        PM
                      </Checkbox>
                    </FormControl>
                  </SimpleGrid>
                </VStack>
                <VStack w="100%">
                  <Button

                    bg="yellow.300"
                    color="white"
                    _hover={{
                      bg: "yellow.500",
                    }}
                    rounded="md"
                    w="100%"
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Please wait..." : "Send"}
                  </Button>
                </VStack>
              </VStack>
            </Stack>
          </Flex>
        </Stack>
      </div>
    </>
  );
};

export default Kundali;
