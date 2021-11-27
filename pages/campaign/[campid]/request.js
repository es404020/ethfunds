import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router';
import LoadingOverlay from "react-loading-overlay";
import {
  Grid,
  Flex,
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
  TableCaption,
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
import toast from "react-hot-toast";

import Campaign from "../../../ethereum/campaign";
import web3 from '../../../ethereum/web3';

export default function request({ request, requestCount,campid }) {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const campaign = Campaign(campid);

  let accounts="";
  useEffect( async () => {


accounts = await web3.eth.getAccounts() ;
   
    return () => {
      
    }
  }, [])


  const requests = JSON.parse(request);
 

  const onApprove =async (id) =>{
    setloading(true);


    try {
      await campaign.methods.approveRequest(id).send({
        from:accounts[0]
      });
      toast.success("Transaction was successful ");
      
    router.replace(router.asPath);
    }catch(err){

      toast.error(err.message);

    } finally {
      setloading(false);
    }



  }

  
  const finalizeRequest =async (id) =>{
    setloading(true);


    try {
      await campaign.methods.finalizeRequest(id).send({
        from:accounts[0]
      });
      toast.success("Transaction was successful ");
      
    router.replace(router.asPath);
    }catch(err){

      toast.error(err.message);

    } finally {
      setloading(false);
    }



  }

    


  return (

    <LoadingOverlay
    active={loading}
    text="Processing transcation this can take up to 15 seconds to finalize."
  >
    <Flex height="100vh" justifyContent="center" flexDirection="column">


      <Flex mx="10%" flexDirection="column">
        <Text
          bgGradient="linear(to-l, #000000,#02d395)"
          bgClip="text"
          fontSize="3xl"
          fontWeight="extrabold"
          mb={10}
        >
          Request
        </Text>


        <Table variant="striped" colorScheme="teal">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Value(Wei)</Th>
              <Th >Approved Vote</Th>
              <Th >Recipitant</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>

            {requests.map((item, i) =>
              <Tr key={i}>
                <Td>{item[0]}</Td>
                <Td>{web3.utils.fromWei(item[1], "ether")}</Td>
                <Td >{item[4]}/{requestCount}</Td>
                <Td>{item[2]}</Td>
                <Td>
                  {item[3]}

                  {!item[3] ?
               <Button colorScheme="teal" size="sm" onClick={()=>onApprove(i)}>
               Approve 
             </Button> :
                    null


                  }

                </Td>
                <Td>
                  {item[3]}

                  {!item[3] ?
               <Button colorScheme="teal" size="sm" variant="outline" onClick={()=>finalizeRequest(i)}>
               Finalized 
             </Button> :
                    null



                  }

                </Td>
              </Tr>

            )}
          </Tbody>
        </Table>
      </Flex>


    </Flex>

    </LoadingOverlay>
  )
}
export async function getServerSideProps(router) {

  const { campid } = router.query;
  const campaign = Campaign(campid);




  let error = "";



 // const  accounts = await web3.eth.getAccounts();
  const requestCount = await campaign.methods.getRequestCount().call();

  const request = await Promise.all(
    Array(requestCount).fill().map((res, index) => {
      return campaign.methods.requests(index).call();
    })
  )
console.log(request)
  //adress =   web3


  return {
    props: {
      request: JSON.stringify(request),

      error,
      requestCount,
      campid,
      

    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    //  revalidate: 10, // In seconds
  };
}
