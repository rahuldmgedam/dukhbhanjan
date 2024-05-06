import React, { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import {
  Box, Modal, Avatar, Heading, Text, VStack, Center, Flex,
  Button, useToast, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, FormControl, FormLabel, Input, ModalFooter, Spinner
} from '@chakra-ui/react';
import axios from 'axios';

const Profile = () => {
  const toast = useToast();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [addressData, setAddressData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);  // Add this line
  const finalRef = React.useRef(null);    // Add this line
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false)

  const FindUserAddress = () => {
    setLoading(true)
    axios
      .get("https://outrageous-shoulder-pads-fly.cyclic.app/address/get", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setAddressData(res.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false)
      });
  };

  const handleUpdateAddress = (id) => {
    setLoading(true)
    axios.patch(`https://outrageous-shoulder-pads-fly.cyclic.app/address/update/${id}`, addressData)
      .then((res) => {
        if (res.data.state) {
          toast({
            title: res.data.msg,
            status: 'success',
            duration: 2000,
            isClosable: true,
           
          });
          setLoading(false)
          onClose();
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast({
          title: 'Unable to update address',
          status: 'error',
          duration: 2000,
          isClosable: true,
         
        });
        setLoading(false)
      });
  };

  useEffect(() => {
    if (token) {
      FindUserAddress();
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://outrageous-shoulder-pads-fly.cyclic.app/user/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
      
        setProfileData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSubmitForm = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    onOpen();
  };

  return (
    <>
      {isLoading ? (
        <Box mt={20} padding='6' width="100%" textAlign={"center"}  maxW="800px" mx="auto"   bg='white'>
        <Spinner size={"xl"} color='red.500' /> 
        <Text mt={1}>Loading...</Text>
        </Box>
      ) : (
        <Box width="100%"  mt={20} p={{base:'5',md:'10'}} display={{ base: 'block', md: 'flex' }}>
          <Box
            width={{ base: '100%', md: '30%' }}
          
            p={4}
            m={{md:'20px'}}
            mb={{base:"20px"}}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Center>
              <Avatar size="xl" name={`${profileData.firstName} ${profileData.lastName}`} src="https://bit.ly/broken-link" />
            </Center>
            <VStack mt={4} spacing={2} align="center">
              <Heading>{`${profileData.firstName} ${profileData.lastName}`}</Heading>
              <Flex>
                <label>
                  <strong>UserId:</strong>
                </label>
                <Text ml={1}>@{`${profileData.firstName}${profileData.lastName}`}</Text>
              </Flex>
              <Flex>
                <label>
                  <strong>Email:</strong>
                </label>
                <Text ml={1}>{profileData.email}</Text>
              </Flex>
              <Flex>
                <label>
                  <strong>Password:</strong>
                </label>
                <Text ml={1}>******</Text>
              </Flex>
              {/* Add more user details as needed */}
            </VStack>
          </Box>
   {addressData.address1 &&    <Box
            
            width={{ base: '100%', md: '30%' }}
            p={4}
            m={{md:'20px'}}
            mb={{base:"10px"}}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Box width="100%" p={4} transition="background-color 0.3s ease-in-out" _hover={{ backgroundColor: "#f0f0f0" }}>
              <Box display="flex" width="100%" justifyContent="center" textAlign="center" mb={2}>
                <Text fontWeight="bold"> Shipping Address Details</Text>
              </Box>
              <Box display="flex" width="100%" justifyContent="center" textAlign="center" mb={2}>
                <Text>Address Line 1: {addressData.address1}</Text>
              </Box>
              <Box display="flex" width="100%" justifyContent="center" textAlign="center" mb={2}>
                <Text>Address Line 2: {addressData.address2}</Text>
              </Box>
              <Box display="flex" width="100%" justifyContent="center" textAlign="center" mb={2}>
                <Text>City: {addressData.city}</Text>
              </Box>
              <Box display="flex" width="100%" justifyContent="center" textAlign="center" mb={2}>
                <Text>Postal Code: {addressData.postalCode}</Text>
              </Box>
              <Box display="flex" width="100%" justifyContent="center" textAlign="center" mb={2}>
                <Text>Phone Number: {addressData.phone}</Text>
              </Box>
            </Box>
            <Box width="100%" textAlign="center" mt={3}>
              <Button
                p="5px 50px"
                colorScheme='whatsapp'
                onClick={handleOpenModal}
                transition="background-color 0.3s ease-in-out"
                _hover={{ backgroundColor: "#4CAF50", color: "white" }}
              >
                EDIT
              </Button>
            </Box>
          </Box>}
       

        </Box>
      )}

      {/* Modal */}
      <Modal size={"xl"}  initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderLeft="4px solid blue" bg="#E8E8E8" margin="10px" p="2px"> Update Shipping Address</ModalHeader>
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody pb={6}>
            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={5}>
              <FormControl isRequired>
                <FormLabel fontWeight={600}>Address Line 1</FormLabel>
                <Input placeholder='Address Line 1' name='address1' value={addressData.address1} onChange={handleSubmitForm} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address Line 2</FormLabel>
                <Input placeholder='Address Line 2' name='address2' value={addressData.address2} onChange={handleSubmitForm} />
              </FormControl>
            </Box>

            <Box mt={5} display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={5}>
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input placeholder='country' name='country' value={addressData.country} onChange={handleSubmitForm} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input placeholder='city' name='city' value={addressData.city} onChange={handleSubmitForm} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Postal code</FormLabel>
                <Input placeholder='postal code' name='postalCode' value={addressData.postalCode} onChange={handleSubmitForm} />
              </FormControl>
            </Box>

            <Box mt={5}>
              <FormControl isRequired>
                <FormLabel>Phone No.</FormLabel>
                <Input placeholder='phone Number' name='phone' value={addressData.phone} onChange={handleSubmitForm} />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            {loading ? <Button
              isLoading
              colorScheme='blue'
              spinner={<BeatLoader size={8} color='white' />}
            >
              Click me
            </Button> : <Button colorScheme='green' mr={3} onClick={() => handleUpdateAddress(addressData._id)}>
              Update
            </Button>}

            <Button onClick={() => handleClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
