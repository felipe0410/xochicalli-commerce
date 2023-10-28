import { FC } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const WhatsAppButton: FC = (): JSX.Element => (
  <FloatingWhatsApp
    phoneNumber="+573144098591"
    accountName={"xochicallicommerce"}
    avatar={
      "https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2Flogo.png?alt=media&token=b5a9e3c5-d9f1-469c-9c9d-9af0c5f1cfd9"
    }
    statusMessage={"xochicalli"}
    chatMessage={
      "¡Hola! 👋 Somos xochicallicommerce, en que te podemos colaborar? 🏡🌟"
    }
    darkMode={true}
  />
);

export default WhatsAppButton;
