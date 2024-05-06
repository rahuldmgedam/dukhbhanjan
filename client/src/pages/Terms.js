import {
    Container,
    Text,
    VStack,
    Box,
    Icon,
    useColorModeValue,
    Center,
  } from "@chakra-ui/react";
  import { FaQuoteRight } from "react-icons/fa";
  
  const testimonial = {
    content: (
      <>
        The Terms of Usage outlined above govern the use of content and services
        provided by Dhukhbhanjan through www.dhukhbhanjan.com. Users are required
        to consent to these terms when accessing and using the website. The
        platform offers a range of astrological services, including free and paid
        options, accessible through registration. Users must provide accurate
        information during registration, and the website emphasizes the importance
        of maintaining the confidentiality of account information. Dhukhbhanjan,
        as an internet-based portal, provides astrological content, reports, and
        consultations. The Terms of Usage cover aspects such as user eligibility,
        account creation, and the feature "Call Us," which involves
        telecommunication services. The website content is private property, and
        users are expected to comply with guidelines to avoid suspension or
        termination. The Terms also address privacy policy, breach, and
        termination scenarios. The section on delivery, cancellation, and refund
        specifies conditions under which refunds may be considered. Overall, users
        are advised to carefully review and comply with these terms for a seamless
        experience on the Dhukhbhanjan platform.
      </>
    ),
  };
  
  const Terms = () => {
    const quoteColor = useColorModeValue("gray.600", "gray.300");
  
    return (
      <Box  w='100%'
      h='105%'
      bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)'>
 

      <Container maxW="2xl" p={5}>
        <Center>
          <Text fontSize={"25px"} mb="10px" fontWeight={"600"}>
            Terms & Conditions
          </Text>
        </Center>
        {/* <DottedBox quoteColor={quoteColor} /> */}
        <VStack spacing={3}>
          <Icon as={FaQuoteRight} w={8} h={8} color={quoteColor} zIndex={5} />
          <Text p={5} color={quoteColor} zIndex={5}>
            {testimonial.content}
          </Text>
        </VStack>
      </Container>
      </Box>
    );
  };
  
  export default Terms;