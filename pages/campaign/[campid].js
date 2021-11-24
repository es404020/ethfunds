import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Campaign from "../../ethereum/campaign";
import toast from "react-hot-toast";
import LoadingOverlay from "react-loading-overlay";
import web3 from "../../ethereum/web3";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  InputRightAddon,
  useColorModeValue,
} from "@chakra-ui/react";
import Mainlayout from "../../layouts/mainlayouts";
import { Formik } from "formik";
export default function CampDetails({ campid }) {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const [state, setstate] = useState("");
  const [summary, setsummary] = useState({
    minimumContribution: "",
    balance: 0,
    requestCount: 0,
    approversCount: 0,
    manger: "",
  });
  var campaign = Campaign(campid);

  useEffect(async () => {
    const summary = await campaign.methods.getSummary().call();
    const desc = await campaign.methods.description().call();

    setstate(desc);
    setsummary({
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manger: summary[4],
    });
    return () => {
      setsummary({}); // This worked for me
    };
  }, [state,loading]);

  const onSubmit = async (value, resetForm) => {
  
    setloading(true);

    try {
     const accounts = await web3.eth.getAccounts();
    await campaign.methods.contribute().send({
      from: accounts[0],

      value: web3.utils.toWei(value.contribute.toString(), "ether"),
    })
      toast.success("Transaction was successful ");

   
 
    } catch (err) {
      toast.error(err.message);

      console.log(err);
    } finally {
      setloading(false);
      resetForm();
    }
  };


  return (
    // <div>
    //     {campid}
    // </div>

    <>
        <LoadingOverlay
      active={loading}
      text="Processing transcation this can take up to 15 seconds to finalize."
    >
      <Box height="100vh" overflowX="hidden">
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={2}
        >
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            p={10}
            fontWeight="semibold"
            fontSize="large"
          >
            <Text
              bgGradient="linear(to-l, #000000,#02d395)"
              bgClip="text"
              fontSize="5xl"
              fontWeight="extrabold"
            >
              {state}
            </Text>

            <Text
              fontSize={{ base: "sm", md: "2xl" }}
              mb={{ base: 5, md: null }}
            >
              You can find all the information about this project{" "}
            </Text>

            <Text
              overflowWrap="break-word"
              display={{ base: "block", md: "none" }}
              fontSize={{ base: "sm", md: "2xl" }}
              mb={{ base: 5, md: null }}
            >
              MangerID: {summary.manger.toString().slice(0, 10)}...{" "}
              {summary.manger.toString().slice(10, 20)}
            </Text>

            <Text
              display={{ base: "none", md: "block" }}
              fontSize={{ base: "sm", md: "sm" }}
              mb={{ base: 5, md: null }}
            >
              Manger: {summary.manger}
            </Text>

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Flex
                p={{ base: 3, md: 10 }}
                h="30vh"
                justifyContent="center"
                bg="#FDECD4"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
                flexWrap="wrap"
                overflowX="auto"

              
              >
                <Text fontSize="6xl" isTruncated fontWeight="extrabold"  noOfLines={2}>
               { web3.utils.fromWei(summary.balance.toString(), "ether")}
                </Text>
                <Text>Campaign Balance</Text>
              </Flex>
              <Flex
                p={{ base: 3, md: 10 }}
                h="30vh"
                justifyContent="center"
                bg="#FDE4F8"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
                
             
              >
                <Text fontSize="6xl" fontWeight="extrabold">
                  { summary.minimumContribution}
                </Text>
                <Text>Minimun Contribitions</Text>
              </Flex>

              <Flex
                p={{ base: 3, md: 10 }}
                h="30vh"
                justifyContent="center"
                bg="#B3E0E8"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="6xl" fontWeight="extrabold">
                  {summary.requestCount}
                </Text>
                <Text>Request</Text>
              </Flex>

              <Flex
                p={{ base: 3, md: 10 }}
                h="30vh"
                justifyContent="center"
                bg="#ECEEF9"
                flexDirection="column"
                borderRadius="md"
                boxShadow="md"
              >
                <Text fontSize="6xl" fontWeight="extrabold">
                  {summary.approversCount}
                </Text>
                <Text>contributors</Text>
              </Flex>
            </Grid>
            <Flex
              mt={5}
              flexDirection="column"
              justifyContent="space-evenly"
              width={{ base: "100%", md: "90%" }}
            >
              <Button colorScheme="teal" mb={5} variant="solid">
                View Request
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                display={{ base: "block", md: "none" }}
              >
                Contribute
              </Button>
            </Flex>
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <Flex
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Flex flexDirection="row">
                <Flex
                  flexDirection="column"
                  width="100%"
                  justifyContent="space-evenly"
                >
                  <Text fontSize="md" color="#01048A" fontWeight="bold">
                    Contribute
                  </Text>
                  <Text fontSize="small" fontWeight="light">
                    Support this project by contributing to this project.Hope
                    you have your money
                  </Text>
                
                    <Formik
                      initialValues={{
                        contribute: 0,
                       
                      }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.contribute) {
                          errors.contribute = "required value";
                        }
                       
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        onSubmit(values, resetForm);
                        setSubmitting(false);
                      }}
                    >
                      {({
                        values,
                        errors,  
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <InputGroup size="md" mt={3}>
                            <Input
                              type="text"
                              isInvalid={
                                errors.contribute && touched.contribute && errors.contribute
                                  ? true
                                  : false
                              }
                              errorBorderColor="crimson"
                              type="text"
                              name="contribute"
                              onChange={handleChange}
                              onBlur={handleBlur}
                             
                              placeholder={` minimum contribution of ${summary.minimumContribution}`}
                            />

                            <InputRightAddon>ether</InputRightAddon>
                          </InputGroup>

                          <Text fontSize="sm" color="red.300">
                              {" "}
                              {errors.contribute && touched.contribute && errors.contribute}
                            </Text>
                            <Button
                                type="submit"
                            isLoading={loading}
                            loadingText="Submitting"
                            disabled={isSubmitting}mt={5} bg="teal" borderRadius={1} color="white" width="100%">
                    support
                  </Button>

                          {/* <Button
                            isLoading={loading}
                            loadingText="Submitting"
                            disabled={isSubmitting}
                            color="white"
                            bg="#01048A"
                            type="submit"
                            colorScheme="blue"
                            mr={3}
                          >
                            Create
                          </Button> */}
                        </form>
                      )}
                    </Formik>
                 
                
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      </Box>
      </LoadingOverlay>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { campid } = ctx.query;

  return {
    props: {
      campid,
    },
    //revalidate: 10,
  };
}
