import { FC } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FacebookIcon,
  InstagramIcon,
  MasterCardLogo,
  TwitterIcon,
  VisaLogo,
} from "./checkout";
import { useNavigate } from "react-router-dom";




const Footer: FC = (): JSX.Element => {

  const navigate = useNavigate();

  return (

    <Stack
      as="footer"
      role="contentinfo"
      py="4"
      minWidth="100%"
      bgColor="green.400"
    >
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack
          justify="space-evenly"
          direction={["column", "row"]}
          align="center"
        >
          <HStack justifyContent="center">
            <Image
              src={
                import.meta.env.VITE_ADMIN_LOGIN_IMAGE ??
                "https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/o/assets%2Flogo.png?alt=media&token=b5a9e3c5-d9f1-469c-9c9d-9af0c5f1cfd9"
              }
              alt="Footer Image"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/256"
              loading="lazy"
              width={["64px", "128px"]}
              borderRadius="lg"
            />
          </HStack>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button sx={{ color: 'black', marginBottom: 2 }} variant='link' onClick={() => navigate("/faqs")}>
              Preguntas frecuentes
            </Button>
            <Button sx={{ color: 'black', marginBottom: 2 }} variant='link' onClick={() => navigate("/questions")}>
              Encuesta de satisfacción
            </Button>
            <Button sx={{ color: 'black' }} variant='link' onClick={() => navigate("/privacy-policy")}>
              Políticas de privacidad
            </Button>
          </Box>
          <HStack>
            <Text fontWeight={600}>Síguenos en:</Text>
            <ButtonGroup variant="ghost" spacing={["2", "3"]}>
              <IconButton
                as="a"
                target="_blank"
                href="https://facebook.com/"
                aria-label="Facebook"
                icon={<FacebookIcon />}
              />
              <IconButton
                as="a"
                href="https://instagram.com/"
                target="_blank"
                aria-label="Instagram"
                icon={<InstagramIcon />}
              />
              <IconButton
                as="a"
                href="https://twitter.com/"
                target="_blank"
                aria-label="Twitter"
                icon={<TwitterIcon />}
              />
            </ButtonGroup>
          </HStack>
        </Stack>
        <Stack
          direction={["column", "row"]}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Text fontSize="sm" color="subtle" textAlign="center">
            &copy; {new Date().getFullYear()} Xochicalli Tienda. Todos los
            derechos reservados.
          </Text>
          <Center gap={4}>
            <VisaLogo />
            <MasterCardLogo />
          </Center>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Footer;
