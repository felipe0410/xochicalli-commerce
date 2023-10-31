import { VStack, Container, Card, CardBody, CardHeader, Heading, StackDivider, Stack, Box, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

const FAQ = () => {
    const [uno, setUno] = useState(false);
    const [dos, setDos] = useState(false);
    const [tres, setTres] = useState(false);
    const [cuatro, setCuatro] = useState(false);
    const [cinco, setCinco] = useState(false);
    const [seis, setSeis] = useState(false);
    const [siete, setSiete] = useState(false);

    return (
        <VStack>
            <Container maxW='550px' bg='green.400' color='white'>
                <Card>
                    <CardHeader>
                        <Heading size='md'>Preguntas y dudas frecuentes</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box onClick={() => setUno(!uno)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        ¿Cuantos días tarda el envio?
                                    </Heading>
                                    <Button size="sm" sx={{ backgroundColor: "green.400" }}>
                                        <Text fontSize='sm' color={'white'} fontWeight={'bold'}>
                                            {uno ? '-' : '+'}
                                        </Text>
                                    </Button>
                                </Box>
                                {uno && <Text pt='2' fontSize='sm'>
                                    Dependiendo de la lejanía podrían ser de al día siguiente o 2-3 Días como máximo.
                                </Text>}
                            </Box>
                            <Box onClick={() => setDos(!dos)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        ¿Que paqueterías usa?
                                    </Heading>
                                    <Button size="sm" sx={{ backgroundColor: "green.400" }}><Text fontSize='sm' color={'white'} fontWeight={'bold'}>
                                        {dos ? '-' : '+'}
                                    </Text></Button>
                                </Box>
                                {dos && <Text pt='2' fontSize='sm'>
                                    Se utilizan Paqueterías FedEx, DHL y Paquetería Castores en caso de pedidos grandes, opcional y dependiendo de la zona en pedidos grandes se puede entregar personalmente.
                                </Text>}
                            </Box>
                            <Box onClick={() => setTres(!tres)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        ¿Cual es el costo del envío?
                                    </Heading>
                                    <Button size="sm" sx={{ backgroundColor: "green.400" }}><Text fontSize='sm' color={'white'} fontWeight={'bold'}>
                                        {tres ? '-' : '+'}
                                    </Text></Button>
                                </Box>
                                {tres && <Text pt='2' fontSize='sm'>
                                    Para clientes frecuentes y para pedidos de más de $500, el envío es totalmente gratis. Para nuevos usuarios y compras menores, ronda entre $100 y $200.
                                </Text>}
                            </Box>
                            <Box onClick={() => setCuatro(!cuatro)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        ¿Cual es el volumen máximo de compra?
                                    </Heading>
                                    <Button size="sm" sx={{ backgroundColor: "green.400" }}><Text fontSize='sm' color={'white'} fontWeight={'bold'}>
                                        {cuatro ? '-' : '+'}
                                    </Text></Button>
                                </Box>
                                {cuatro && <Text pt='2' fontSize='sm'>
                                    Este podría ser hasta 1 millar de flores dependiendo de la disponibilidad y temporada.
                                </Text>}
                            </Box>
                            <Box onClick={() => setCinco(!cinco)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        ¿Que métodos de pago aceptas?
                                    </Heading>
                                    <Button size="sm" sx={{ backgroundColor: "green.400" }}><Text fontSize='sm' color={'white'} fontWeight={'bold'}>
                                        {cinco ? '-' : '+'}
                                    </Text></Button>
                                </Box>
                                {cinco && <Text pt='2' fontSize='sm'>
                                    Somos muy flexibles en el método de pago aceptando pagos por tarjeta, Paypal, Transferencia Bancaria, Oxxo y efectivo.
                                </Text>}
                            </Box>
                            <Box onClick={() => setSeis(!seis)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        ¿Manejas entrega personal?
                                    </Heading>
                                    <Button size="sm" sx={{ backgroundColor: "green.400" }}><Text fontSize='sm' color={'white'} fontWeight={'bold'}>
                                        {seis ? '-' : '+'}
                                    </Text></Button>
                                </Box>
                                {seis && <Text pt='2' fontSize='sm'>
                                    Sí manejamos la entrega personal en grandes pedidos.
                                </Text>}
                            </Box>
                            <Box onClick={() => setSiete(!siete)}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Heading size='xs' textTransform='uppercase'>
                                        ¿Se puede generar pedidos para eventos especiales?
                                    </Heading>
                                    <Button size="sm" sx={{ backgroundColor: "green.400" }}><Text fontSize='sm' color={'white'} fontWeight={'bold'}>
                                        {siete ? '-' : '+'}
                                    </Text></Button>
                                </Box>
                                {siete && <Text pt='2' fontSize='sm'>
                                    Claro que sí, con tiempo de anticipación y sujeto a la temporada podemos surtir toda clase de eventos, como XV años, Bodas, Presentaciones, Bautizos, Graduaciones, etc.
                                </Text>}
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            </Container>
        </VStack>
    );
};

export default FAQ;
