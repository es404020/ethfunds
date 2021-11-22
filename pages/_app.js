import { ChakraProvider } from "@chakra-ui/react"
import { Toaster } from "react-hot-toast";
import theme from '../Themes/themes';
import "../styles/globals.css";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'




function getLibrary(provider) {
  return new Web3(provider)
}
function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout || EmptyLayout;
  return (

    <>
        <Web3ReactProvider getLibrary={getLibrary}>
    <ChakraProvider theme={theme}>
         <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>

    <Toaster />


    </Web3ReactProvider>

    </>
  )

}

export default MyApp



const EmptyLayout = ({ children }) => <>{children}</>