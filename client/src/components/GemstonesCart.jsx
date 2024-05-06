import {
  Box,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Flex,
  AlertIcon,
  Alert,
  AlertTitle,
  Heading,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import ThemeContext from './ThemeContext';
import styled from '@emotion/styled';

const GemstonesCart = ({
  _id,
  description,
  image,
  title,
  qualities, benefits
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedQuality, setSelectedQuality] = useState("");
  const [radioItem, setRadioItem] = useState(0);
  const [emptyRadio, setEmptyRadio] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const { toggleTheme } = useContext(ThemeContext);
  const [show, setShow] = useState('nowrap');

  let matchdatafound = qualities.find((el) => el.type === selectedQuality);
  const token = localStorage.getItem("token")

  const benefitsArray = benefits.split('.').map(benefit => benefit.trim());
  // Exclude the last item using slice(0, -1)
  const numberedBenefits = benefitsArray.slice(0, -1).map((benefit, index) => `${index + 1}. ${benefit}`);



  console.log("msain", numberedBenefits)
  const handleCartData = async () => {
    if (!token) {
      toast({
        title: "Login first",
        status: 'error',
        duration: 2000,
        isClosable: true,
       
      });
      return
    }
    setLoading(true)
    if (!radioItem) {
      setEmptyRadio(true);
      setLoading(false)
      return;
    }
    let finalData = {
      _id,
      quality: selectedQuality,
      image,
      price: radioItem,
      title,
    };
    try {
      const response = await axios.post(
        'https://outrageous-shoulder-pads-fly.cyclic.app/cart/create',
        finalData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.state) {
        toast({
          title: "product is added in cart ",
          status: 'success',
          duration: 3000,
          isClosable: true,
          zIndex:10000

        });
        setLoading(false)
        onClose();
        toggleTheme()
      } else {
        toast({
          title: "product is Already in your cart",
          status: 'error',
          duration: 3000,
          isClosable: true,
          zIndex:10000
        });
        setLoading(false)
      }
    } catch (error) {
      
      toast({
        title: error.response.data.msg,
        status: 'error',
        duration: 5000,
        isClosable: true,
        zIndex:1000
      },);
      setLoading(false)
    }
  };

  const handleQuality = (e) => {
    setRadioItem(0);
    setSelectedQuality(e.target.value);
  };

  const handleSort = (e) => {
    setEmptyRadio(false);
    const { value } = e.target;
    setRadioItem(+value);
  };

  const handleQualityChange = () => {
    setRadioItem(0);
  };

  return (
    <Box mt={"10px"}>
      <Box
        border="1px solid #ececec"
        padding="10px"
        width={['85%', '250px']}
        // border={"1px solid red"}
        margin="auto"
        textAlign="center"
        cursor="pointer"
        borderRadius="3px"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
        _hover={{
          border: 'none',
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
          borderRadius: '3px',
        }}
      >
        <Box
          as="div"
          position="relative"
          overflow="hidden"
          borderRadius="10px"
        >

          <Box

            as="div"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: 'scale(1.1)' }}
            onClick={onOpen}

          >
          <Center><Image  src={image} borderRadius="10px" alt={title} width={{base:"60%", md:"100%"}}  height={['190px', '200px']} /></Center>  
          </Box>

          <Box textAlign="left" p={2} mt={2}>
            <Text fontWeight={{ base: '600', md: '500' }} fontSize={{ base: '20px', md: '17px' }}
              onClick={onOpen}
            >
              {title}
            </Text>
            <Text textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={show} transition={'ease-in 0.3s'}
              onClick={() => { show == 'nowrap' ? setShow('normal') : setShow('nowrap') }}>{description}</Text>
            {/* <hr />
            <Box textAlign={"center"}>
              <Button color={"white"} mt={"10px"}  p={"10px 30px"} colorScheme="yellow" mr={3} onClick={() => onOpen()}>
                View Details
              </Button>
            </Box> */}

          </Box>
        </Box>

      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent mt={20}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image height={['50%', '200px']} src={image} alt={title} />
            <Box mt={4}>

              <FormLabel>Description: </FormLabel>
              <Text>{description}</Text>

            </Box>

            <div>
              <FormLabel>Benefits:</FormLabel>

              {numberedBenefits.map((benefit, index) => (
                <Text key={index}>{benefit}</Text>

              ))}

            </div>





            <Box display={"flex"}>
              <FormControl mt={4} width={"40%"}>
                <FormLabel>Quality</FormLabel>
                <Select placeholder='Select quality' width={"70%"} onChange={(e) => { handleQuality(e); handleQualityChange(); }}>
                  {qualities && qualities.map((item) => (
                    <option key={item.type} value={item.type}>{item.type}</option>
                  ))}
                </Select>
                <br />
                {emptyRadio && <Alert status='error' width={"100%"}>
                  <AlertIcon />
                  <AlertTitle>Select Price As per Ratti</AlertTitle>
                </Alert>}
                {selectedQuality && <FormLabel>Quality Per Ratti Price</FormLabel>}
                {matchdatafound && matchdatafound.prices.map((item) => (
                  <Box key={item} onChange={handleSort} style={{ marginBottom: '8px' }}>
                    <input type="radio" name='order' value={item} style={{ marginRight: '10px' }} />
                    {/* <label style={{ textDecoration: 'line-through', color: 'teal' }}>₹{(item * 10) / 100 + item}</label> */}

                    <label style={{ marginLeft: '8px' }}>₹{item}</label><br />
                  </Box>
                ))}
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} colorScheme="yellow" mr={3} onClick={handleCartData}>
              ADD TO CART
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GemstonesCart;


