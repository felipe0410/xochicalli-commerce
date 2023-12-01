import { useState } from 'react'

import {
    Box, Center, Heading, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup,
    Spinner, Stack, Text, VStack, useDisclosure
} from '@chakra-ui/react'

import { Button, FormControl, FormLabel, Textarea, } from "@chakra-ui/react";
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

const Questions: any = ({ set }: { set: any }): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [formData, setFormData] = useState({
        navigationEase: "",
        technicalProblems: "",
        productInformationSatisfaction: "",
        additionalComments: "",
    });

    const [loading, setLoading] = useState(false)
    const [addOK, setAddOK] = useState<boolean>()
    const [answeredQuestions, setAnsweredQuestions] = useState(false);
    const [isFromValid, setIsFromValid] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: value,
        });

        const answered = Object.values(formData).some((value) => value !== "");
        setAnsweredQuestions(answered);

        // Muestra los valores seleccionados en el console.log
        console.log(`Pregunta ${name}: ${value}`);
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const answered = Object.values(formData).some(value => value !== "");
        setAnsweredQuestions(answered);

        if (!answeredQuestions) {
            // Muestra un mensaje y no intenta enviar el formulario
            setIsFromValid(false)
            return;
        }
        setLoading(true);

        const currentDateTime = new Date();
        const formattedDate = currentDateTime.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const formattedTime = currentDateTime.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        });
        const updatedFormData = {
            ...formData,
            fecha: formattedDate,
            hora: formattedTime,
        };

        setFormData(updatedFormData);

        try {

            await addDoc(collection(db, 'questions'), updatedFormData);
            setLoading(false)
            setAddOK(true)
            setFormData({
                navigationEase: "",
                technicalProblems: "",
                productInformationSatisfaction: "",
                additionalComments: "",
            });
            onOpen()
            setIsFromValid(true)
            if (set) {
                console.log('entro aqui')
                set(true)
            }
        } catch (error) {
            console.error('Error al agregar el documento: ', error);
            setLoading(false)
            setAddOK(false)
            onOpen()
            setIsFromValid(true)
            if (set) {
                console.log('entro aqui')
                set(true)
            }
        }

    };

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>
                <VStack spacing={6} w='full'>
                    <Heading>Responder Preguntas</Heading>
                    <>
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>{addOK ? 'Guardado correctamente!' : 'Ocurrio un error'}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    {addOK ? 'Sus respuestas fueron enviadas!' : 'Verifique su conexión!'}
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onClose}>Cerrar</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="navigationEase">1. ¿Te resulto fácil realizar una compra?</FormLabel>
                            <RadioGroup
                                name="navigationEase"
                                onChange={(value) =>
                                    handleChange({ target: { name: "navigationEase", value } } as React.ChangeEvent<HTMLInputElement>)
                                }

                                value={formData.navigationEase}
                            >
                                <Stack spacing={5} direction="row">
                                    <Radio size="md" value="Sí" colorScheme="green">
                                        Sí
                                    </Radio>
                                    <Radio size="md" value="No" colorScheme="green">
                                        No
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="technicalProblems">2. ¿Experimentaste problemas técnicos al realizar una compra, como errores de pago o procesamiento aun habiendo realizado la compra de manera exitosa?</FormLabel>
                            <RadioGroup
                                name="technicalProblems"
                                onChange={(value) =>
                                    handleChange({ target: { name: "technicalProblems", value } } as React.ChangeEvent<HTMLInputElement>)
                                }

                                value={formData.technicalProblems}
                            >
                                <Stack spacing={5} direction='row'>
                                    <Radio size='md' value='Sí' colorScheme='green'>Sí</Radio>
                                    <Radio size='md' value='No' colorScheme='green'>No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="productInformationSatisfaction">3. ¿Qué tan satisfecho estás con la información proporcionada sobre los productos, como descripciones, imágenes y precios?</FormLabel>
                            <RadioGroup
                                name="productInformationSatisfaction"
                                onChange={(value) =>
                                    handleChange({ target: { name: "productInformationSatisfaction", value } } as React.ChangeEvent<HTMLInputElement>)
                                }

                                value={formData.productInformationSatisfaction}
                            >
                                <Stack direction='column'>
                                    <Radio size='md' value='Muy insatisfecho' colorScheme='green'>Muy insatisfecho</Radio>
                                    <Radio size='md' value='Insatisfecho' colorScheme='green'>Insatisfecho</Radio>
                                    <Radio size='md' value='Neutral' colorScheme='green'>Neutral</Radio>
                                    <Radio size='md' value='Satisfecho' colorScheme='green'>Satisfecho</Radio>
                                    <Radio size='md' value='Muy satisfecho' colorScheme='green'>Muy satisfecho</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="additionalComments">4. ¿Algun comentario que desees agregar? - OPCIONAL </FormLabel>
                            <Textarea
                                name="additionalComments"
                                value={formData.additionalComments}
                                onChange={handleChange}
                                placeholder="Escribe tus comentarios aquí"
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {loading ? (
                                <Spinner color='red.500' />
                            ) : (
                                <Button type="submit" colorScheme="teal">
                                    Enviar respuestas
                                </Button>
                            )}
                        </Box>
                        {
                            isFromValid ? null : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Text fontSize='xs' as='b' color='tomato'>Debe responder la encuesta</Text>
                            </Box>
                        }

                    </form>
                    <Stack spacing={3}>
                        <Text fontSize='sm' as='b'>¡Estas preguntas te ayudarán a obtener información valiosa sobre la
                            experiencia de los clientes en tu tienda en línea y a identificar áreas de mejora!</Text>
                    </Stack>
                </VStack>
            </Center>
        </VStack>
    )
}
export default Questions