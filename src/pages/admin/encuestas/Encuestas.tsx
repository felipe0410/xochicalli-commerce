import { useEffect, useState } from "react";
import {
    Accordion, AccordionButton, AccordionIcon,
    AccordionItem, AccordionPanel, List, ListItem,
    Box,
    Text,
    VStack,
    Center,
    Stack,
    Progress
} from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';



const Encuestas = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const questionTen = {
        question: '10. ¿Tienes alguna sugerencia o comentario adicional sobre la usabilidad de nuestra plataforma que nos ayude a mejorar?',
        key: 'additionalComments',
    }


    const questionMappings = [
        {
            question: '1. ¿Con qué frecuencia visitas nuestra tienda en línea de productos de plantas y jardinería?',
            key: 'frequency',
            responses: [
                'Diariamente',
                'Semanalmente',
                'Mensualmente',
                'Ocasionalmente',
            ],
        },
        {
            question: '2. ¿Cómo calificarías la facilidad de navegación en nuestra plataforma?',
            key: 'navigationEase',
            responses: [
                'Muy fácil',
                'Fácil',
                'Neutral',
                'Difícil',
                'Muy difícil',
            ],
        },
        {
            question: '3. ¿Has encontrado que la organización de las categorías y productos es intuitiva?',
            key: 'intuitiveOrganization',
            responses: ['Sí', 'No'],
        },
        {
            question: '4. ¿Cuál es tu opinión sobre la velocidad de carga de la página?',
            key: 'pageSpeed',
            responses: [
                'Excelente',
                'Buena',
                'Aceptable',
                'Lenta',
                'Muy lenta',
            ],
        },
        {
            question: '5. ¿Experimentaste problemas técnicos al realizar una compra, como errores de pago o procesamiento?',
            key: 'technicalProblems',
            responses: ['Sí', 'No'],
        },
        {
            question: '6. ¿Qué tan satisfecho estás con la información proporcionada sobre los productos, como descripciones, imágenes y precios?',
            key: 'productInformationSatisfaction',
            responses: [
                'Muy satisfecho',
                'Satisfecho',
                'Neutral',
                'Insatisfecho',
                'Muy insatisfecho',
            ],
        },
        {
            question: '7. ¿Has utilizado la función de búsqueda en la plataforma? Si es así, ¿fue efectiva?',
            key: 'usedSearchFunction',
            responses: [
                'Sí, fue efectiva',
                'Sí, pero no fue efectiva',
                'No, no la utilicé',
            ],
        },
        {
            question: '8. ¿Te resultó fácil realizar un seguimiento de tu pedido, recibir notificaciones y acceder a información de envío?',
            key: 'trackingOrderEase',
            responses: [
                'Sí, fue muy fácil',
                'Sí, pero podría mejorar',
                'No, fue complicado',
            ],
        },
        {
            question: '9. ¿Recomendarías nuestra tienda en línea a otras personas interesadas en productos de plantas y jardinería?',
            key: 'recommendStore',
            responses: [
                'Definitivamente',
                'Probablemente',
                'No estoy seguro',
                'Probablemente no',
                'Definitivamente no',
            ],

        },
        {
            question: '10. ¿Tienes alguna sugerencia o comentario adicional sobre la usabilidad de nuestra plataforma que nos ayude a mejorar?',
            key: 'additionalComments',
            responses: [''],
        },

    ];



    useEffect(() => {
        const fetchQuestions = async () => {
            const questionDocs = [];
            const querySnapshot = await getDocs(collection(db, 'questions'));
            querySnapshot.forEach((doc) => {
                questionDocs.push(doc.data());
            });
            setQuestions(questionDocs);
            console.log(questionDocs)
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
            const mappedQuestion = questionMappings.find(item => item.key === key);
            if (mappedQuestion) {
                if (!groupedAnswers[mappedQuestion.key]) {
                    groupedAnswers[mappedQuestion.key] = [];
                }
                groupedAnswers[mappedQuestion.key].push({ pregunta: index + 1, respuesta: value });
            }
        });
    });

    const countResponses = (question, response) => {
        return questions.filter(answer => answer[question.key] === response).length;
    };

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Text fontSize='xl' as='b'>RESPUESTAS A ENCUESTAS</Text>
            <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>
                <Accordion allowToggle>
                    {questionMappings.map((question) => (
                        <AccordionItem key={question.key}>
                            <Text>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        {question.question}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </Text>
                            <AccordionPanel>
                                <List style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                                    {question.key === 'additionalComments' ? (
                                        questions.map((response, index) => (
                                            <ListItem key={index}>
                                                {index + 1} - {response.additionalComments}
                                            </ListItem>
                                        ))
                                    ) : (
                                        question.responses.map((response, index) => (
                                            <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <strong>{response}</strong>
                                                <Progress value={(countResponses(question, response) / questions.length) * 100} size="sm" w="60%" colorScheme="green" />
                                                <strong>{countResponses(question, response)}</strong>
                                            </ListItem>
                                        ))
                                    )}
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