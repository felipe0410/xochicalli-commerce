import {
  Box,
  Text,
  Heading,
  Card,
  CardBody,
  Stack,
  IconButton,
  UnorderedList,
  ListItem,
  OrderedList,
  Button
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
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
    <Box bgColor='gray.100' p={1}>    
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', padding: 2 }}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <IconButton
          fontSize='2xl'
          aria-label='Eliminar'
          icon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '500px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url('${post.imageUrlPrincipal}')`, // Reemplaza 'url_de_la_imagen' con la URL de tu imagen
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white', // Puedes cambiar el color del texto para que sea legible sobre la imagen
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Agrega sombra al texto para mejorar la legibilidad
        }}
      >
        <Text fontSize='5xl' paddingX={6} paddingY={2}
          border='2px solid rgba(220, 220, 220, 0.5)' // Ajusta el ancho y el color del borde
          borderRadius='8px' // 
          backgroundColor='rgba(220, 220, 220, 0.5)' color='#196F3D' >{post.title}</Text>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', padding: 16 }}>

      <Box sx={{ display: 'flex', width: '100%', marginBottom: 8 }}>
            <Button variant="ghost"onClick={() => navigate(-1)}>Blog /</Button>
            <Button variant="ghost" onClick={() => navigate(-1)}> {post.category} /</Button>
            <Button variant="ghost"> {post.title}</Button>
          </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Card key={post.id} borderWidth='2px' borderColor='gray.300'>
            <CardBody>
              <Stack mt='6' spacing='3'>
                <Heading size='md'>Contenido</Heading>
                {post.contenidos.map((contenido: any, index: any) => (
                  <Box key={index} sx={{ paddingX: 8 }}>
                    <OrderedList>
                      <ListItem>{contenido.subtitulo}</ListItem>
                    </OrderedList>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </Box>

        <Box sx={{ display: 'flex', width: '100%', marginY: 8 }}>
          <Text fontSize='2xl'>{post.description}</Text>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Stack mt='6' spacing='3'>
            {post.contenidos.map((contenido: any, index: any) => (
              <Box key={index} sx={{ paddingX: 8 }}>
                <Text fontSize='4xl'>{contenido.subtitulo}</Text>
                <UnorderedList spacing={2}>
                  {contenido.detalle.map((detalle: any, detalleIndex: any) => (
                    <ListItem key={detalleIndex} fontSize='xl'>{detalle}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            ))}
          </Stack>
        </Box>


        <Box sx={{ display: 'flex', width: '100%', marginY: 8 }}>
          <ReactPlayer
            url={post.youtubeLink}
            width="100%"
            controls={true}
          />
        </Box>        

      </Box>
    </Box>
  </Box>
  );
};




export default DescriptionUser