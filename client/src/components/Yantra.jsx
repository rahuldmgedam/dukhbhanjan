import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Heading, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import styled from '@emotion/styled';
import YantraCart from './YantraCart';
import axios from 'axios';

const Yantra = () => {
  const location = useLocation();
const [isError, setIsError] = useState(false)
const [isLoading, setIsLoading] = useState(false)
const [products, setProducts] =useState([])
  useEffect(() => {
    const getProduct = () => {
      setIsLoading(true)
      axios.get("https://outrageous-shoulder-pads-fly.cyclic.app/yantra")
         .then((res) => {
          setProducts(res.data)
          setIsLoading(false)
         })
         .catch((err) => {
           console.log(err.message)
           setIsError(true)
           setIsLoading(false)
         })
   } 
   getProduct()
  }, [location.search]);

  return (
    <>
      {isError && <Heading mt={20} color={"white"} width={"40%"} m={"auto"}  bg={"red.600"} fontSize={"22px"} textAlign={"center"}>Unable to Fetch Product</Heading>}

      {isLoading ? <DIV>
        <Box padding='6' boxShadow='lg' bg='white'>
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
        </Box>
        <Box padding='6' boxShadow='lg' bg='white'>
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
        </Box>
        <Box padding='6' boxShadow='lg' bg='white'>
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
        </Box>
        <Box padding='6' boxShadow='lg' bg='white'>
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
        </Box>
      </DIV> : <Box  mt={20} display={['block', 'grid']} gridTemplateColumns="auto auto auto auto" gap="20px">
        {products.length > 0 &&
          products.map((el) => (
            <div key={el._id} style={{ marginBottom: '20px' }}>
              <YantraCart {...el} />
            </div>
          ))}
      </Box>
      }

    </>
  );
};

export default Yantra;



const DIV = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 30px;
padding: 40px;
  @media only screen and (min-width: 601px) and (max-width: 800px) {
    gap: 10px;
padding: 10px; 
grid-template-columns: repeat(2,1fr);      
}

@media only screen and (min-width: 400px) and (max-width: 600px) {
  gap: 10px;
padding: 5px;
grid-template-columns: repeat(1,1fr);
          
}

@media only screen and (min-width: 300px) and (max-width: 399px){
  width: 100%;
            display: grid;
            grid-template-columns: repeat(1,1fr);
}

@media screen and (max-width: 900px) and (min-width: 800px) {
  width: 100%;
            display: grid;
            grid-template-columns: repeat(3,1fr);

  }

`;
