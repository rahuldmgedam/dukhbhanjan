// "use client";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [verifyText, setVerifyText] = useState("verify")
  const [openPassInput, setOpenPassInput] = useState(false)
  const [pinLoading, setPinLoading] = useState(false)
  const [changeEmail, setChangeEmail] = useState("")
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false)
  const [pinGenrated, setPinGenrated] = useState("")
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [password, setPassword] = useState("")
  const [repassword, setRePassword] = useState("")

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [countdown, setCountdown] = useState(60);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  const loginSubmit = (e) => {
    if (!email || !pass) {
      setError('This field is required.');
      return;
    }

    e.preventDefault()
    setIsLoading(true);
    const data = { email, pass }
    axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/user/login", data)
      .then(res => {
        setIsLoading(true)
        localStorage.setItem("token", res.data.token)
        toast({
          title: res.data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
         
        })
        if (res.data.token) {
          localStorage.setItem("firstname", res.data.username)
          location.state ? navigate(location.state, { replace: true }) : navigate("/")
        }
      }).catch((error) => {
        console.log(error)
        toast({
          title: 'Unable to Login try After Sometime',
          status: 'error',
          duration: 2000,
          isClosable: true,
        
        })

      }).finally(() => {
        setIsLoading(false)
      })
    setEmail("")
    setPass("")
    setError(false)
  }


  const handleChangeMessage = (e) => {
    setEmailError(false)
    setChangeEmail(e.target.value)
    setOpenPassInput(false)
    setVerifyText("verify")
  }

  const handleForgotMessage = async () => {

    if (!changeEmail) {
      toast({
        title: 'enter email address first',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
      setVerifyText("verify")
    } else if (changeEmail.includes("@")) {
      setPinLoading(true)
      const response = await axios.patch("https://outrageous-shoulder-pads-fly.cyclic.app/user/forgot-password", { changeEmail }, {

      })
      if (response.data.state) {
        toast({
          title: response.data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setPinGenrated(response.data.pincode)
        setPinLoading(false)
      } else {
        // console.log(response.data.msg)
        setPinLoading(false)
        toast({
          title: response.data.msg,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }

    }
    else {
      setPinLoading(false)
      setEmailError(true)
      setVerifyText("verify")
    }

  }

  const handlecloseModal = () => {
    onClose()
    setEnteredPin("")
    setPinGenrated("")
    setEmailError(false)
    setCountdown(60)
    setChangeEmail("")
    setPassword("")
    setRePassword("")
  }

  const handleVerifyPinCode = () => {
    // Log the entered pin code
    if (enteredPin.length === pinGenrated.length) {
      if (pinGenrated === enteredPin) {
        setVerifyText("verified")
        setOpenPassInput(true)
      }
      setOpenPassInput(true)
    } else {
      toast({
        title: 'please fill input feild',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })

    }


    // TODO: Add logic to verify the pin
  };


  const handleFinalCall = async () => {
    if (password === repassword) {
      const response = await axios.patch(`https://outrageous-shoulder-pads-fly.cyclic.app/user/verify-password/${enteredPin}`, { email: changeEmail, pass: password }, {

      })
      if (response.data.state) {
        toast({
          title: "password update success",
          description: 'Login Again',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        await setTimeout(() => {
          handlecloseModal()
        }, 1000)
      } else {
        toast({
          title: "unable to change password",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

    } else {
      toast({
        title: 'password not match',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }



  useEffect(() => {
    let timer;

    // Start countdown when pin is generated
    if (pinGenrated) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(timer);
          }
          return Math.max(0, prevCountdown - 1);
        });
      }, 1000);
    }

    // Clear the interval when the component is unmounted or modal is closed
    return () => clearInterval(timer);
  }, [isOpen, pinGenrated])

  const openModal = () => {
    setChangeEmail("")
    setPassword("")
    setRePassword("")
    onOpen()
    setOpenPassInput(false)
    setEnteredPin("")

  }

  return (
    <>

      {/* forgot logic code goes here  */}
      <Modal
       mt={20}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot password</ModalHeader>
          <ModalCloseButton onClick={handlecloseModal} />
          <ModalBody pb={6}>
            <FormControl isRequired>


              {pinGenrated ? <> <HStack>
                <PinInput type='alphanumeric' value={enteredPin} onChange={(value) => setEnteredPin(value)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>

                <Button colorScheme='whatsapp' onClick={handleVerifyPinCode}>{verifyText}</Button>
              </HStack>  <Text mt={3} color={countdown < 10 ? "red" : "green"} >Pin code valid for {countdown} seconds</Text></> : <FormControl>  <FormLabel >Email</FormLabel>
                <Flex>
                  <Input value={changeEmail} ref={initialRef} placeholder='Enter Your Email' onChange={handleChangeMessage} />
                  <Button colorScheme='blue' ml={3} onClick={handleForgotMessage}>
                    {pinLoading ? "please Wait..." : "Send"}
                  </Button>
                </Flex></FormControl>}
              {openPassInput && <> <FormControl>
                <FormLabel>Password</FormLabel>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} ref={initialRef} placeholder='Enter Password' />
              </FormControl>

                <FormControl mt={4}>
                  <FormLabel>ReEnter Password</FormLabel>
                  <Input value={repassword} onChange={(e) => setRePassword(e.target.value)} placeholder='Re enter password' />
                </FormControl> <Center>  <Button mt={5} p={"5px 50px"} colorScheme='green' variant='solid' onClick={handleFinalCall}>
                  Update
                </Button></Center></>}

              {emailError && <Alert status='error' width={"80%"} mt={2}>
                <AlertIcon />

                <AlertDescription>Enter Valid Email Address.</AlertDescription>
              </Alert>}

            </FormControl>

            <FormControl mt={4}>

            </FormControl>

          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* forgot logic code goes here  */}


      <div data-aos="flip-left">
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Log in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                HELLO AGAIN....
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email" isRequired isInvalid={!!error}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor={error ? 'red.300' : undefined}
                  />
                </FormControl>
                <FormControl id="password" isRequired isInvalid={!!error}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    borderColor={error ? 'red.300' : undefined}
                  />
                </FormControl>
                {error && (
                  <Box color="red.500" fontSize="sm" >
                    {error}
                  </Box>
                )}
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"yellow.400"} _hover={{ cursor: "pointer" }} onClick={openModal}>Forgot password?</Text>
                  </Stack>
                  {
                    isLoading ? <Button
                      isLoading
                      bg={"yellow.500"}
                      color={"white"}
                      _hover={{
                        bg: "yellow.500",
                      }}
                      onClick={loginSubmit}
                    >
                      Login
                    </Button> : <Button
                      bg={"yellow.400"}
                      color={"white"}
                      _hover={{
                        bg: "yellow.500",
                      }}
                      onClick={loginSubmit}
                    >
                      Login
                    </Button>
                  }

                </Stack>
                <Center>
                  <Flex>
                    <Text align={"center"} >
                      New User ? <Text ml={1} color={"blue"} as={"u"} _hover={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>Register Here</Text>
                    </Text>
                  </Flex>
                </Center>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </div>
    </>
  );
}
