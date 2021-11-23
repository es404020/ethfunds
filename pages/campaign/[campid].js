

import React,{useEffect,useState} from 'react';
import { useRouter } from "next/router";
import Campaign from '../../ethereum/campaign';
import { Grid, GridItem,Box,Flex,Text,Button,Stack } from "@chakra-ui/react"
import Mainlayout from '../../layouts/mainlayouts';
export default function CampDetails() {
    const router = useRouter();
    const { campid } = router.query;
    const  [state, setstate] = useState('');
    const [summary, setsummary] = useState('')
    const campaign = Campaign(campid);

    useEffect(async() => {
    

      const  summary= await campaign.methods.getSummary().call();
     const   desc = await campaign.methods.description().call();

     setstate(desc);
     setsummary({
        minimumContribution:summary[0],
        balance:summary[1],
        requestCount:summary[2],
        approversCount:summary[3],
        manger: summary[4]



     })



       
       
    }, [state])


    return (
        // <div>
        //     {campid}
        // </div>

        <>
<Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={2}>
  <Flex w="100%"flexDirection="column" justifyContent="space-between" p={10} fontWeight="semibold" fontSize="large" >

  <Text
  bgGradient="linear(to-l, #000000,#02d395)"
  bgClip="text"
  fontSize="5xl"
  fontWeight="extrabold"
>
 {state}
</Text>
     
      <Text >You can find all the information about this project </Text> 

      <Grid templateColumns="repeat(2, 1fr)" width="90%" gap={6}>
  <Flex p={10} w="100%" h="30vh" justifyContent="center" bg="#FDECD4" flexDirection="column" borderRadius="md" boxShadow="md">
  <Text

  fontSize="6xl"
  fontWeight="extrabold"
>
{summary.balance
}
</Text>
<Text>Campaign Balance</Text>


      </Flex>
      <Flex p={10} w="100%" h="30vh" justifyContent="center" bg="#FDE4F8" flexDirection="column" borderRadius="md" boxShadow="md">
  <Text

  fontSize="6xl"
  fontWeight="extrabold"
>
{summary.minimumContribution
}
</Text>
<Text>Minimun Contribitions</Text>

      </Flex>

      <Flex p={10} w="100%" h="30vh" justifyContent="center" bg="#B3E0E8" flexDirection="column" borderRadius="md" boxShadow="md">
  <Text

  fontSize="6xl"
  fontWeight="extrabold"
>
{summary.requestCount
}
</Text>
<Text>Request</Text>

      </Flex>

      <Flex p={10} w="100%" h="30vh" justifyContent="center" bg="#ECEEF9" flexDirection="column" borderRadius="md" boxShadow="md">
  <Text

  fontSize="6xl"
  fontWeight="extrabold"
>
{summary.approversCount
}
</Text>
<Text>contributors</Text>

      </Flex>
 
</Grid>
<Flex mt={5}  flexDirection="column" justifyContent="space-evenly" width= {{ base: "100%", md: "90%" }}  >
  <Button colorScheme="teal" mb={5} variant="solid">
    View Request
  </Button>
  <Button colorScheme="teal" variant="outline"  display= {{ base: "block", md: "none" }}>
    Contribute
  </Button>
  
</Flex>


  </Flex>
  <Box w="100%" h="100vh" bg="blue.500" display = {{ base: 'none', md: "flex" }} />
 
</Grid>

        </>
    )
}




