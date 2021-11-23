import factory from "../ethereum/factory";
import { useEffect, useState } from "react";
import Mainlayout from '../layouts/mainlayouts';
import { useRouter } from 'next/router'

import {
  Grid,
  Flex,
  Headers,
  Text,
  Stack,
  useColorMode,
  Box,
  Button,
  Square,
  ButtonGroup,
  ModalCloseButton,
  Input,
  Icon,
  IconButton,
  ScaleFade,
  InputGroup,
  useColorModeValue,
  InputLeftElement,
  Container,
  Circle,
  useDisclosure,
  Heading,
  Avatar,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  FormHelperText,
  GridItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  ModalBody,
  ModalFooter,
  SkeletonCircle,
  SkeletonText,
  ModalHeader,
} from "@chakra-ui/react";
import web3 from "../ethereum/web3";

export default function Home({ campaign, error, adress }) {

  const router = useRouter()
  useEffect(() => {

    // const who =   await factory.methods;

    console.log(campaign)
  }, []);




  return (

    < Box overflowY="hidden" css={{
      '&::-webkit-scrollbar': {
        width: '0',
      },
      '&::-webkit-scrollbar-track': {
        width: '0',
      },
      '&::-webkit-scrollbar-thumb': {

        borderRadius: '24px',
      },
    }}>
      <Flex flexDirection="column" height="100vh" bg="#000000" alignItems="center" textAlign="center" justifyContent="center" width="100%">



        <Text fontSize={{ base: '3xl', md: "5xl" }} color="white" fontWeight="bolder" width={{ base: '100%', md: "60%" }} p={10}>

          Fund your next big project  with  <Box display="inline" bgGradient="linear(to-l, white,#02d395)"
            bgClip="text">ETH </Box> up to  <Box display="inline"bgGradient="linear(to-l, white,#02d395)"
            bgClip="text">$0,0050505 </Box>  for contribution   <Box display="inline" color="#02d395">. </Box>


        </Text>



      </Flex>

      <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%" p={{ base: 5, md: 20 }}>

        <Flex flexDirection="column" width={{ base: '100%', md: "100%" }} p={5}>

          <Text fontSize={{ base: 'md', md: "3xl" }} color="#9e9e9e" >Try Compound</Text>

          <Text fontWeight="bold" fontSize={{ base: 'md', md: "3xl" }} >Community-built creators, whose main purpose is to change the world.</Text>




        </Flex>

        <Flex width={{ base: '100%', md: "90%" }} mt={10} justifyContent="center" flexDirection="column">
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>

            {campaign.map((item, i) =>
              <Flex cursor="pointer" _hover={{
                transform: "scale(1.1)",
                fontWeight: "bold"
              }} transition="transform .2s" onClick={() => router.push(`/campaign/${item}`)} w={{ base: "70%", md: "100%" }} h="260" key={i} flexDirection="column" justifyContent="center" alignItems="start" boxShadow="md" p={5} >

                <Text fontWeight="bolder">Addresss:</Text>
                {/* <Text>{item}</Text> */}

                <Text width="100%" noOfLines={{ base: 4, md: null }}>
                  {item}
                </Text>

              </Flex>




            )}


          </Grid>

        </Flex>
      </Flex>

    </Box>
  );
}

export async function getStaticProps() {
  let campaign = [];
  let error = '';

  try {
    campaign = await factory.methods.getDeployCampaign().call();


    //adress =   web3
  } catch (err) {
    error = JSON.stringify(err);
  }

  return {
    props: {
      campaign,
      error
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}


Home.Layout = Mainlayout;
