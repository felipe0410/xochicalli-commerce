import { FC, useContext } from "react";

import {
    Accordion, AccordionButton, AccordionIcon, Icon, AccordionItem, AccordionPanel,
    Avatar, Box, Button, CloseButton, Divider, Flex, HStack, IconButton, Image, Link,
    Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger,
    Text, useDisclosure, useMediaQuery, VStack, PopoverHeader, Badge
} from "@chakra-ui/react";
import { FiBox, FiMenu, FiShoppingCart, FiUser, FiMessageSquare, FiMail, FiLogOut } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { UserContext, CartContext } from "@/context";
import { logOut } from "@/utils";

const links = [
    {
        id: 1,
        text: "Productos",
        route: '/products',
        icon: <FiBox />,
    },
    {
        id: 2,
        text: "Blog",
        route: '/blog',
        icon: <FiMessageSquare />,
    },
    {
        id: 3,
        text: "Contacto",
        route: '/contact',
        icon: <FiMail />,
    }
]

const LoggedUserNavbar: FC = (): JSX.Element => {
    const isInLogin = window.location.pathname

    const { userInformation } = useContext(UserContext)
    const { cart } = useContext(CartContext)

    const [isLargerThan860] = useMediaQuery('(min-width: 860px)')
    const mobileNav = useDisclosure();
    const popover = useDisclosure();

    const navigate = useNavigate();

    const onRoute = (toRoute: string) => {
        mobileNav.onClose();
        popover.onClose();
        toRoute.includes('/user/profile') && navigate(`user/profile/${userInformation!.uid}`)
        navigate(toRoute)
    }

    const onLogout = async () => await logOut()

    return (
        <>
            {
                (isInLogin !== '/login' && isInLogin !== '/signup' && isInLogin !== '/checkout') &&
                <Flex
                    as='nav'
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto"
                    bgColor='green.500'
                    w="full"
                    px={{ base: 2, sm: 4, }}
                    py={1}
                    shadow="md"
                >
                    <Link to="/" title="Xochicalli Commerce - Inicio" as={RouterLink}>
                        <Image
                            src={import.meta.env.VITE_ADMIN_LOGIN_IMAGE}
                            alt='Navbar Image'
                            objectFit='cover'
                            fallbackSrc='https://via.placeholder.com/256'
                            loading='lazy'
                            width='64px'
                            borderRadius='lg'
                        />

                    </Link>
                    <HStack display="flex" alignItems="center" spacing={1}>
                        <HStack spacing={[1, 2, 2, 4, 6]} mr={1} color="brand.500" display={["none", "none", "inline-flex"]}>
                            {
                                links.map(({ id, text, route, icon }) => {
                                    return (
                                        !isLargerThan860
                                            ?
                                            <Button color='white' variant='ghost' _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                key={id} onClick={() => onRoute(route)}
                                            >
                                                {text}
                                            </Button>
                                            :
                                            <Button leftIcon={icon} color='white' variant='ghost' _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                                key={id} onClick={() => onRoute(route)}
                                            >
                                                {text}
                                            </Button>
                                    )
                                }
                                )
                            }
                            {
                                !isLargerThan860
                                    ?
                                    <>
                                        <Popover placement="bottom-end" isLazy>
                                            <PopoverTrigger>
                                                <Avatar cursor='pointer' src={userInformation!.profilePicture} name={`${userInformation!.name} ${userInformation!.fatherSurname}`} />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader noOfLines={1} fontWeight={700} fontSize={18}>
                                                    {userInformation!.name} {userInformation!.fatherSurname} {userInformation!.motherSurname}
                                                </PopoverHeader>
                                                <PopoverBody width='xs'>
                                                    <VStack alignItems='flex-start' p={2}>
                                                        <Button
                                                            variant='link'
                                                            colorScheme='black'
                                                            onClick={() => onRoute(`/user/profile/${userInformation!.uid}`)}
                                                        >Mi perfil</Button>
                                                        <Divider my={2} />
                                                        <Button
                                                            variant='link'
                                                            colorScheme='black'
                                                            onClick={() => onRoute(`/user/profile/${userInformation!.uid}`)}
                                                        >Mis compras</Button>
                                                        <Divider my={2} />
                                                        <Button
                                                            leftIcon={<FiLogOut />}
                                                            colorScheme='red'
                                                            onClick={onLogout}
                                                        >Cerrar sesión</Button>
                                                    </VStack>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                        <IconButton
                                            aria-label="Cart"
                                            color='white'
                                            variant='ghost'
                                            _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                            onClick={() => navigate('/cart')}
                                            icon={
                                                <>
                                                    <FiShoppingCart />
                                                    {cart.length > 0 && (
                                                        <Badge
                                                            colorScheme="green"
                                                            position="absolute"
                                                            right="0"
                                                            borderRadius='full'
                                                            top="0"
                                                            w={4}
                                                            h={4}
                                                        >
                                                            {cart.length}
                                                        </Badge>
                                                    )}
                                                </>
                                            }
                                        />
                                    </>
                                    :
                                    <>
                                        <Popover placement="bottom-end" isLazy>
                                            <PopoverTrigger>
                                                <Avatar cursor='pointer' src={userInformation!.profilePicture} name={`${userInformation!.name} ${userInformation!.fatherSurname}`} />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader noOfLines={1} fontWeight={700} fontSize={18}>
                                                    {userInformation!.name} {userInformation!.fatherSurname} {userInformation!.motherSurname}
                                                </PopoverHeader>
                                                <PopoverBody width='xs'>
                                                    <VStack alignItems='flex-start' p={2}>
                                                        <Button
                                                            variant='link'
                                                            colorScheme='black'
                                                            onClick={() => onRoute(`/user/profile/${userInformation!.uid}`)}
                                                        >Mi perfil</Button>
                                                        <Divider my={2} />
                                                        <Button
                                                            variant='link'
                                                            colorScheme='black'
                                                            onClick={() => onRoute(`/user/profile/${userInformation!.uid}`)}
                                                        >Mis compras</Button>
                                                        <Divider my={2} />
                                                        <Button
                                                            leftIcon={<FiLogOut />}
                                                            colorScheme='red'
                                                            onClick={onLogout}
                                                        >Cerrar sesión</Button>
                                                    </VStack>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                        <IconButton
                                            aria-label="Cart"
                                            color='white'
                                            variant='ghost'
                                            _hover={{ bg: 'gray.200', color: 'gray.800' }}
                                            onClick={() => navigate('/cart')}
                                            icon={
                                                <>
                                                    <FiShoppingCart />
                                                    {cart.length > 0 && (
                                                        <Badge
                                                            colorScheme="green"
                                                            position="absolute"
                                                            right="2"
                                                            borderRadius='full'
                                                            top="2"
                                                            w={2}
                                                            h={2}
                                                        />
                                                    )}
                                                </>
                                            }
                                        />
                                    </>
                            }
                        </HStack>
                        <Box display={["inline-flex", "inline-flex", "none"]}>
                            <IconButton display={["flex", "flex", "none"]} aria-label="Open menu" fontSize="20px"
                                variant='ghost'
                                color='white'
                                _hover={{ bgColor: 'whiteAlpha.400' }}
                                icon={<FiMenu />}
                                onClick={mobileNav.onOpen}
                            />

                            <VStack pos="absolute" zIndex={99} top={0} left={0} right={0} display={mobileNav.isOpen ? "flex" : "none"}
                                flexDirection="column" alignItems='flex-end' p={2} pb={4} m={2} bgColor='gray.200' spacing={3}
                                rounded="sm" shadow="sm"
                            >
                                <CloseButton aria-label="Close menu" size='lg' onClick={mobileNav.onClose} />

                                {
                                    links.map(({ id, text, route, icon }) => (
                                        <Button leftIcon={icon} variant='ghost' width='full' _hover={{ bg: 'green.400', color: 'white' }}
                                            key={id} onClick={() => onRoute(route)}
                                        >
                                            {text}
                                        </Button>
                                    ))
                                }
                                <Accordion allowToggle width='100%' rounded='lg'>
                                    <AccordionItem>
                                        <AccordionButton rounded='lg' justifyContent='center'>
                                            <HStack>
                                                <Icon as={FiUser} />
                                                <Text fontWeight={600}>
                                                    Mi perfil
                                                </Text>
                                                <AccordionIcon />
                                            </HStack>
                                        </AccordionButton>
                                        <AccordionPanel pb={0} width='inherit'>
                                            <VStack alignItems='center' p={2}>
                                                <Button
                                                    variant='link'
                                                    colorScheme='black'
                                                    onClick={() => onRoute(`/user/profile/${userInformation!.uid}`)}
                                                >Mi perfil</Button>
                                                <Divider my={2} />
                                                <Button
                                                    variant='link'
                                                    colorScheme='black'
                                                    onClick={() => onRoute(`/user/profile/${userInformation!.uid}`)}
                                                >Mis compras</Button>
                                                <Divider my={2} />
                                                <Button
                                                    variant='link'
                                                    colorScheme='red'
                                                    onClick={onLogout}
                                                >Cerrar sesión</Button>
                                            </VStack>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                                <Button
                                    leftIcon={<FiShoppingCart />}
                                    w="full"
                                    colorScheme='green'
                                    onClick={() => onRoute('/cart')}
                                >
                                    Ver carrito
                                </Button>
                            </VStack>
                        </Box>
                    </HStack>
                </Flex>
            }
        </>
    );
};

export default LoggedUserNavbar;