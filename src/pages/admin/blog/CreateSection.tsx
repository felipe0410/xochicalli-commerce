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
  useDisclosure,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react';

import { AddIcon, LinkIcon } from '@chakra-ui/icons';
import { uploadFile } from "@/firebase";
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const CreateSection = () => {

  const navigate = useNavigate();
  const [articleData, setArticleData] = useState<{
    title: string;
    description: string;
    category: string;
    imageUrlMiniatura: string;
    imageUrlPrincipal: string;
    youtubeLink: string;
  }>({
    title: '',
    description: '',
    category: 'Guía de plantas',
    imageUrlMiniatura: '',
    imageUrlPrincipal: '',
    youtubeLink: ''
  });

  const [imagenMiniatura, setImagenMiniatura] = useState<File | null>()
  const [imagenNameMiniatura, setImagenNameMiniatura] = useState<string>()
  const [imagenPrincipal, setImagenPrincipal] = useState<File | null>()
  const [imagenNamePrincipal, setImagenNamePrincipal] = useState<string>()
  const [cargando, setCargando] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addOK, setAddOK] = useState<boolean>()
  const [contenidos, setContenidos] = useState([
    { subtitulo: '', detalle: [''] },
  ]);


  const handleAgregarDetalle = (index: number) => {
    const nuevosDetalles = [...contenidos];
    nuevosDetalles[index].detalle = [...(nuevosDetalles[index].detalle || []), ''];
    setContenidos(nuevosDetalles);
  };

  const handleDetalleChange = (contenidoIndex: number, detalleIndex: number, value: string) => {
    const nuevosDetalles = [...contenidos];
    nuevosDetalles[contenidoIndex].detalle[detalleIndex] = value;
    setContenidos(nuevosDetalles);
  };

  const handleContenidoChange = (index: number, key: string, value: string) => {
    const updatedContenidos: any = [...contenidos];
    updatedContenidos[index][key] = value;
    setContenidos(updatedContenidos);
  };

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
      setImagenMiniatura(imageFile)
      const imageName = imageFile.name;
      setImagenNameMiniatura(imageName);
    }
  };
  const handleImageChangePrincipal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files ? event.target.files[0] : null;
    if (imageFile) {
      setImagenPrincipal(imageFile)
      const imageName = imageFile.name;
      setImagenNamePrincipal(imageName);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true)
    console.log(JSON.stringify(contenidos, null, 5))

    if (imagenMiniatura && imagenPrincipal) {
      try {
        const url = await uploadFile(imagenMiniatura, imagenNameMiniatura, 'blogFolder')
        const url2 = await uploadFile(imagenPrincipal, imagenNamePrincipal, 'blogFolder')
        const updatedArticleData = {
          ...articleData,
          contenidos: contenidos,
          imageUrlMiniatura: url,
          imageUrlPrincipal: url2
        };
        await addDoc(collection(db, 'blogPost'), updatedArticleData);
        setCargando(false);
        setAddOK(true)
        onOpen()

        setArticleData({
          title: '',
          description: '',
          category: 'Guía de plantas',
          imageUrlMiniatura: '',
          imageUrlPrincipal: '',
          youtubeLink: ''
        });
        setContenidos([{ subtitulo: '', detalle: [''] }]);
        setImagenMiniatura(null);
        setImagenNameMiniatura('');
        setImagenPrincipal(null);
        setImagenNamePrincipal('');

      } catch (error) {
        console.error('Error al cargar la imagen:', error);
        setCargando(false)
        setAddOK(false)
        onOpen()
      }
    } else {
      setCargando(false)
    }

  };


  return (
    <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
      <Box>
        <Button >CARGAR ARTICULO</Button>
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
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="description"
                value={articleData.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Seleccionar imagen miniatura</FormLabel>
              <Input
                type="file"
                name="imagenMiniatura"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
                required
              />
            </FormControl>
            <FormControl style={{ margin: '10px 0' }}>
              <FormLabel>Seleccionar imagen principal</FormLabel>
              <Input
                type="file"
                name="imagenPrincipal"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChangePrincipal}
                required
              />
            </FormControl>
            {contenidos.map((contenido, contenidoIndex) => (
              <Box key={contenidoIndex} width="100%" borderWidth="1px" borderRadius="md" p="4">
                <FormControl style={{ margin: '10px 0' }}>
                  <FormLabel>Subtítulo</FormLabel>
                  <Input
                    type="text"
                    value={contenido.subtitulo}
                    onChange={(e) => handleContenidoChange(contenidoIndex, 'subtitulo', e.target.value)}
                  />
                </FormControl>
                {(contenido.detalle || []).map((detalle, detalleIndex) => (
                  <FormControl key={detalleIndex}>
                    <FormLabel>Detalle</FormLabel>
                    <Input
                      type="text"
                      value={detalle}
                      onChange={(e) => handleDetalleChange(contenidoIndex, detalleIndex, e.target.value)}
                    />
                  </FormControl>
                ))}
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme='gray'
                  variant='outline'
                  sx={{ width: '100%' }}
                  onClick={() => handleAgregarDetalle(contenidoIndex)}
                >
                  Agregar detalle
                </Button>
              </Box>
            ))}
            <Button
              leftIcon={<AddIcon />}
              colorScheme='teal'
              variant='outline'
              onClick={() => setContenidos([...contenidos, { subtitulo: '', detalle: [''] }])}
              sx={{ width: '100%' }} >
              Agregar contenido
            </Button>
            <FormControl style={{ margin: '20px 0', marginTop: '30px' }}>
              <FormLabel>Link de video de youtube</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LinkIcon color='black' />
                </InputLeftElement>
                <Input
                  type="text"
                  name="youtubeLink"
                  value={articleData.youtubeLink}
                  onChange={handleInputChange}
                />
              </InputGroup>
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
