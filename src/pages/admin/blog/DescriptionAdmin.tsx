import { useState } from 'react';
import {
  Box,
  Center,
  Image,
  Text,
  Heading,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Divider,
  IconButton,
  useDisclosure,
  Button,
  CardHeader
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon,ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { db } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const DescriptionAdmin = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { state } = useLocation();
  const navigate = useNavigate();
  const { post } = state;

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editBool, setEditBool] = useState(false);

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      try {
        await deleteDoc(doc(db, 'blogPost', deleteItemId));
        onClose();
        setDeleteItemId(null);
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
      }
    }
  };

  const handleDelete = (itemId: any) => {
    setDeleteItemId(itemId);
    onOpen();
  };

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
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmación de eliminación</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              ¿Estás seguro de que deseas eliminar este elemento?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={() => handleConfirmDelete()}>Eliminar</Button>
              <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

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
          <Divider />
          <CardFooter sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              {!editBool && <IconButton aria-label='Editar' icon={<EditIcon />} onClick={() => {setEditBool(true)}}/>}
              {editBool && <IconButton aria-label='Editar' icon={<CheckIcon />} onClick={() => {setEditBool(false)}}/>}
              <IconButton aria-label='Eliminar' icon={<DeleteIcon />} onClick={() => handleDelete(post.id)} />
            </Box>
          </CardFooter>
        </Card>
      </Center>
    </VStack>
  );
};

export default DescriptionAdmin;
