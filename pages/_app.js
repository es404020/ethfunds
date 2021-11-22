import { ChakraProvider } from "@chakra-ui/react"
import { Toaster } from "react-hot-toast";
import theme from '../Themes/themes';
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout || EmptyLayout;
  return (

    <>
    <ChakraProvider theme={theme}>
         <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>

    <Toaster />

    </>
  )

}

export default MyApp



const EmptyLayout = ({ children }) => <>{children}</>