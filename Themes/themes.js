// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"

const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#01048a",
    },
  }

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
// const font = 

// }
// 3. extend the theme
const theme = extendTheme({ config,colors ,
  
  fonts: {
  heading: "Poppins",
  body: "Poppins",
}
,})

export default theme