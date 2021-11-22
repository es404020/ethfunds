import React, { createContext, useEffect,useState } from "react";
import {
  Flex,
  Text,
  Image,
  Spacer,
  useColorModeValue,
  WrapItem,
  InputRightElement,
  Heading,
  Progress,
  Box,
  Button,
  List,
  ListItem,
  ListIcon,
  HStack,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  Select,
  Table,
  Circle,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Avatar,
  Square,
  position,
  Center,
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import web3 from "../ethereum/web3";


import { useWeb3React } from "@web3-react/core"
import { injected } from "../component/connects"



export default function Mainlayout({ children }) {

  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    console.log('hehe')
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }


  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{


    if (typeof window !== 'undefined') {
      if(window.scrollY >= 80){
        setColorchange(true);
      }
      else{
        setColorchange(false);
      }
  }
   
 };

 if (typeof window !== 'undefined') {
  window.addEventListener('scroll', changeNavbarColor);
 }




  return (
    <Box >
{/* box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); */}
      <Flex  flexDirection="column"  
      
      
      
      css={{
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

        <Flex justifyContent="space-between" alignItems="center" position="fixed"
       
        backdropFilter={colorChange ? 'blur( 10.5px )' : null}

        border={colorChange ? '1px solid rgba( 255, 255, 255, 0.18 )' : null}
        
        bg={colorChange ? 'rgba( 255, 255, 255, 0.25 )' : null} width="100%" padding={5}>
          <Text fontWeight="bold" fontSize="md" color="white">EthFunds</Text>



          <Flex width="30%" display= {{ base: 'none', md: "flex" }} fontSize="small" fontWeight="semibold" color="white" justifyContent="space-between">
<Text>Markets</Text>
<Text>Governance</Text>

<Text>Price</Text>

<Text>Docs</Text>


            </Flex>

{
  !web3.currentProvider.selectedAddress ?  <Button
  onClick={connect}
             
             borderColor=" #02d395 "
  
              color="#02d395"
              type="submit"
              // disabled={isSubmitting}
              variant="outline"
          
            >
              connect
            </Button>:
            <Text color="white" isTruncated>{web3.currentProvider.selectedAddress.toString().slice(0,10)}***{web3.currentProvider.selectedAddress.toString().slice(19,28)}</Text>
}
         

        </Flex>

        <Flex  flexDirection="column">
          {children}
        </Flex>

      </Flex>

    </Box>
  );
}
