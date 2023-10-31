import { VStack, Container, Card, CardBody, CardHeader, Heading,StackDivider, Stack, Box, Text } from '@chakra-ui/react'

const FAQ = () => {
    return (
        <VStack>
            <Container maxW='550px' bg='green.400' color='white'>
                <Card>
                    <CardHeader>
                        <Heading size='md'>Preguntas y dudas frecuentes</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ¿Cuantos días tarda el envio?
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Dependiendo de la lejania podrían ser de al dia siguiente o 2-3 Dias como máximo.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ¿Que paqueterías usa?
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Se utilizan Paterias Fedex,DHL y Paqueteria castores en caso de pedidos grandes opcional y dependiendo de zona en pedidos grandes se puede entregar personalmente.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ¿Cual es el costo del envio?
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Para clientes frecuentes y para pedidos de mas de $500 el envio es totalmente gratis, para nuevos usuarios y compras menores ronda entre $100 y $200.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ¿Cual es el volumen máximo de compra?
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Este podría ser hasta 1 millar de flores dependiendo de la disponibilidad y temporada
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ¿Que métodos de pago aceptas? 
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Somos muy flexibles en el método de pago aceptando pagos por tarjeta, Paypal,Tranferencia Bancaria, Oxxo y efectivo.
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ¿Manejas entrega personal?
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Si manejamos la entrega personal en grandes pedidos
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                ¿Se puede generar pedidos para eventos especiales?
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                Claro que si, con tiempo de anticipación y sujeto a la temporada podemos surtir toda clase de eventos, como XV años, Bodas,Presentaciones,Bautizos Graduaciones etc
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            </Container>
        </VStack>
    );
};

export default FAQ;
