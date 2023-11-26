import { useLottie } from "lottie-react";
import scan from "../../../public/animation/payment.json";
import { useContext, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context";
import { saveShopping } from "@/utils";

const Loading = () => {
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
        const timeoutId = setTimeout(() => {
            // Redirige a la ruta deseada después de 5000 milisegundos (5 segundos)
            navigate('/products');
        }, 5000);
        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, displayedText]);

    useEffect(() => {
        if (step === 0) {
            console.log('entro')
            setStep(1)
            saveShopping(cart, total, uid)
            clearCart()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Box style={{
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Text
                style={{
                    fontFamily: "Fira Sans",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "30px",
                    lineHeight: "111%",
                    marginTop: '20px',
                    marginBottom: '-5%'
                }}
            >
                {displayedText}
            </Text>
            <Box style={{ width: '60%' }} id="container lottie">
                {View}
            </Box>
        </Box>
    );
};
export default Loading;
