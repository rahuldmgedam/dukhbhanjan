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
        Dhukhbhanjan is dedicated to safeguarding user privacy on its platform.
        The privacy policy outlines the collection and use of personal
        information, emphasizing user consent. By accessing and using the
        Dhukhbhanjan website, users express their understanding and agreement with
        the terms of this policy. The information collected, including personal
        identification, contact details, and birth details, is used to create
        personalized user profiles. While certain details like phone numbers are
        mandatory for security, providing the date of birth is optional but aids
        in enhancing user experience. The website assures users that their
        information will not be sold or rented, and data deletion options are
        provided. The platform does not claim responsibility for users with weak
        mental health and reserves the right to share information with law
        enforcement authorities if necessary. The accuracy of astrologers'
        predictions and the reliability of items sold on the website are
        disclaimed. The privacy policy addresses the collection of both personal
        and non-personal identifiable information, detailing how it is used for
        personalized experiences, troubleshooting, and analysis. The website
        commits to security measures, though users are advised to take
        precautions. Dhukhbhanjan's usage of information includes providing
        personalized browsing experiences, improving services, and complying with
        legal obligations. Confidential information is protected unless required
        by law or in cases of imminent threats. The privacy policy emphasizes that
        the website is not designed for children under 13 and provides contact
        information for grievance resolution via email at{" "}
        <a href="mailto:dhukbhanjan2023@gmail.com">dhukbhanjan2023@gmail.com</a>.
      </>
    ),
  };
  
  const Policy = () => {
    const quoteColor = useColorModeValue("gray.600", "gray.300");
  
    return (
        <Box  w='100%'
        h='100%'
        bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)'>
      <Container maxW="3xl" p={5}>
        <Center>
          <Text fontSize={"25px"} mb="10px" fontWeight={"600"}>
            Privacy & Policy
          </Text>
        </Center>
        <VStack spacing={3}>
          <Icon as={FaQuoteRight} w={8} h={8} color={quoteColor} zIndex={5} />
          <Text fontSize={"17px"} p={5} color={quoteColor} zIndex={5}>
            {testimonial.content}
          </Text>
        </VStack>
      </Container>
      </Box>
    );
  };
  
  export default Policy;