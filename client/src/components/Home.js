"use client";
import ReactTyped from "react-typed";
import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import Testimonials from "./Testimonials";
import Img from "../imgs/devi2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { LiaWhatsapp } from "react-icons/lia";
import styled from "@emotion/styled";
export default function Home() {
 const navigate = useNavigate()
  const location = useLocation();
  
  const today = new Date();
const todayDate = today.toISOString().split('T')[0];


const width = window.innerWidth -27;
  return (
    <DIV>
   {todayDate === '2024-01-22' ? (
  <Confetti
    width={width}
    height={1500}
    numberOfPieces={300}
    recycle={true}
  />
) : (
  ''
)}

      {/* <Box  width={"100%"}  border={"1px solid red"} display={"flex"} justifyContent={"flex-end"}> */}
      <Badge
        // border={"1px solid blue"}
        colorScheme="yellow"
        position={"sticky"}
        left={"95%"}
        top={"30%"}
        p={2}
        zIndex={99}
        transition={"ease-in 2s"}
        animation="scale 2s infinite ease-in"
        cursor={"pointer"}
        _hover={{ animation: "paused" }}
        as={Link}
        to="/mantra"
        width={"fit-content"}
        boxShadow={
          "0 4px 6px rgba(255, 165, 0, 0.1), 0 6px 12px rgba(255, 165, 0, 0.2), 0 4px 6px rgba(255, 255, 0, 0.1), 0 6px 12px rgba(255, 255, 0, 0.2)"
        }
        display={location.pathname == "/mantra" ? "none" : "block"}
      >
        Click here for Mantras
      </Badge>
      <Button
      className="rainbow-btn"
        // border={"1px solid blue"}
        // colorScheme="yellow"
        position={"sticky"}
        left={"94%"}
        top={"38%"}
        // p={2}
        // zIndex={99}
        // transition={"ease-in 2s"}
        // animation="scale 2s infinite ease-in"
        // cursor={"pointer"}
        // _hover={{ animation: "paused" }}
        as={Link}
       
        to="/kundali"
        // width={"fit-content"}
        // boxShadow={
        //   "0 4px 6px rgba(255, 165, 0, 0.1), 0 6px 12px rgba(255, 165, 0, 0.2), 0 4px 6px rgba(255, 255, 0, 0.1), 0 6px 12px rgba(255, 255, 0, 0.2)"
        // }
        display={location.pathname == "/kudali" ? "none" : "block"}
      >
      <span>Ask For Your Kundali</span>  
      </Button>
      <a href="https://api.whatsapp.com/send?phone=7276301985" target="_blank">
        <Box
          colorScheme="whatsapp"
          position={"sticky"}
          left={"95%"}
          top={"48%"}
          p={1}
   bg={"green"}
   borderRadius={"50%"}
          zIndex={99}
          transition={"ease-in 2s"}
          animation="scale 2s infinite ease-in"
          cursor={"pointer"}
          _hover={{ animation: "paused" }}
          width={"fit-content"}
          // transform="scaleX(-1)"
        >
          <LiaWhatsapp color="white" size={45}/>
    
        </Box>
      </a>
      {/* </Box> */}

      <Stack  minH={"70vh"}  direction={{ base: "column", md: "row" }}  mt={{base:"-80px"}}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "yellow.400",
                  zIndex: -1,
                }}
              >
                Welcome to{" "}
                <ReactTyped strings={["Dhukh Bhanjan "]} typeSpeed={100} loop />
              </Text>
              <br />{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              In Puranic literature, Sharabha is linked with the deity Shiva and
              manifests to quell the intense forms of Vishnu. The myth of
              Sharabha engaging in combat with Narasimha, the man-lion
              incarnation of Vishnu, highlights the evident rivalry between the
              followers of Vishnu (Vaishnava sect) and those of Shiva (Shaiva
              sect), revealing a contentious aspect in the religious discourse.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"yellow.400"}
                color={"white"}
                _hover={{
                  bg: "yellow.500",
                }}
              >
                <Link to="readmore">Read More</Link>
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image alt={"Login Image"} objectFit={"cover"} src={Img} />
        </Flex>
      </Stack>
      <Testimonials />
    </DIV>
  );
}

const DIV = styled.div`

.rainbow-btn {
  border:none;
    /* margin: 50px auto; */
    width: fit-content;
    text-align: center;
    /* position: relative; */
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    /* box-sizing: border-box; */
    /* display: block; */
    z-index: 99;
    overflow: hidden;
    padding: 8px;
    height: 40px; 

}

.rainbow-btn:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(115deg,#4fcf70,#fad648,#a767e5,#12bcfe,#44ce7b);
    background-size: 50% 100%
}
.rainbow-btn span {
  margin-top: -10px;
    position: relative;
    font-size:13px;
    z-index: 2;
    padding: .875rem 0;
    font-size: 14px;
    text-decoration: none;
    align-items: center;
   color: black;
    border-radius: 3px;
    display: block;
    justify-content: center;
    box-sizing: border-box;
    height: 70%;
   text-align: center;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
}
.rainbow-btn:focus:before,
.rainbow-btn:before {
    animation: rainbow-btn .75s linear infinite
}

@keyframes rainbow-btn {
    to {
        transform: translateX(-50%)
    }
}
`