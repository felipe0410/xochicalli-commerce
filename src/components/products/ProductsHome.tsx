import {
    FC
} from 'react'

import {
    Box,
     Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { usePrice } from '@/hooks';
import { Product } from '@/interfaces';

const ProductsHome: FC<Product> = (product): JSX.Element => {

    const navigate = useNavigate();

    const { newPrice } = usePrice(product.price)

    const toProduct = () => navigate(`/products/${product.id}`)

    function truncateText(text: any, maxLength: any) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength);
        }
        return text;
      }
 

    return (
        <Box h='450px' w='300px'  onClick={toProduct} border='2px solid #e2e8f0' borderRadius='md' overflow='hidden'>
            <Box
                sx={{
                    display: 'flex',
                    width: '300px',
                    height: '356px',
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
            </Box>
        </Box>

    )
}

export default ProductsHome;