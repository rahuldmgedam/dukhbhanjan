import React, { useContext, useEffect, useState } from 'react';
import { GiShoppingCart } from "react-icons/gi";
import BeatLoader from 'react-spinners/BeatLoader';
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Center,
  HStack,
  Link,
  Text,
  Select,
  Button,
  useColorModeValue as mode,
  useToast,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  useDisclosure,
  Modal,
  Skeleton,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  FormLabel,
  ModalFooter,
  SkeletonCircle,
  SkeletonText,
  IconButton,
} from '@chakra-ui/react';

import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import ThemeContext from '../components/ThemeContext';
import styled from '@emotion/styled';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

const initialAddress = {
  address1: "",
  address2: "",
  country: "",
  city: "",
  postalCode: "",
  phone: "",
}


const Cart = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteloading, setDeleteloading] = useState(false)
  const [initLoading, setInitLoading] = useState(false)
  const [failed, setFaild] = useState(false)
  const [update, setUpdate] = useState(false);
  const [cartData, setData] = useState([]);
  const totalPrice = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()
  const [address, setAddress] = useState(initialAddress)
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleQuantity = (id, e) => {
    let quantity = e.target.value;
    const updatedItems = cartData.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: +quantity,
        };
      }
      return item;
    });
    setData(updatedItems);
  };

  const func = () => {
    setUpdate((prev) => !prev);
  };

  const handleDelete = async (id) => {
  setDeleteloading(true)
    try {
      const response = await axios.delete(`https://outrageous-shoulder-pads-fly.cyclic.app/cart/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response) {
         setUpdate((prev) => !prev);
        await toggleTheme() 
        setDeleteloading(false)
      }

    } catch (error) {
      func();
      setDeleteloading(false)
    }
  };

  const getCartProduct = () => {
    setInitLoading(true)
    return axios
      .get('https://outrageous-shoulder-pads-fly.cyclic.app/cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const cartData = res.data.map(item => ({ ...item, quantity: 1 }));
        setData(cartData);
        setInitLoading(false)

      })
      .catch((err) => {
        console.log(err);
        setInitLoading(false)
      });
  };
  const handlePayment = async () => {
    setCheckoutLoading(true)
    try {
      const { data } = await axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/api/payment/orders", { amount: totalPrice }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // console.log(data);
      // Call the function to initialize payment with Razorpay
      initPayment(data.data);
    } catch (error) {
      setCheckoutLoading(false)
      console.error(error);
      toast({
        title: "Error during payment initiation",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const initPayment = async(data) => {
    const options = {
      key: "rzp_test_FZa7FJ6Bglhj8Y", // Replace with your actual key
      amount: data.amount,
      currency: data.currency,
      name: "Dhukh Bhanjan",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
     
        try {
          await axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/api/payment/verify", response, {
           
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });

          if (response.razorpay_signature) {
             console.log("res",response)
            setPaymentLoading(true)
            toast({
              title: 'Paymeny Done Successfully.',
              description: "Your Order Done Success",
              status: 'success',
              position: "top-right",
              duration: 3000,
              isClosable: true,
            })
            
            const {razorpay_order_id,razorpay_payment_id } = response
             cartData.forEach((item)=> {
            item.razorpay_order_id = razorpay_order_id;
            item.razorpay_payment_id = razorpay_payment_id;
           })
       
            await handleMyOrderData(cartData)
            await handledeleteCartData(cartData)
            setPaymentLoading(false)
          } else {
            setFaild(true)
            setPaymentLoading(false)
          }
        } catch (error) {
          console.error(error.message);
        }
      },
      theme: {
        color: "#F7C440",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  const handledeleteCartData = async (data) => {
    return axios
      .post('https://outrageous-shoulder-pads-fly.cyclic.app/cart/order/delete', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res.data.state) {
          toggleTheme()
          navigate("/success")
        } else {
          toast({
            title: 'something went wrong while deleting cartdata',
            status: 'error',
         
            duration: 3000,
            isClosable: true,
          })
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleSubmitForm = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleForm = (e) => {
    e.preventDefault();
    if (address.address1.length == 0 && address.address2.length == 0 && address.city.length == 0 && address.country.length == 0 && address.phone.length == 0 && address.postalCode.length == 0) {

      toast({
        title: 'missing input feild fill first',
        status: 'error',
       
        duration: 3000,
        isClosable: true,
      })
    } else {
      axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/address/create", address, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.data.state == "create") {
            setAddress(initialAddress)
              
            onClose()
            // handlePayment()
            setModalOpen(true);
          } else {
            onClose()
            // handlePayment()
            setModalOpen(true);
          }
        })
    }

  }


  const handleMyOrderData = async (datatoAdd) => {

    try {
      const response = await axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/order/create", datatoAdd, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

    } catch (error) {
      // console.error(error);
      console.log(error.message)
    }
  };

  const conditionallyPaymentForm = async () => {
    // console.log(address)
       setCheckoutLoading(true)
    try {
      const response = await axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/address/create", address, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.state == "onOpen") {
        onOpen()
        setCheckoutLoading(true)
      } else if (response.data.state == "handlePayment") {
        setCheckoutLoading(true)
        setModalOpen(true);
        // handlePayment()

      } else {
        setCheckoutLoading(true)
        // handlePayment()
        setModalOpen(true);
      }

    } catch (error) {
      toast({
        title: 'something wrong in checkout try after some time',
        status: 'error',
      
        duration: 3000,
        isClosable: true,
      })
      console.log(error.message)
    }
    setCheckoutLoading(false)
  };


  const handleClose = () => {
    setAddress(initialAddress)
    onClose()
  }
  const token = localStorage.getItem("token")

  const onClose1 = () => {
    setModalOpen(false);
  };





  const finalOrderProcess = async() =>{
    setIsLoading(true)
        try {
   const response = await axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/api/payment/verify", {cartData, totalPrice}, {  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });

          if (response.data.state) {
          console.log(response)
            setPaymentLoading(true)
            setIsLoading(false)
            toast({
              title: 'Order Place Successfully.',
              description: "Your Order Done Success",
              status: 'success',
           
              duration: 6000,
              isClosable: true,
            })

            setModalOpen(false);
             await handleMyOrderData(cartData)
             await handledeleteCartData(cartData)
            setPaymentLoading(false)

          } else {
            setFaild(true)
            setPaymentLoading(false)
            setIsLoading(false)
          }
        } catch (error) {
          console.error(error.message);
          setIsLoading(false)
        }
      
  } 


  useEffect(() => {
    if(token){
      getCartProduct();
    }
  }, [update, theme]);



  return (
 <>
 <Box>
      {paymentLoading==true ? (
       
          <Box width={"100%"} height={"300px"} position={'relative'}top={"150px"} left={"50%"}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Box>
       
      ) : (
        <DIV>
          <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={40}>
              <ModalHeader borderLeft={"4px solid blue"} bg={"#E8E8E8"} margin={"10px"} p={"2px"}>Shipping Address</ModalHeader>
              <ModalCloseButton onClick={() => handleClose()} />
              <ModalBody pb={6}>
                <Box display={"flex"} gap={5}>
                  <FormControl isRequired>
                    <FormLabel>Address Line 1</FormLabel>
                    <Input placeholder='Address Line 1' name='address1' value={address.address1} onChange={handleSubmitForm} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Address Line 2</FormLabel>
                    <Input placeholder='Address Line 2' name='address2' value={address.address2} onChange={handleSubmitForm} />
                  </FormControl>
                </Box>

                <Box mt={5} display={"flex"} gap={5}>
                  <FormControl isRequired>
                    <FormLabel>Country</FormLabel>
                    <Input placeholder='country' name='country' value={address.country} onChange={handleSubmitForm} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input placeholder='city' name='city' value={address.city} onChange={handleSubmitForm} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Postal code</FormLabel>
                    <Input placeholder='postal code' name='postalCode' value={address.postalCode} onChange={handleSubmitForm} />
                  </FormControl>
                </Box>

                <Box mt={5}>
                  <FormControl isRequired>
                    <FormLabel>Phone No.</FormLabel>
                    <Input placeholder='phone Number' name='phone' value={address.phone} onChange={handleSubmitForm} />
                  </FormControl>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='green' mr={3} onClick={handleForm}>
                  SUBMIT
                </Button>



                <Button onClick={() => handleClose()}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {cartData.length > 0 ? (
            <Box >
              <Heading  ml={5} color={"gray.500"}  fontSize={{ base: "20px", md: '25px' }} fontWeight="bold">
                Shopping Cart ({cartData.length} items)
              </Heading>
              <Box
                width="100%"
                padding="20px"
                justifyContent="space-between"
                display="flex"
                flexDirection={['column', 'column', 'row']}
              >
                {deleteloading ? <Box gap={"20px"} display={"flex"} flexDirection={"column"} width={['100%', '100%', '65%']} height="100%" mb={['20px', '20px', '0']}> <Box padding='6' boxShadow='lg' bg='white'>
                  <SkeletonCircle size='10' />
                  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Box>
                  <Box padding='6' boxShadow='lg' bg='white'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                  </Box>
                  <Box padding='6' boxShadow='lg' bg='white'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                  </Box></Box> :
                  <Box width={['100%', '100%', '65%']} height="100%" mb={['20px', '20px', '0']}>
                    {cartData && cartData.map((item) => (
                      <Box
                        className='cart_Main'

                        key={item._id}
                        boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
                        flexWrap="wrap"
                        alignItems={"center"}
                        justifyContent="space-between"
                        display="flex"
                        mt={"20px"}
                        height="30%"
                     
                      >
                        {/* Image */}
                        <Box className='image_outer' width="20%" height={{ base: "50%", md: '150px' }}>
                          <Image
                            className='cart_image'
                            borderRadius="10px"
                            mt={"10px"}
                            width={"70%"}
                            height={"90%"}
                            objectFit="cover"
                            src={item.image}
                            alt={item.title}
                          />

                        </Box>

                        {/* Title box */}
                        <Box className='cart_title' width="auto" height="100%">
                          <Text className='title' fontSize="17px" color="gray.600">
                            {item.title}
                          </Text>
                        </Box>

                        {/* Select quantity box */}
                        <Box className='cart_quality' width="12%" gap={1} height="100%" display={"flex"}>
                          <Text mt={2}>QTY:</Text>
                          <Select onChange={(e) => handleQuantity(item._id, e)} >
                            {[1, 2, 3, 4, 5].map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </Select>
                        </Box>
                        {item.quality && <Text className='product_quality' fontSize="17px" color="gray.600">{item.quality}</Text>}   

                        {/* Price box */}
                        <Box className='product_price' width="14%" height="100%">
                          <Text className='price' fontSize={{ base: "20px", md: "17px" }} color="gray.600">
                            ₹ {item.price * (item.quantity || 1)} Per Ratti
                          </Text>
                        </Box>

                        {/* Delete icon */}

                        <Box onClick={() => handleDelete(item._id)} className='cart_delete' width="10%" position="relative" height="100%" p={4}>
                          <IconButton

                            icon={<CloseIcon />}
                            colorScheme='red'
                            variant={"outline"}
                            isRound
                          />


                        </Box>
                      </Box>


                    ))}
                  </Box>}
                {/* Left box */}
                {/* Right box */}
                <Box width={['100%', '100%', '30%']} borderRadius="5px" height="100%" mt={['20px', '20px', '0']}>
                  <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
                    <Heading size="md">Order Summary</Heading>

                    <Stack spacing="6">
                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="17px" color="gray.700" fontWeight={500}>
                          Subtotal
                        </Text>
                        <Text>₹{(totalPrice)}</Text>
                      </Box>

                      <Flex justify="space-between">
                        <Text fontSize="21px" fontWeight="semibold">
                          Total
                        </Text>
                        <Text fontSize="xl" fontWeight="extrabold">
                          ₹ {totalPrice}
                        </Text>
                      </Flex>
                    </Stack>

                    <Button
                      onClick={conditionallyPaymentForm}
                      colorScheme="yellow"
                      color="white"
                      size="lg"
                      fontSize="md"
                      rightIcon={<FaArrowRight />}
                    >
                   {checkoutLoading ? "please wait..." : "Checkout" }   
                    </Button>
                    {/* <Button
                      onClick={conditionallyPaymentForm}
                      colorScheme="yellow"
                      color="white"
                      size="lg"
                      fontSize="md"
                      rightIcon={<FaArrowRight />}
                    >
                   Place Order 
                    </Button> */}

                    <Center>
                      <HStack textAlign="center" mt="6" fontWeight="semibold">
                        <p>or</p>
                        <Link color={mode('blue.500', 'blue.200')} onClick={() => navigate('/gemstones')}>
                          Continue shopping
                        </Link>
                      </HStack>
                      {failed && (
                        <Alert status="error">
                          <AlertIcon />
                          <AlertTitle>Payment Failed</AlertTitle>
                          <AlertDescription>Your Payment is failed try Again</AlertDescription>
                        </Alert>
                      )}
                    </Center>
                  </Stack>
                </Box>
              </Box>
            </Box>
          ) : (
            <Center height={'40vh'} display={'flex'} flexDirection={'column'} alignItems={'center'}>

              <Box mt={{ base: "100px", md: "170px" }} mb={3}><GiShoppingCart size={"150px"} /></Box>
              <Box mb={'70px'}>
                <Text fontSize="lg" marginLeft={5} fontWeight="bold">
                  Your Cart is Empty
                </Text>
                <Button mt={4} ml={4} onClick={() => navigate("/gemstones")} _hover={{ textDecoration: 'none', cursor: 'pointer' }} color={"white"} colorScheme='yellow'>Continue Shopping</Button>

              </Box>
            </Center>
          )}
        </DIV>
      )}
    </Box> 
    <Modal isOpen={isModalOpen} onClose={onClose1}>
        <ModalOverlay/>
        <ModalContent mt={"100px"}>
          <ModalHeader>Order Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}>
          <Text color="red.500">Note:</Text>
            <Text color="green.500" ml={1}> After placing your order, the subsequent payment processing and product delivery will be seamlessly managed by our dedicated admin team. They will reach out to you using the contact details provided during the order placement. Your satisfaction is our priority, and our admin is here to ensure a smooth and secure transaction experience for you.</Text>
        
            </Box>
     
          </ModalBody>

          <ModalFooter>
        {isLoading ? <Button isLoading colorScheme='green' mr={3} spinner={<BeatLoader size={8} color='white' />}>
              Place Order
            </Button>:<Button colorScheme='green' mr={3} onClick={finalOrderProcess}>
              Place Order
            </Button>}  
          
            <Button variant='ghost' onClick={onClose1}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

 </>
  );
};

export default Cart;


const DIV = styled.div`
margin-top: 80px;
/* Responsive styles for small devices (phones) */
@media only screen and (max-width: 600px) {
 
  .cart_Main{
  
    display: flex;
    flex-direction: column;
  }
  .image_outer{
    margin-left:-30px;
    width: 90%;
  }
  .cart_image{
    width: 500px;
  
  }
  .cart_title{
   
    width: 100%;
  }
  .title{
    font-size: 25px;
    margin-top: 10px;
    margin-left: 15px;
  }
  .cart_quality{
    width: 95%;
    margin-top: 10px;
    margin-left: -10px;
  }
  .product_quality{
    width: 100%;
    margin-left: 25px;
    margin-top: 10px;
    /* margin-left: 10px; */
    font-size: 25px;
    color: #686666;
  }
  .product_price{
    width: 100%;
    margin-top: 10px;
    margin-left: 25px;
  }
  .price{
    margin-left: 5px; 
  }
  .product_title{
    width: 100%;
    margin-top: 10px;
    
  }
  .cart_delete{
    
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    text-align: center; 
  }
  .delete{
    
    width: 70%;
    background-color: #f56262;
    
    color: #000000;

  font-size: 50px;
  margin-top: 20px;
  margin-left: -130px;
   font-size: 70px;
   
  }

  
}

/* Responsive styles for medium devices (tablets) */
@media only screen and (min-width: 601px) and (max-width: 1024px) {
 

  /* Additional styles for medium devices */
}

/* Responsive styles for large devices (desktops) */
@media only screen and (min-width: 1025px) {
  body {
    font-size: 18px;
  }
}
`



