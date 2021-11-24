import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Campaign from "../../ethereum/campaign";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import Mainlayout from "../../layouts/mainlayouts";
export default function CampDetails({campid}) {
  const router = useRouter();

  const [state, setstate] = useState("");
  const [summary, setsummary] = useState("");
  const campaign = Campaign(campid);

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
  }, [state]);

  return (
    // <div>
    //     {campid}
    // </div>

    <>
      <Box
     
  
        height="100vh"
        overflowX="hidden"
      >

          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={2}
          >
            <Flex
            
              flexDirection="column"
              justifyContent="space-between"
              p= {10}
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

              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Flex
                  p={{ base: 3, md: 10 }}
                
                  h="30vh"
                  justifyContent="center"
                  bg="#FDECD4"
                  flexDirection="column"
                  borderRadius="md"
                  boxShadow="md"
                >
                  <Text fontSize="6xl" fontWeight="extrabold">
                    {summary.balance}
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
                    {summary.minimumContribution}
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
          
          
            <Box
             
             
              bg="blue.500"
              display={{ base: "none", md: "flex" }}
            />
          </Grid>
        </Box>
     
    </>
  );
}


export async function getServerSideProps(ctx) {
  const { campid } = ctx.query;
 
  return {
    props: {
      campid,
    },
    revalidate: 10,
  };
}