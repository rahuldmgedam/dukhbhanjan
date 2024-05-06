import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Container>
      <Box mt={10}>
        <Stack spacing={4}>
          {step === 1 && (
            <>
              <FormControl>
                <FormLabel>Shipping Information</FormLabel>
                {/* Your shipping information form goes here */}
                <Input placeholder="Address" />
              </FormControl>
              <Button onClick={nextStep}>Next</Button>
            </>
          )}

          {step === 2 && (
            <>
              <FormControl>
                <FormLabel>Payment Details</FormLabel>
                {/* Your payment details form goes here */}
                <Input placeholder="Credit Card Number" />
              </FormControl>
              <Button onClick={prevStep}>Previous</Button>
              <Button onClick={nextStep}>Next</Button>
            </>
          )}

          {step === 3 && (
            <>
              <Box>
                <h2>Step 3: Review and Confirm</h2>
                {/* Display a summary of the user's input for review */}
              </Box>
              <Button onClick={prevStep}>Previous</Button>
              <Button colorScheme="green">Confirm Payment</Button>
            </>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default MultiStepForm;
