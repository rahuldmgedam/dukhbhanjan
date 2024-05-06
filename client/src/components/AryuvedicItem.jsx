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
    FormLabel,
    useDisclosure,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import React, { useContext, useState } from 'react';
  import { useToast } from '@chakra-ui/react';
  import ThemeContext from './ThemeContext';
 
  
  const AryuvedicItem = ({
    _id,
    description,
    image,
    title,
    price
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
  
    const [isLoading, setLoading] = useState(false)
    const { toggleTheme } = useContext(ThemeContext);
    const [show, setShow] = useState('nowrap');
  
  
    const token = localStorage.getItem("token")
  
  
  
   
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
      
      let finalData = {
        _id,
        image,
        price,
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
          });
          setLoading(false)
        }
      } catch (error) {
        
        toast({
          title: error.response.data.msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false)
      }
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
              <Image  src={image} borderRadius="10px" alt={title} width={{base:"80%", md:"100%"}}  height={['190px', '200px']} />
            </Box>
  
            <Box textAlign="left" p={2} mt={2}>
              <Text fontWeight={{ base: '600', md: '500' }} fontSize={{ base: '20px', md: '17px' }}
                onClick={onOpen}
              >
            {title}
              </Text>
              <Text textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={show} transition={'ease-in 0.3s'}
                onClick={() => { show == 'nowrap' ? setShow('normal') : setShow('nowrap') }}>{description}</Text>
              <Text fontWeight={600} fontSize={"17px"} color={"green"}>₹{price}.00</Text>
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
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image height={['50%', '200px']} src={image} alt={title} />
              <Box mt={4} display={"flex"}>
  
                <FormLabel>Description: </FormLabel>
                <Text>{description}</Text>
              </Box>
                <Text fontWeight={600} fontSize={"17px"} color={"green"}>₹{price}.00</Text>
  
             
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
  
  export default AryuvedicItem;
  
  
  