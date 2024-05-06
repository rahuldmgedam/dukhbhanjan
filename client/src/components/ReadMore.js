// import {
//   Container,
//   SimpleGrid,
//   Image,
//   Flex,
//   Heading,
//   Text,
//   Stack,
//   StackDivider,
//   Icon,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import {
//   IoAnalyticsSharp,
//   IoLogoBitcoin,
//   IoSearchSharp,
// } from "react-icons/io5";

// export default function ReadMore() {
//   return (
//     <>
//       <div data-aos="zoom-in">
//         <Container maxW={"5xl"} py={12}>
//           <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
//             <Stack spacing={4}>
//               {/* <Text
//             textTransform={"uppercase"}
//             color={"blue.400"}
//             fontWeight={600}
//             fontSize={"sm"}
//             bg={useColorModeValue("blue.50", "blue.900")}
//             p={2}
//             alignSelf={"flex-start"}
//             rounded={"md"}
//           ></Text> */}
//               <Heading>About Sharabha Avatar</Heading>
//               <Text color={"gray.500"} fontSize={"md"}>
//                 In Puranic literature, Sharabha is linked with the god Shiva and
//                 takes form to suppress the fierce manifestations of Vishnu. The
//                 legend of Sharabha battling Narasimha, the man-lion incarnation
//                 of Vishnu, highlights the open rivalry between the followers of
//                 Vishnu (Vaishnava sect) and those of Shiva (Shaiva sect),
//                 revealing the intense debate aspect. The Shiva Purana depicts
//                 Sharabha as lion-faced, with matted hair, wings, eight feet, and
//                 a thousand arms. The Sharabha Upanishad presents Sharabha with
//                 two heads, two wings, eight lion legs with sharp claws, and a
//                 long tail.
//               </Text>
//               <Stack
//                 spacing={4}
//                 divider={
//                   <StackDivider
//                     borderColor={useColorModeValue("gray.100", "gray.700")}
//                   />
//                 }
//               >
//                 <Text color={"gray.500"} fontSize={"md"}>
//                   {" "}
//   The Kalika Purana describes Sharabha as black, with four feet
//   pointing downwards and four feet uplifted, possessing an
//   enormous body, a long face and nose, nails, eight legs, eight
//   tusks, a cluster of manes, and a long tail. It leaps high,
//   emitting a loud cry. The iconography of Sharabheshvaramurti
//   (Shiva as Sharabha) is precisely outlined in texts like
//   Kamikagama and Sritattvanidhi. In Kamikagama, Sharabha is
//   described as a bird with golden color, two uplifted wings, two
//   red eyes, four lion legs touching the ground, four legs with
//   claws upwards, and an animal tail. The upper part of the body
//   appears human with a lion's face wearing an ornamented crown,
//   and side tusks contribute to an overall frightening
//   appearance. The Sritattvanidhi prescribes the depiction of
//   Sharabheshvaramurti with thirty arms, holding various objects
//   symbolizing divine attributes. This form is revered for
//   bringing good fortune, healing diseases, and defeating
//   enemies. During the Chola dynasty's rule in Tamil Nadu, which
//   favored the Shaiva sect, the sectarian aspect became
//   prominent. This is evident from the four Sharabha images,
//   including the one at the Vikramsolishwaram temple near
//   Kumbakonam built by Vikrama Chola (1118–35), and others at
//   Darasuram and Kampahareshvarar temple, Thirubuvanam,
//   constructed by Chola ruler Kulottunga Chola III, where
//   Sharabha's image is housed in a separate shrine.
//                 </Text>
//               </Stack>
//             </Stack>
//             <Flex>
//               <Image
//                 rounded={"md"}
//                 alt={"feature image"}
//                 src={
//                   "https://upload.wikimedia.org/wikipedia/commons/e/ed/Munneswaram_Sharabha.jpg"
//                 }
//                 objectFit={"cover"}
//               />
//             </Flex>
//           </SimpleGrid>
//         </Container>
//       </div>
//     </>
//   );
// }
import * as React from "react";
import {
  Container,
  Heading,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Image,
  Skeleton,
  Box,
  Link,
} from "@chakra-ui/react";

const ReadMore = () => {
  return (
    <Container maxW="5xl" px={{ base: 6, md: 3 }} py={10}>
      <Stack
        direction={{ base: "column-reverse", md: "row" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {/* <Stack direction="column" spacing={6}>
          <Heading
            as="h3"
            size="lg"
            fontWeight="bold"
            textAlign="left"
            maxW={{ base: "100%", md: "480px" }}
          >
            About Sharabha Avatar
          </Heading>
          <Text
            color={useColorModeValue("gray.700", "gray.400")}
            fontSize="1.2rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="300"
            maxW={{ base: "100%", md: "470px" }}
          ></Text>
        </Stack> */}
        <Box ml={{ base: 0, md: 5 }}>
          <Image
            w="100%"
            h="100%"
            minW={{ base: "auto", md: "20rem" }}
            objectFit="cover"
            src="https://pbs.twimg.com/media/ERnabQzU0AIKkqC.jpg"
            rounded="md"
            fallback={<Skeleton />}
          />
          <Heading
            as="h3"
            size="lg"
            fontWeight="bold"
            textAlign="center"
            maxW={{ base: "100%", md: "480px" }}
          >
            About Sharabha Avatar
          </Heading>
        </Box>
      </Stack>

      <Text
        color={"gray.500"}
        fontSize={"md"}
        position={"relative"}
        top={"2rem"}
      >
        In Puranic literature, Sharabha is linked with the god Shiva and takes
        form to suppress the fierce manifestations of Vishnu. The legend of
        Sharabha battling Narasimha, the man-lion incarnation of Vishnu,
        highlights the open rivalry between the followers of Vishnu (Vaishnava
        sect) and those of Shiva (Shaiva sect), revealing the intense debate
        aspect. The Shiva Purana depicts Sharabha as lion-faced, with matted
        hair, wings, eight feet, and a thousand arms. The Sharabha Upanishad
        presents Sharabha with two heads, two wings, eight lion legs with sharp
        claws, and a long tail. The Kalika Purana describes Sharabha as black,
        with four feet pointing downwards and four feet uplifted, possessing an
        enormous body, a long face and nose, nails, eight legs, eight tusks, a
        cluster of manes, and a long tail. It leaps high, emitting a loud cry.
        The iconography of Sharabheshvaramurti (Shiva as Sharabha) is precisely
        outlined in texts like Kamikagama and Sritattvanidhi. In Kamikagama,
        Sharabha is described as a bird with golden color, two uplifted wings,
        two red eyes, four lion legs touching the ground, four legs with claws
        upwards, and an animal tail. The upper part of the body appears human
        with a lion's face wearing an ornamented crown, and side tusks
        contribute to an overall frightening appearance. The Sritattvanidhi
        prescribes the depiction of Sharabheshvaramurti with thirty arms,
        holding various objects symbolizing divine attributes. This form is
        revered for bringing good fortune, healing diseases, and defeating
        enemies. During the Chola dynasty's rule in Tamil Nadu, which favored
        the Shaiva sect, the sectarian aspect became prominent. This is evident
        from the four Sharabha images, including the one at the
        Vikramsolishwaram temple near Kumbakonam built by Vikrama Chola
        (1118–35), and others at Darasuram and Kampahareshvarar temple,
        Thirubuvanam, constructed by Chola ruler Kulottunga Chola III, where
        Sharabha's image is housed in a separate shrine.
      </Text>
    </Container>
  );
};

export default ReadMore;
