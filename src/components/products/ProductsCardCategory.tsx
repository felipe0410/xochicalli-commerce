import {
    FC
} from 'react'

import {
    Box,
     Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { Product } from '@/interfaces';

const ProductsCardCategory: FC<Product> = (product): JSX.Element => {

    const navigate = useNavigate();


    const toProduct = () => navigate(`/products/${product.id}`)

    function truncateText(text: any, maxLength: any) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength);
        }
        return text;
      }

      

    return (
        <Box h='400px' w='360px'  onClick={toProduct} border='2px solid #e2e8f0' borderRadius='md' overflow='hidden'>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '356px',
                    backgroundImage: `url('${product.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}>           
            </Box>
            <Box>
                <Box px={1} sx={{display:'flex', width:'100%', justifyContent:'center'}}>
                    <Text fontSize='lg' >{truncateText(product.category, 20)}</Text>
                </Box>
            </Box>
        </Box>

    )
}

export default ProductsCardCategory;