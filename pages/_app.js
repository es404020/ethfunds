import { ChakraProvider } from "@chakra-ui/react"
import { Toaster } from "react-hot-toast";
import theme from '../Themes/themes';
import "../styles/globals.css";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import { MoralisProvider } from "react-moralis";


function getLibrary(provider) {
  return new Web3(provider)
}
function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout || EmptyLayout;
  return (

    <>

<MoralisProvider appId="Mvi5dm6MqPeaysUnIOzjwaw6754t8Xa4x14uNwwq" serverUrl="https://1kamis3xj4rj.usemoralis.com:2053/server">
        <Web3ReactProvider getLibrary={getLibrary}>
    <ChakraProvider theme={theme}>
         <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>

    <Toaster />


    </Web3ReactProvider>
    </MoralisProvider>
    </>
  )

}

export default MyApp



const EmptyLayout = ({ children }) => <>{children}</>