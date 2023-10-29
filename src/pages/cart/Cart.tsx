import { FC, useContext, useId } from 'react'

import { Button, Card, CardBody, CardHeader, Center, Divider, Link, Text, VStack } from '@chakra-ui/react'
import { Link as RLink, useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

import { CartContext } from '@/context/cart'
import { CartProduct } from '@/components/products'

const Cart: FC = (): JSX.Element => {
  const id = useId();

  const { cart, clearCart, total } = useContext(CartContext)
  const navigate = useNavigate()

  const onCheckout = () => navigate('/checkout')

  return (
    <VStack minH='calc(100vh - 72px)' bgColor='gray.100' p={4}>
      <Helmet>
        <title>Carrito de compras</title>
      </Helmet>

      <Card w={cart.length > 0 ? ['sm', 'md', '2xl', '2xl', '3xl'] : 'sm'} my={8}>
        <CardHeader textAlign='center' fontWeight={700} fontSize='3xl'>
          Carrito
        </CardHeader>
        {
          cart.length > 0 && <Button colorScheme='red' onClick={clearCart} width='max-content' mr={4} ml='auto'>Limpiar carrito</Button>
        }
        <CardBody>
          {
            cart.length < 1
              ?
              <Center flexDir='column' gap={2}>
                <Text fontSize='lg'>¡Tu carrito está vacío!</Text>
                <Link as={RLink} to='/products' color='blue.500' fontWeight={500}>Ver productos</Link>
              </Center>
              :
              cart.map((item) => {

                return (
                  <>
                    <CartProduct
                      key={id}
                      id={item.id}
                      image={item.image}
                      price={item.price}
                      title={item.title}
                      category={item.category}
                      subcategory={item?.subcategory ?? ''}
                      tags={item?.tags ?? ''} />
                    <Divider my={6} />
                  </>
                )
              })
          }
          {cart.length > 0 &&
            <Center flexDir={['column', 'row']} alignItems={['center', 'baseline']} gap={4} w='full' justifyContent='space-between'>
              <Text fontSize={['xl', '2xl']} fontWeight={700} textAlign='center'>Tu total es de: ${total}</Text>
              <Button size={['md', 'lg']} colorScheme='green' rightIcon={<FiArrowRight />} onClick={onCheckout} fontWeight={500}>Checkout</Button>
            </Center>
          }
        </CardBody>
      </Card>
    </VStack >

  )
}
export default Cart