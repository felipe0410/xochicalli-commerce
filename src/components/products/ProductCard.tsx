import {
    FC,
    useContext
} from 'react'

import {
    Box,
    Button, 
     Text,
    useMediaQuery, useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

import { UserContext, CartContext } from '@/context';
import { usePrice } from '@/hooks';
import { Product } from '@/interfaces';

const ProductCard: FC<Product> = (product): JSX.Element => {
    const uid = localStorage.getItem('uid');

    const { user } = useContext(UserContext)
    const { addToCart } = useContext(CartContext)

    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const navigate = useNavigate();

    const { newPrice } = usePrice(product.price)

    const toProduct = () => navigate(`/products/${product.id}`)

    const addItemToCart = () => {
        if (!user || uid === '') {
            toast({
                status: 'info',
                duration: 1500,
                isClosable: false,
                title: 'Añadir al carrito',
                position: isLargerThan800 ? 'top-right' : 'bottom',
                description: 'Debes iniciar sesión para añadir productos al carrito',
            })
            navigate('/login');
        } else {
            product && addToCart(product)
            toast({
                status: 'success',
                duration: 1000,
                isClosable: false,
                title: 'Añadir al carrito',
                position: isLargerThan800 ? 'top' : 'bottom',
                description: '¡Producto añadido al carrito!',
            })
        }
    }

    function truncateText(text: any, maxLength: any) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength);
        }
        return text;
      }

    return (
        <Box h='375px' w='256px'  onClick={toProduct} border='2px solid #e2e8f0' borderRadius='md' overflow='hidden'>
            <Box
                sx={{
                    display: 'flex',
                    width: '256px',
                    height: '256px',
                    backgroundImage: `url('${product.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}
                
            > 
           
            </Box>
            <Box>
                <Box px={1}>
                    <Text fontSize='2xl' as='b'>{truncateText(product.title, 20)}</Text>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} px={1}>
                    <Text fontSize='md' >{truncateText(product.description, 20)}</Text>
                    <Text fontSize='2xl' as='b'>{newPrice}</Text>
                </Box>
                <Box p={1} sx={{display:'flex', width:'100%', justifyContent:'center'}}>
                    <Button 
                        sx={{width:'80%'}}
                        leftIcon={<FiShoppingCart/>} 
                        onClick={addItemToCart}
                        colorScheme='purple'></Button>
                </Box>
            </Box>
        </Box>

    )
}

export default ProductCard;