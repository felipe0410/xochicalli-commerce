import { FC } from "react";

import {
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

const Footer: FC = (): JSX.Element => (
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

export default Footer;
