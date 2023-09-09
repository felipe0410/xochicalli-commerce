import { FC, useContext } from 'react'

import { AspectRatio, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { CartContext } from '@/context/cart'
import { Product } from '@/interfaces'
import { usePrice } from '@/hooks'

const CheckoutProduct: FC<Product> = (product): JSX.Element => {
    const { getProductAmount } = useContext(CartContext)

    const { newPrice } = usePrice(product.price)

    const amount = getProductAmount(product);

    return (
        <Flex justify="space-between" key={product.id}>
            <Stack direction="row" spacing="5">
                <AspectRatio ratio={1} width="92px">
                    <LazyLoadImage src={product.image} alt={product.title} style={{ borderRadius: 12 }} />
                </AspectRatio>
                <Stack spacing="3">
                    <Text fontWeight="semibold">{product.title}</Text>
                    <HStack my={4} w='100%' justifyContent='space-between'>
                        <Text>Cantidad: {amount}</Text>
                    </HStack>
                </Stack>
            </Stack>
            <Text fontWeight="medium">{newPrice}</Text>
        </Flex>
    )
}
export default CheckoutProduct;