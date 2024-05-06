import React from "react";
import {
  Box,
  Heading,
  Flex,
  Avatar,
  Link,
  VStack,
  IconButton,
  Divider,
  Fade,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import image from "../src/imgs/baba1.jpeg"
const SocialMediaLink = ({ url, label, type, icon }) => (
  <IconButton
    as={Link}
    isExternal
    href={url}
    aria-label={label}
    colorScheme={type}
    icon={icon}
    rounded="full"
    variant="ghost"
    size="lg"
    isRound
  />
);

const Cardmain = ({ author }) => {
  return (
    <VStack spacing={5}>
      <motion.div whileHover={{ y: -5, scale: 1.1 }}>
        {/* Use motion.div here */}
        <Box _hover={{ boxShadow: "lg" }} >
          <Avatar size='2xl' name='Segun Adebayo' src={image}
          />
        </Box>
      </motion.div>
      <Heading
        mt={"10px"}
        fontSize="xl"
        fontFamily="body"
        textTransform="capitalize"
        noOfLines={2}
      >
        {author.name}
      </Heading>

      <Fade in>
        {/* <Text
          color="gray.500"
          fontSize="lg"
          noOfLines={{ base: 3, md: 4 }}
          _groupHover={{ display: "block" }}
          display="none"
        >
          I'm a Founder of Dukh Bhanjan
        </Text> */}
      </Fade>
      <Divider />
      <Flex alignItems="center" justify="center" w="100%">
        <Box textAlign="center">
          {author.accounts.map((sc, index) => (
            <SocialMediaLink key={index} {...sc} />
          ))}
        </Box>
      </Flex>
    </VStack>
  );
};

export default Cardmain;
