import { useEffect, useState } from "react";
import {
    Accordion, AccordionButton, AccordionIcon,
    AccordionItem, AccordionPanel, List, ListItem,
    Box,
    Text,
    VStack,
    Center,
    Stack
} from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';



const Encuestas = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);


    const questionMappings = {
        '1. ¿Con qué frecuencia visitas nuestra tienda en línea de productos de plantas y jardinería?': 'frequency',
        '2. ¿Cómo calificarías la facilidad de navegación en nuestra plataforma?': 'navigationEase',
        '3. ¿Has encontrado que la organización de las categorías y productos es intuitiva?': 'intuitiveOrganization',
        '4. ¿Cuál es tu opinión sobre la velocidad de carga de la página?': 'pageSpeed',
        '5. ¿Experimentaste problemas técnicos al realizar una compra, como errores de pago o procesamiento?': 'technicalProblems',
        '6. ¿Qué tan satisfecho estás con la información proporcionada sobre los productos, como descripciones, imágenes y precios?': 'productInformationSatisfaction',
        '7. ¿Has utilizado la función de búsqueda en la plataforma? Si es así, ¿fue efectiva?': 'usedSearchFunction',
        '8. ¿Te resultó fácil realizar un seguimiento de tu pedido, recibir notificaciones y acceder a información de envío?': 'trackingOrderEase',
        '9. ¿Recomendarías nuestra tienda en línea a otras personas interesadas en productos de plantas y jardinería?': 'recommendStore',
        '10. ¿Tienes alguna sugerencia o comentario adicional sobre la usabilidad de nuestra plataforma que nos ayude a mejorar?': 'additionalComments',
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const questionDocs = [];
            const querySnapshot = await getDocs(collection(db, 'questions'));
            querySnapshot.forEach((doc) => {
                questionDocs.push(doc.data());
            });
            setQuestions(questionDocs);
            setLoading(false);
        };

        fetchQuestions();
    }, []);

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

    const groupedAnswers = {};

    questions.forEach((question, index) => {
        Object.entries(question).forEach(([key, value]) => {
            const mappedKey = questionMappings[key];
            if (!groupedAnswers[mappedKey]) {
                groupedAnswers[mappedKey] = [];
            }
            groupedAnswers[mappedKey].push({ pregunta: index + 1, respuesta: value });
        });
    });

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Text fontSize='xl' as='b'>RESPUESTAS A ENCUESTAS</Text>
            <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>
                <Accordion allowToggle>
                    {Object.entries(questionMappings).map(([questionText, key]) => (
                        <AccordionItem key={key}>
                            <Text>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        {questionText}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </Text>
                            <AccordionPanel>
                                <List>
                                    {questions.map((answer, index) => (
                                        <ListItem key={index}>
                                            <strong>Respuesta {index + 1}:</strong> {answer[key]}
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Center>
        </VStack>
    )
}

export default Encuestas