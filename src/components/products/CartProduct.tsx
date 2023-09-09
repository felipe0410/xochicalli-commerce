import { FC, useContext } from 'react'

import { AspectRatio, Button, Card, CloseButton, HStack, Image, Stack, Tag, Text } from '@chakra-ui/react'

import { CartContext } from '@/context/cart'
import { Product } from '@/interfaces'
import { usePrice } from '@/hooks'

const CartProductCard: FC<Product> = (product): JSX.Element => {
    const { addOneToCart, removeOneFromCart, getProductAmount, removeFromCart } = useContext(CartContext)

    const { newPrice } = usePrice(product.price)

    const amount = getProductAmount(product);

    return (
        <Card direction={['column', 'row']} bgColor='gray.50' h={['md', '48']}>
            <AspectRatio ratio={1} w={['full', 256]} h={['64', 'full']}>
                <Image loading='lazy' src={product.image} alt={product.title} w={['full', '48']} h='48' objectFit='cover'
                    borderTopRadius={['md', 'none']} borderLeftRadius={['none', 'md']}
                    style={{
                        borderTopLeftRadius: '8px'
                    }}
                />
            </AspectRatio>
            <Stack w='full' p={6} spacing={3}>
                <HStack alignItems='center' w='full' justifyContent='space-between'>
                    <Text fontSize='xl' fontWeight={600}>
                        {product.title}
                    </Text>
                    <CloseButton
                        aria-label='delete-icon'
                        onClick={() => removeFromCart(product)}
                    />
                </HStack>
                <Tag my={2} bgColor='gray.200' width='max-content'>{product.category}</Tag>
                <Text fontSize={['xl', 'lg']} fontWeight='medium'>{newPrice}</Text>
                <HStack my={4} w='100%' justifyContent='space-between'>
                    <HStack spacing={[4, 6]}>
                        <Button onClick={() => removeOneFromCart(product)} size='sm'>
                            -
                        </Button>
                        <Text>{amount}</Text>
                        <Button onClick={() => addOneToCart(product)} size='sm'>
                            +
                        </Button>
                    </HStack>
                </HStack>
            </Stack>
        </Card>
    )
}
export default CartProductCard