import React, { FC, useContext, useId } from "react";

import {
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { CheckoutProduct } from "@/components/products";
import { CartContext } from "@/context";

const OrderSummary: FC = () => {
  const id = useId();

  const { cart, total } = useContext(CartContext);

  return (
    <Stack spacing={{ base: "6", md: "10" }}>
      <Heading size='lg'>Resumen de la compra</Heading>
      <Stack spacing='8'>
        <Stack spacing='6'>
          {cart.length < 1 && (
            <Text fontSize='md' fontWeight='semibold'>
              No hay productos en tu carrito
            </Text>
          )}
          {cart.map((product) => (
            <React.Fragment key={id}>
              <CheckoutProduct
                key={id}
                id={product.id}
                image={product.image}
                price={product.price}
                title={product.title}
                category={product.category}
                subcategory={product.subcategory}
                tags={product.tags}
              />
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
        <Stack spacing='6'>
          <Stack spacing='3'>
            <Stack direction='row' justify='space-between'>
              <Text color='gray.600'>Subtotal</Text>
              <Text color='black'>${total}</Text>
            </Stack>
            <Stack direction='row' justify='space-between'>
              <Text color='gray.600'>Costo de envio</Text>
              <Text color='black'>
                {cart.length >= 1 ? `Gratis` : `Necesitas un producto`}
              </Text>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction='row' justify='space-between'>
            <Text
              fontSize='lg'
              fontWeight='semibold'
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Total de tu pedido
            </Text>
            <Text
              fontSize='xl'
              fontWeight='semibold'
              color={useColorModeValue("black", "white")}
            >
              ${total}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrderSummary;
