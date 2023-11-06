import { useState } from 'react';
import {
  Box,
  Center,
  Image,
  Text,
  Heading,
  VStack,
  Card,
  CardBody,
  Stack,
  IconButton,
  CardHeader
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DescriptionUser = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const { post } = state;

  if (!post) {
    return (
      <div>
        No se proporcionó un objeto post en el estado del enrutador.
      </div>
    );
  }

  return (
    <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>

      <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>
        <Card key={post.id} maxW='md' borderWidth='2px' borderColor='gray.300'>
          <CardHeader>
            <Box sx={{ display: 'flex', width: '100%' }}>
            <IconButton
                aria-label='Eliminar'
                icon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              />
            </Box>
          </CardHeader>
          <CardBody>
            <Image src={post.imageURL} alt={post.title} borderRadius='lg' sx={{width:'100%'}}/>
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{post.title}</Heading>
              <Text>{post.description}</Text>
            </Stack>
          </CardBody>
        </Card>
      </Center>
    </VStack>
  );
};




export default DescriptionUser