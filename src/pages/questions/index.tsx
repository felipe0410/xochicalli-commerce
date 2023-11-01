import { FC, useState } from 'react'

import { Box, Center, Heading, Select, Stack, Text, VStack } from '@chakra-ui/react'

import { Button, FormControl, FormLabel, Textarea, } from "@chakra-ui/react";


const Questions: FC = (): JSX.Element => {

    const [formData, setFormData] = useState({
        frequency: "",
        navigationEase: "",
        intuitiveOrganization: "",
        pageSpeed: "",
        technicalProblems: "",
        productInformationSatisfaction: "",
        usedSearchFunction: "",
        searchFunctionEffective: "",
        trackingOrderEase: "",
        recommendStore: "",
        additionalComments: "",
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        console.log(JSON.stringify(formData, null, 5))
    };

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>
                <VStack spacing={6} w='full'>
                    <Heading>Responder Preguntas</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="frequency">1. ¿Con qué frecuencia visitas nuestra tienda en línea de productos de plantas y jardinería?</FormLabel>
                            <Select
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleChange}
                                placeholder='Elija una opción'>
                                <option value="Diariamente">Diariamente</option>
                                <option value="Semanalmente">Semanalmente</option>
                                <option value="Mensualmente">Mensualmente</option>
                                <option value="Ocasionalmente">Ocasionalmente</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="navigationEase">2. ¿Cómo calificarías la facilidad de navegación en nuestra plataforma?</FormLabel>
                            <Select
                                name="navigationEase"
                                value={formData.navigationEase}
                                onChange={handleChange}
                                placeholder='Elija una opción'>
                                <option value="Muy facil">Muy facil</option>
                                <option value="Facil">Facil</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Dificil">Dificil</option>
                                <option value="Muy dificil">Muy dificil</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="intuitiveOrganization">3. ¿Has encontrado que la organización de las categorías y productos es intuitiva?</FormLabel>
                            <Select
                                name="intuitiveOrganization"
                                value={formData.intuitiveOrganization}
                                onChange={handleChange}
                                placeholder='Elija una opción'
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="pageSpeed">4. ¿Cuál es tu opinión sobre la velocidad de carga de la página?</FormLabel>
                            <Select
                                name="pageSpeed"
                                value={formData.pageSpeed}
                                onChange={handleChange}
                                placeholder='Elija una opción'
                            >
                                <option value="Excelente">Excelente</option>
                                <option value="Buena">Buena</option>
                                <option value="Aceptable">Aceptable</option>
                                <option value="Lenta">Lenta</option>
                                <option value="Muy lenta">Muy lenta</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="technicalProblems">5. ¿Experimentaste problemas técnicos al realizar una compra, como errores de pago o procesamiento?</FormLabel>
                            <Select
                                name="technicalProblems"
                                value={formData.technicalProblems}
                                onChange={handleChange}
                                placeholder='Elija una opción'
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="productInformationSatisfaction">6. ¿Qué tan satisfecho estás con la información proporcionada sobre los productos, como descripciones, imágenes y precios?</FormLabel>
                            <Select
                                name="productInformationSatisfaction"
                                value={formData.productInformationSatisfaction}
                                onChange={handleChange}
                                placeholder='Elija una opción'
                            >
                                <option value="Muy satisfecho">Muy satisfecho</option>
                                <option value="Satisfecho">Satisfecho</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Insatisfecho">Insatisfecho</option>
                                <option value="Muy insatisfecho">Muy insatisfecho</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="usedSearchFunction">7. ¿Has utilizado la función de búsqueda en la plataforma? Si es así, ¿fue efectiva?</FormLabel>
                            <Select
                                name="usedSearchFunction"
                                value={formData.usedSearchFunction}
                                onChange={handleChange}
                                placeholder='Elija una opción'
                            >
                                <option value="Sí, fue efectiva">Sí, fue efectiva</option>
                                <option value="Sí, pero no fue efectiva">Sí, pero no fue efectiva</option>
                                <option value="No, no la utilicé">No, no la utilicé</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="trackingOrderEase">8. ¿Te resultó fácil realizar un seguimiento de tu pedido, recibir notificaciones y acceder a información de envío?</FormLabel>
                            <Select
                                name="trackingOrderEase"
                                value={formData.trackingOrderEase}
                                onChange={handleChange}
                                placeholder='Elija una opción'
                            >
                                <option value="Sí, fue muy fácil">Sí, fue muy fácil</option>
                                <option value="Sí, pero podría mejorar">Sí, pero podría mejorar</option>
                                <option value="No, fue complicado">No, fue complicado</option>
                            </Select>
                        </FormControl>

                        <FormControl mb={8}>
                            <FormLabel htmlFor="recommendStore">9. ¿Recomendarías nuestra tienda en línea a otras personas interesadas en productos de plantas y jardinería?</FormLabel>
                            <Select
                                name="recommendStore"
                                value={formData.recommendStore}
                                onChange={handleChange}
                                placeholder='Elija una opción'
                            >
                                <option value="Definitivamente">Definitivamente</option>
                                <option value="Probablemente">Probablemente</option>
                                <option value="No estoy seguro">No estoy seguro</option>
                                <option value="Probablemente no">Probablemente no</option>
                                <option value="Definitivamente no">Definitivamente no</option>
                            </Select>
                        </FormControl>
                        <FormControl mb={8}>
                            <FormLabel htmlFor="additionalComments">10. ¿Tienes alguna sugerencia o comentario adicional sobre la usabilidad de nuestra plataforma que nos ayude a mejorar?</FormLabel>
                            <Textarea
                                name="additionalComments"
                                value={formData.additionalComments}
                                onChange={handleChange}
                                placeholder="Escribe tus comentarios aquí"
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" colorScheme="teal">
                                Enviar respuestas
                            </Button>
                        </Box>

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