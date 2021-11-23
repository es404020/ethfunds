import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import LoadingOverlay from "react-loading-overlay";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
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
import { useRouter } from 'next/router'
export default function index() {
  const router = useRouter();
  let account = "";

  const [loading, setloading] = useState(false);

  useEffect(async () => {
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
  }, []);

  const onSubmit = async (value, resetForm) => {
    setloading(true);

    try {
      const result = await factory.methods
        .createCampaign(value.mini, value.desc)
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
            mini: 50,
            desc: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.mini) {
              errors.mini = "required value";
            }
            if (!values.desc) {
              errors.desc = "required Description";
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
              <FormControl id="mini">
                <FormLabel>Mini Contribitions</FormLabel>
                <Input
                  isInvalid={
                    errors.mini && touched.mini && errors.mini ? true : false
                  }
                  errorBorderColor="crimson"
                  type="number"
                  name="mini"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mini}
                />
                <Text fontSize="sm" color="red.300">
                  {" "}
                  {errors.mini && touched.mini && errors.mini}
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
