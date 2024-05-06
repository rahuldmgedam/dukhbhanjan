import styled from '@emotion/styled'
import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import sun from "../imgs/sun.png"

const Loading = () => {
  return (
    <DIV>
      <Box className="rotate-container">
        <Image
          className="rotate-image"
          borderRadius='full'
          boxSize='150px'
          src={sun}
          alt='Dan Abramov'
        />
        <Text mt={2} ml={7} fontSize={"23px"}>Loading...</Text>
      </Box>

    </DIV>
  )
}

export default Loading

const DIV = styled.div`
 
  height: 100vh;
  /* border: 1px solid red; */
  /* position: absolute; */
.rotate-container{
position: absolute;
top: 35%;
left: 45%;
}
/* nav log css rortae start */
@media only screen and (max-width: 600px) {
 
 
  .rotate-container{
position: absolute;
top: 35%;
left: 30%;
}
.css-p23alj{
  margin-left: 20px !important;
  font-size: 30px !important;
}
/* .loading{
  margin-left: 15px;
} */
 
 


 /* Additional styles for small devices */
}


/* Define a CSS animation named "rotate" */
@keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* Apply the "rotate" animation to the image */
  .rotate-image {
  
    /* Apply the animation */
    animation: rotate 25s linear infinite; /* Rotate for 5 seconds, linear timing, infinite repetitions */
  }
  
  /* nav log css rortae end */

`
