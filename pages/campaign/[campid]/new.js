import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import LoadingOverlay from "react-loading-overlay";
import factory from "../../../ethereum/factory";
import web3 from "../../../ethereum/web3";
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
import { useRouter } from 'next/router';
import Campaign from "../../../ethereum/campaign";

export default function N0ew() {
    const router = useRouter();
    var account = "";
    const campaign = Campaign(router.query.campid);
  
  
    const [loading, setloading] = useState(false);
  
    useEffect(async () => {
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
      console.log(account);

    }, []);
  
    const onSubmit = async (value, resetForm) => {
        console.log(account);
      setloading(true);
  
      try {
        const result = await campaign.methods
          .createRequest( value.desc, web3.utils.toWei(value.valuew,'ether'),value.to)
          .send({
            from: account,
          });
  
        toast.success("Transaction was successful ");
  
        router.push("/");
        resetForm();
      } catch (err) {
        toast.error(err.message);
  
        console.log(err);
      } finally {
        setloading(false);
      }
    };
  
    return (
      <LoadingOverlay
        active={loading}
        text="Processing transcation this can take up to 15 seconds to finalize."
      >
        <Flex
          height="100vh"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Formik
            initialValues={{
              valuew: "0",
              desc: "",
              to: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.valuew) {
                errors.valuew = "required value";
              }
              if (!values.desc) {
                errors.desc = "required Description";
              }
              if (!values.to) {
                errors.to = "required To";
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
                <FormControl id="valuew">
                  <FormLabel>Amount in weth</FormLabel>
                  <Input
                    isInvalid={
                      errors.valuew && touched.valuew && errors.valuew ? true : false
                    }
                    errorBorderColor="crimson"
                    type="text"
                    name="valuew"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.valuew}
                  />
                  <Text fontSize="sm" color="red.300">
                    {" "}
                    {errors.valuew && touched.valuew && errors.valuew}
                  </Text>
                </FormControl>
                <FormControl id="to">
                  <FormLabel>To</FormLabel>
                  <Input
                    isInvalid={
                      errors.to && touched.to && errors.to ? true : false
                    }
                    errorBorderColor="crimson"
                    type="text"
                    name="to"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.to}
                  />
                  <Text fontSize="sm" color="red.300">
                    {" "}
                    {errors.to && touched.to && errors.to}
                  </Text>
                </FormControl>
                <FormControl id="desc">
                  <FormLabel>Description</FormLabel>
  
                  <Textarea
                    type="text"
                    name="desc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.desc}
                    isInvalid={
                      errors.desc && touched.desc && errors.desc ? true : false
                    }
                    errorBorderColor="crimson"
                  />
  
                  <Text fontSize="sm" color="red.300">
                    {" "}
                    {errors.desc && touched.desc && errors.desc}
                  </Text>
                </FormControl>
  
                <Button
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
                </Button>
              </form>
            )}
          </Formik>
        </Flex>
      </LoadingOverlay>
    );
}
