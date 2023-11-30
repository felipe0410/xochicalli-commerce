import { useLottie } from "lottie-react";
import scan from "../../../public/animation/payment.json";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Card, CardBody, CardHeader, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context";
import { saveShopping } from "@/utils";

const Loading = () => {
    const [send, setSend] = useState(true)
    const { cart, total, clearCart } = useContext(CartContext);
    const uid = localStorage.getItem("uid");
    const [displayedText, setDisplayedText] = useState("");
    const [step, setStep] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0);
    const fullText = "Pago exitoso ....";
    const options = {
        animationData: scan,
        loop: true,
    };
    const [data, setData] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
    })
    const { View } = useLottie(options);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setDisplayedText(displayedText + fullText[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            } else {
                setDisplayedText("");
                setCurrentIndex(0);
            }
        }, 200);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars

        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, displayedText]);

    useEffect(() => {
        if (step === 0) {
            setStep(1)
            saveShopping(cart, total, uid)
            clearCart()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClick = () => {
        setSend(true)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setTimeout(() => {
            navigate('/products');
        }, 5000);

    }

    const onChange = (input: any, value: any) => {
        setData({ ...data, [input]: value })
    }

    const validation = () => {
        return Object.values(data).includes('')
    }

    return (
        <Box style={{
            margin: '0 auto',
            height: '72vh  ',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            placeContent: 'center'
        }}>
            {!send
                ? <Card variant={'elevated'}>
                    <CardHeader>
                        <Heading size='md'>Encuesta de satisfaccion</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack spacing={5}>
                            <Text>
                                {'1-)te resulto facil realizar la compra ?'}
                            </Text>
                            <Input onChange={(e) => onChange('question1', e.target.value)} placeholder='si ....' />
                            <Text>
                                {'2-) experimentaste problemas tecnicos al realizar la compra ?'}
                            </Text>
                            <Input onChange={(e) => onChange('question2', e.target.value)} placeholder='No experimente ningn problema ....' />
                            <Text>
                                {'3-) la informacion proporcionada como descripciones,imagenes y precios fue de ayuda ?'}
                            </Text>
                            <Input onChange={(e) => onChange('question3', e.target.value)} placeholder='Las descripciones fueron oportunas ...' />
                            <Text>
                                {'4-)tienes alguna sugerencia o comentario adicional sobre la usabilidad de nuestra plataforma que nos ayude a mejorar ?'}
                            </Text>
                            <Input onChange={(e) => onChange('question4', e.target.value)} placeholder='Muy buen servicio ...' />
                            <Button isActive={validation()} onClick={() => !validation() && onClick()} colorScheme='blue'>Enviar</Button>
                        </Stack>
                    </CardBody>
                </Card>
                : <>
                </>}
            <Box style={{ display: send ? 'block' : 'none', margin: '0 auto' }}>
                <Text
                    style={{
                        fontFamily: "Fira Sans",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "30px",
                        lineHeight: "111%",
                        marginTop: '20px',
                        marginBottom: '-5%',
                        textAlign: 'center'
                    }}
                >
                    {displayedText}
                </Text>
                <Box style={{ width: '65%', margin: '0 auto' }} id="container lottie">
                    {View}
                </Box>
            </Box>
        </Box>
    );
};
export default Loading;
