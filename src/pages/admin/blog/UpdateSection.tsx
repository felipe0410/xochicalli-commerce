import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  VStack,
  Center,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import { uploadFile } from "@/firebase";
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const UpdateSection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { post } = state;
  const [articleData, setArticleData] = useState<{
    title: string;
    subtitle: string;
    description: string;
    category: string;
    imageUrl: string;
  }>({
    title: post.title,
    subtitle: post.subtitle,
    description: post.description,
    category: post.category,
    imageUrl: post.imageURL,
  });

  const [imagen, setImagen] = useState<File | null>()
  const [imagenName, setImagenName] = useState<string>()
  const [cargando, setCargando] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addOK, setAddOK] = useState<boolean>()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setArticleData({
      ...articleData,
      [name]: value,
    });

  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files ? event.target.files[0] : null;
    if (imageFile) {
      setImagen(imageFile)
      const imageName = imageFile.name;
      setImagenName(imageName);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const url = imagen ? await uploadFile(imagen, imagenName, 'blogFolder') : articleData.imageUrl
      const updatedArticleData = { ...articleData, imageURL: url };

      const docRef = doc(db, 'blogPost', post.id);
      await updateDoc(docRef, updatedArticleData);

      setCargando(false);
      setAddOK(true);
      onOpen();

      setArticleData({
        title: '',
        subtitle: '',
        description: '',
        category: 'Guía de plantas',
        imageUrl: '',
      });
      setImagen(null);
      setImagenName('');
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      setCargando(false);
      setAddOK(false);
      onOpen();
    }

  };


  return (
    <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
      <Box>
        <Button onClick={() => navigate("/admin/blog-create")}>CARGAR ARTICULO</Button>
        <Button onClick={() => navigate("/admin/blog-show")}>MOSTRAR ARTICULOS</Button>
      </Box>
      <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{addOK ? 'Publicado correctamente!' : 'Ocurrio un error'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {addOK ? 'Publicado correctamente en su blog!' : 'Ocurrio un error al intentar publicar!'}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Text fontSize='xl' as='b'>ACTUALIZAR ARTICULO</Text>
            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Categoría</FormLabel>
              <Select
                name="category"
                value={articleData.category}
                onChange={handleInputChange}
              >
                <option value="Guía de plantas">Guía de plantas</option>
                <option value="Cuidado de plantas">Cuidado de plantas</option>
                <option value="Consejos y trucos">Consejos y trucos</option>
                <option value="Conocimientos sobre plantas">Conocimientos sobre plantas</option>
              </Select>
            </FormControl>
            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Título</FormLabel>
              <Input
                type="text"
                name="title"
                value={articleData.title}
                onChange={handleInputChange}
                
              />
            </FormControl>
            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Subtítulo</FormLabel>
              <Input
                type="text"
                name="subtitle"
                value={articleData.subtitle}
                onChange={handleInputChange}
                
              />
            </FormControl>

            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="description"
                value={articleData.description}
                onChange={handleInputChange}
                
              />
            </FormControl>

            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Seleccionar imagen</FormLabel>
              <Input
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </FormControl>
            {
              cargando
                ? <Text fontSize='xl' as='b'>Cargando...</Text>
                : <Button colorScheme="teal" sx={{ width: '100%' }} type="submit">
                  Actualizar artículo
                </Button>
            }

          </VStack>
        </form>
      </Center>
    </VStack>
  );
};


export default UpdateSection