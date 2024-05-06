import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/productReducer/action';
import { Box, Heading, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import GemstonesCart from './GemstonesCart';
import styled from '@emotion/styled';

const Gemstones = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products, isError, isLoading } = useSelector((store) => store.productReducer);

  useEffect(() => {
    dispatch(getProduct());
  }, [location.search]);

  return (
    <Box mt={10}>
      {isError && <Heading color={"white"} width={"40%"} m={"auto"} mt={20} bg={"red.600"} fontSize={"22px"} textAlign={"center"}>Unable to Fetch Product</Heading>}

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
      </DIV> : <Box mt={20}  display={['block', 'grid']} gridTemplateColumns="auto auto auto auto" gap="20px">
        {products.length > 0 &&
          products.map((el) => (
            <div key={el._id} style={{ marginBottom: '20px' }}>
              <GemstonesCart {...el} />
            </div>
          ))}
      </Box>
      }

    </Box>
  );
};

export default Gemstones;



const DIV = styled.div`
  
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
