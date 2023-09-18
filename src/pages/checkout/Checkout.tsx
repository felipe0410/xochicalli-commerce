import { FC } from "react";

import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

import { OrderSummary, ShippingInformation } from "@/components/checkout";

const Checkout: FC = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Box
        bgGradient={useColorModeValue(
          "linear(to-l, gray.50 50%, white 50%)",
          "linear(to-l, gray.700 50%, gray.800 50%)"
        )}
        minH="100vh"
      >
        <Flex maxW="8xl" mx="auto" direction={{ base: "column", md: "row" }}>
          <Box
            flex="1"
            bg={useColorModeValue("white", "gray.800")}
            px={{ base: "4", md: "8", lg: "12", xl: "20" }}
            py={{ base: "6", md: "8", lg: "12", xl: "20" }}
            h="100vh"
          >
            <Stack spacing={{ base: "16", lg: "8" }}>
              <ShippingInformation />
              {/* <PaymentInformation /> */}
            </Stack>
          </Box>
          <Box
            flex="1"
            maxW={{ lg: "md", xl: "40rem" }}
            bg="gray.50"
            px={{ base: "4", md: "8", lg: "12", xl: "20" }}
            py={{ base: "6", md: "8", lg: "12", xl: "20" }}
          >
            <OrderSummary />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Checkout;
