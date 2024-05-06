import {
  Box,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useDisclosure,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState("");
  const [exist, setExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendId, setSendId] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = React.useRef();
  const [render, setRender] = useState(false);
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const steps = [
    { title: "Ordered", description: singleProduct.orderDateTime },
    { title: "Dispatch", description: singleProduct.dispatchDate },
    { title: "Delivered order", description: singleProduct.deliveredDate},
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const updaterFun = () => {
    setRender((prev) => !prev);
  };

  const handleCancelOrder = (UserId) => {
    axios
      .patch(`https://outrageous-shoulder-pads-fly.cyclic.app/order/cancel/${sendId}`, { UserId: UserId })
      .then((res) => {
        toast({
          title: "Order Canceled successfully.",
          status: "error",
          duration: 3000,
          isClosable: true,
         
        });
        updaterFun();
      })
      .catch((error) => {
        console.log(error.message);
      });
    onClose();
    setSendId("");
  };

  const initialRender = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://outrageous-shoulder-pads-fly.cyclic.app/order", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.state) {
        setOrderData(res.data.order);
        setLoading(false);
      } else {
        setExist(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.msg);
    }
  };

  const handleOpenConfirm = (id) => {
    setSendId(id);
    onOpen();
  };

  const onOpen1 = async (id) => {
    setModalOpen(true);

    try {
      const found = orderData.filter((item) => item._id === id);
      setSingleProduct(found[0]);

      const status = found[0].status;
      const counters =
        status === "Ordered"
          ? 1
          : status === "dispatch"
          ? 2
          : status === "delivered"
          ? 3
          : 0;

      setActiveStep(counters);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose1 = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      initialRender();
    }
  }, [render]);

  return (
    <>
      {error ? (
        <Heading
          color={"white"}
          width={"40%"}
          m={"auto"}
          mt={10}
          bg={"red.600"}
          fontSize={"22px"}
          textAlign={"center"}
        >
          Unable to fetch data
        </Heading>
      ) : (
        <Box mt={20}>
          <Box  borderLeft="10px solid green" borderRadius={5} margin={5}>
            <Heading fontSize={["20px", "30px", "30px", "30px"]} p={5}>
              {" "}
              My Order Summary{" "}
            </Heading>
          </Box>

          {loading && (
            <DIV>
              {[...Array(4)].map((_, index) => (
                <Box
                  key={index}
                  padding="6"
                  textAlign={"center"}
                  boxShadow="lg"
                  bg="white"
                >
                  <Spinner size="lg" color="red.500" />
                </Box>
              ))}
            </DIV>
          )}

          {exist && (
            <Box position={"relative"} top={"50%"} left={"50%"}>
              <Text as={"b"}>No Order Placed Yet</Text>
            </Box>
          )}

          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={6}
            padding={5}
            justifyContent="center"
          >
            {orderData.map((item, index) => (
              <Box key={index}>
                {!loading && (
                  <GridItem
                    w={["100%", "100%", "95%", "85%"]}
                    h="auto"
                    p={5}
                    borderRadius={3}
                    boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
                  >
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                      mt={20}
                    >
                      <AlertDialogOverlay
                        bg={"transparent"}
                        backdropFilter={"blur(10px)"}
                        mt={30}
                      >
                        <AlertDialogContent >
                          <AlertDialogHeader fontSize="lg" fontWeight="bold" mt={30}>
                            Cancel Order
                          </AlertDialogHeader>
                          <AlertDialogBody>
                            Are you sure? You want to cancel order
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              close
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => handleCancelOrder(item.UserId)}
                              ml={3}
                            >
                              Order Cancel
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>

                    <Image
                      boxSize="150px"
                      objectFit="cover"
                      src={item.image}
                      alt={item.title}
                      width={["55%", "50%", "50%", "50%"]}
                    />

                    <Box display="flex">
                      <Text as="b">Name : </Text>
                      <Text> {item.title}</Text>
                    </Box>
                    <Box display="flex">
                      <Text as="b">Price : </Text>
                      <Text> {item.price}</Text>
                    </Box>
                    <Box display="flex">
                      <Text as="b">Quality : </Text>
                      <Text>{item.quality}</Text>
                    </Box>
                    <Box display="flex">
                      <Text as="b">Quantity : </Text>
                      <Text> {item.quantity}</Text>
                    </Box>
                    {item.cancel === "canceled" &&   <Box display="flex">
                      <Text as="b">Order : </Text>
                      
                        <Badge
                          fontFamily={"initial"}
                          variant="solid"
                          colorScheme="red"
                        >
                          {item.cancel}
                        </Badge>
                    </Box>
                      }

              {item.cancel !== "canceled" && <Box display="flex" mt={2}>
                      <Text as="b">Order Status : </Text>

                      <Badge
                        fontFamily={"initial"}
                        variant="solid"
                        colorScheme="green"
                      >
                        {item.status}
                      </Badge>
                    </Box>}      

                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mt={4}
                    >
                      <Button
                        onClick={() => handleOpenConfirm(item._id)}
                        colorScheme="red"
                        isDisabled={
                          item.cancel === "canceled" ||
                          item.status === "dispatch" ||
                          item.status === "delivered"
                        }
                      >
                        Cancel order
                      </Button>
                      {item.cancel !== "canceled" && (
                        <Button
                          colorScheme="yellow"
                          key={index}
                          onClick={() => onOpen1(item._id)}
                          variant="outline"
                        >
                          Track
                        </Button>
                      )}

                      <Modal  isOpen={isModalOpen} size="xl" onClose={onClose1}>
                        <ModalOverlay
                          bg={"transparent"}
                          backdropFilter={"blur(10px)"}
                       
                        />
                        <ModalContent mt={100} >
                          <ModalHeader>
                            <Box display={"flex"}>
                              <Image
                                borderRadius="full"
                                boxSize="80px"
                                border="1px solid gray"
                                src={singleProduct.image}
                                alt="Product"
                              />
                              <Text ml={2}>
                                {singleProduct.title}
                              </Text>
                            </Box>
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Text fontWeight="bold" mb="1rem">
                              Your Order delivered Process
                            </Text>
                          </ModalBody>

                          <Stepper index={activeStep} p={2} >
                            {steps.map((step, index) => (
                              <Step key={index}>
                                <StepIndicator>
                                  <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                  />
                                </StepIndicator>

                                <Box flexShrink="0">
                                  <StepTitle>{step.title}</StepTitle>
                                  {singleProduct.title && (
                                    <StepDescription color="green">
                                      {step.description?.slice(0, 10)}
                                    </StepDescription>
                                  )}
                                </Box>

                                <StepSeparator />
                              </Step>
                            ))}
                          </Stepper>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              mr={3}
                              onClick={onClose1}
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Box>
                  </GridItem>
                )}
              </Box>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Orders;

const DIV = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px;
  

  @media only screen and (min-width: 601px) and (max-width: 800px) {
    gap: 10px;
    padding: 10px;
    grid-template-columns: repeat(2, 1fr);
   
  }

  @media only screen and (min-width: 400px) and (max-width: 600px) {
    gap: 10px;
    padding: 5px;
    grid-template-columns: repeat(1, 1fr);
    
  }

  @media only screen and (min-width: 300px) and (max-width: 399px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
 
`;
