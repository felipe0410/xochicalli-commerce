import { FC } from 'react';

import { Button, Img, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: FC = (): JSX.Element => {
    const navigate = useNavigate()

    const handleGoBack = () => navigate('/')

    return (
        <VStack minH='calc(100vh - 72px)' bgColor='gray.200' justifyContent='center' gap={4}>
            <Helmet>
                <title>404</title>
            </Helmet>
            <Img
                src={import.meta.env.VITE_NOTFOUND_IMAGE}
                width='256px'
            />
            <Text fontWeight='medium'>No pudimos encontrar la página que buscaste</Text>
            <Button colorScheme='red' onClick={handleGoBack}>
                Volver al inicio
            </Button>
        </VStack>
    )
}

export default NotFound;