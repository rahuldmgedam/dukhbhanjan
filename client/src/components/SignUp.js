import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token")

  // State variables to track input validation status
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passValid, setPassValid] = useState(true);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPass(newPassword);
    setError('');
    setPassValid(true);
  };

  const getValidationColor = (condition) => (condition ? 'green' : 'black');



  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic for required fields
    if (!firstName || !lastName || !email || !pass) {
      setFirstNameValid(!!firstName);
      setLastNameValid(!!lastName);
      setEmailValid(!!email);
      setPassValid(!!pass);
      return;
    }

    // Other validation logic...
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please enter a valid email address.');
      setEmailValid(false);
      return;
    }

    // Proceed with user registration logic
    setIsLoading(true);
    let data = { firstName, lastName, email, pass };
    axios
      .post("http://localhost:5000/user/register", data)
      .then((res) => {
        setError(false);
        if (res.data.msg) {
          localStorage.setItem("firstname", firstName);
          toast({
            title: 'Account created successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPass("");
      });
  };

  return (
    <div data-aos="flip-right">
      <Flex mt={5}
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              SIGN UP
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              AND GET RID OF YOUR PROBLEMS
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                        setFirstNameValid(true);
                      }}
                      borderColor={firstNameValid ? "" : "red"}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastname(e.target.value);
                        setLastNameValid(true);
                      }}
                      borderColor={lastNameValid ? "" : "red"}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailValid(true);
                  }}
                  borderColor={emailValid ? "" : "red"}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={pass}
                    onChange={handlePasswordChange}
                    borderColor={passValid ? getValidationColor(pass.length >= 8) : "red"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                {pass && (
                  <VStack align="start" spacing={2} mb="4">
                    <Text>
                      Password Strength:{' '}
                      <span style={{ color: getValidationColor(pass.length >= 8) }}>Length</span> |{' '}
                      <span style={{ color: getValidationColor(/[A-Z]/.test(pass)) }}>Uppercase</span> |{' '}
                      <span style={{ color: getValidationColor(/[a-z]/.test(pass)) }}>Lowercase</span> |{' '}
                      <span style={{ color: getValidationColor(/\d/.test(pass)) }}>Number</span> |{' '}
                      <span style={{ color: getValidationColor(/[!@#$%^&*(),.?":{}|<>]/.test(pass)) }}>
                        Special Character
                      </span>
                    </Text>
                  </VStack>
                )}

                {error && (
                  <Alert status="error" mb="4">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                {isLoading ? (
                  <Button
                    isLoading
                    bg={"yellow.500"}
                    color={"white"}
                    _hover={{
                      bg: "yellow.500",
                    }}
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    bg={"yellow.400"}
                    color={"white"}
                    _hover={{
                      bg: "yellow.500",
                    }}
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                )}
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link style={{color:"blue", textDecoration:"underline"}} to="/login">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
