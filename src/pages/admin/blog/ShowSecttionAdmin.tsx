import { useEffect, useState } from 'react';
import {
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Center,
  VStack,
  SimpleGrid,
  IconButton,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { db } from '@/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const ShowSecttionAdmin = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (itemId: any) => {
    setDeleteItemId(itemId);
    onOpen();
  };
  const fetchQuestions = async () => {
    const questionDocs: any = [];
    const querySnapshot = await getDocs(collection(db, 'blogPost'));

    querySnapshot.docs.forEach((doc) => {
      const postData = {
        id: doc.id,
        ...doc.data(),
      };
      questionDocs.push(postData);
    });

    setBlogPosts(questionDocs);
    console.log(questionDocs);
    setLoading(false);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      try {
        await deleteDoc(doc(db, 'blogPost', deleteItemId));
        onClose();
        setDeleteItemId(null);
        fetchQuestions();
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
      }
    }
  };

  function truncateText(text: any, maxLength: any) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  const filteredBlogPosts = filter
    ? blogPosts.filter((post: any) => post.category === filter)
    : blogPosts;

  if (loading) {
    return <Stack p={16}>
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
      <Skeleton startColor='green.500' endColor='green.100' height='20px' />
    </Stack>
  }

  return (
    <VStack spacing={4} p={4}>
      <Box>
        <Button onClick={() => navigate("/admin/blog-create")} marginRight="2">
          CARGAR ARTICULO
        </Button>
        <Button onClick={() => setFilter('')}>MOSTRAR ARTICULOS</Button>
      </Box>

      <Box sx={{ display: { sm: 'none', md: 'flex' }, width: '100%', justifyContent: 'space-evenly' }}>
        <Button bg="white" onClick={() => setFilter("Guía de plantas")}>
          Guía de plantas
        </Button>
        <Button bg="white" onClick={() => setFilter("Cuidado de plantas")}>
          Cuidado de plantas
        </Button>
        <Button bg="white" onClick={() => setFilter("Consejos y trucos")}>
          Consejos y trucos
        </Button>
        <Button bg="white" onClick={() => setFilter("Conocimientos sobre plantas")}>
          Conocimientos sobre plantas
        </Button>
      </Box>

      <Center>
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

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {filteredBlogPosts.map((post: any) => (
            <Box
              h='476px'
              w='256px'
              key={post.id}
              maxW='sm'
              borderWidth='2px'
              borderColor='gray.300'
              onClick={() => navigate(`/admin/blog-description`, { state: { post } })}
            >
              <Box>
                <Image
                  src={post.imageURL ? post.imageURL : post.imageUrlMiniatura}
                  alt={post.title}

                  borderRadius='lg'
                  sx={{ width: '100%', height: '256' }}
                />
              </Box>
              <Box px={2}>
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>{truncateText(post.title, 40)}</Heading>
                  <Text>{truncateText(post.description, 100)}</Text>
                </Stack>
              </Box>
              <Box px={2}>
                <IconButton aria-label='Editar' icon={<EditIcon onClick={() => navigate(`/admin/blog-update`, { state: { post } })} />} />
                <IconButton aria-label='Eliminar' icon={<DeleteIcon />} onClick={() => handleDelete(post.id)} />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Center>
    </VStack>
  );
};

export default ShowSecttionAdmin;
