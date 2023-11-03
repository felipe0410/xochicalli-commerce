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
} from '@chakra-ui/react';
import { uploadFile } from "@/firebase";
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

const CreateSection = () => {
  const [articleData, setArticleData] = useState<{
    title: string;
    subtitle: string;
    description: string;
    category: string;
    imageUrl: string;
  }>({
    title: '',
    subtitle: '',
    description: '',
    category: 'Guía de plantas',
    imageUrl: '',
  });

  const [imagen, setImagen] = useState<File | null>()
  const [imagenName, setImagenName] = useState<string>()
  const [cargando, setCargando] = useState(false)

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
    setCargando(true)

    if (imagen) {
      try {
        const url = await uploadFile(imagen, imagenName, 'blogFolder')
        const updatedArticleData = { ...articleData, imageURL: url };
        await addDoc(collection(db, 'blogPost'), updatedArticleData);
        setCargando(false);
        setCargando(false)
        console.log('URL de la imagen:', url);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
        setCargando(false)
      }
    } else {
      setCargando(false)
    }

  };


  return (
    <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
      <Box>
        <Button>CARGAR ARTICULO</Button>
        <Button>MOSTRAR ARTICULOS</Button>
      </Box>
      <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Text fontSize='xl' as='b'>CARGAR ARTICULO</Text>
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
                required
              />
            </FormControl>
            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Subtítulo</FormLabel>
              <Input
                type="text"
                name="subtitle"
                value={articleData.subtitle}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="description"
                value={articleData.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Seleccionar imagen</FormLabel>
              <Input
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
                required
              />
            </FormControl>
            {
              cargando
                ? <Text fontSize='xl' as='b'>Cargando...</Text>
                : <Button colorScheme="teal" sx={{ width: '100%' }} type="submit">
                  Guardar artículo
                </Button>
            }

          </VStack>
        </form>
      </Center>
    </VStack>
  );
};

export default CreateSection;
