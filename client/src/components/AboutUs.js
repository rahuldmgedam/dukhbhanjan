import React from "react";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Link,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  VStack,
  Box,
  Avatar,
  Divider,
  Fade,
  IconButton,
} from "@chakra-ui/react";
import astro from "../imgs/astro.jpg";
import { RiGuideFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { CgCommunity } from "react-icons/cg";
import { motion } from "framer-motion";
import image from "../imgs/baba.jpg"
import image1 from "../imgs/CEO1.jpeg"
const Feature = ({ text, icon, iconBg }) => {

  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};


const AboutUs = () => {
  const author = [{
    name: "श्री स्वामी  ब्रिजेशवरानंदजी महाराज",
    image: `${image}`,
  },
  {
    name: " CEO : उमांशू जांगिड़",
    image: `${image1}`,
    accounts: [
      {
        label: "Instagram Account",
        type: "pink",
      },
      {
        label: "Twitter Account",
        type: "twitter",
      },
      {
        label: "Facebook Account",
        type: "blue",
      },
      // Add more social media accounts as needed
    ],
  }];




  return (
    <div data-aos="flip-left">
      <Container mt={10} maxW={"7xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"white"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("yellow.400", "yellow.400")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              About Us
            </Text>
            <Heading>Who we are ?</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              जैसे की हमारी वेबसाइट के नाम से ही आपको ज्ञात होगा कि दु:खो का निवारण या उसे दूर करने के समाधान के बारे में आपको बताना। हमारे गुरुदेव श्री स्वामी  ब्रिजेशवरानंदजी जो कि व्यावहारिक पंडित हैं और भगवान शिव के शरब अवतार के उपासक और साधक हैं जो आपको इस संसार में जीवन जीने की प्रेरणा और सरल पूजा विधि का ज्ञान देना चाहते हैं। जिससे आप अपने जीवन के तीनो प्रकार के तापो जिसे शांक्य शास्त्र में आध्यात्मिक, आदिभौतिक और आदिदैविक बताया गया है।

              आध्यात्मिक दुःख के अन्तर्गर्त व्याधि रोग, शारीरिक रोग, काम, क्रोध, लोभ,मानसिक दुःख आदि है।

              आधिभौतिक दु:ख वह है जो शावर जंगम, पशु, पक्षी, सांप, मच्छर अथवा भूतो के द्वारा हमें पहुंचाए जाते हैं।

              आदिदैविक दु:ख वह है जो देवताओ अर्थात् प्रकृति की शक्तियों के द्वारा हमें पहुंचता है जैसे आँधी, तूफ़ान, वर्षा, वज्रपात शीत्, ताप इत्यादि। शांख्य शास्त्र दुःख को रजो गुण का कार्य या चित का धर्म मानता है, हमारी विशेष प्रकार की  शक्तिशाली पूजा व मंत्रो द्वारा हम आपके तीनो प्रकार के दु:खो को ठीक से समझ के उसका निवारण भगवान शिव व मां शक्ति के आशीर्वाद से पूरा करने का प्रयास करेंगे।
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              {" "}
              <Text
                textTransform={"uppercase"}
                color={"white"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("yellow.400", "yellow.400")}
                p={2}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                Why Choose Dhukh Bhanjan?
              </Text>
              <Feature
                icon={
                  <Icon as={RiGuideFill} color={"yellow.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("yellow.100", "yellow.900")}
                text={"Expert Guidance"}
              />
              <Feature
                icon={
                  <Icon as={FaShoppingCart} color={"green.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Quality Workship Items"}
              />
              <Feature
                icon={
                  <Icon as={CgCommunity} color={"purple.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Community Connection"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              mt={"30px"}
              height={{ base: "350px", md: "500px" }}
              rounded={"md"}
              alt={"feature image"}
              src={astro}
              objectFit={"cover"}
              borderRadius={"50px"}
            />
          </Flex>
          {author.map((author) => (
            <VStack boxShadow="lg" spacing={5}>
              <motion.div>
                {/* Use motion.div here */}
                <Box mt={1} cursor={"pointer"}  borderRadius={10}>  
                <Image
 borderRadius={10}
 
  objectFit={"cover"}
  boxSize='250px'
  src={author.image}
  alt='Dan Abramov'
/>
                  {/* <Avatar size='2xl' name='Segun Adebayo' src={author.image} /> */}
                </Box>
              </motion.div>
              <Heading
                mt={"10px"}
                fontSize="xl"
                fontFamily="body"
                textTransform="capitalize"
                noOfLines={2}
              
                padding={2}
              >
                {author.name}
              </Heading>
              <Flex alignItems="center" justify="center" w="100%">

              </Flex>
            </VStack>
          ))}
          <Box>

          </Box>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default AboutUs;
