import { FC, useRef } from 'react'

import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Icon, Text, useDisclosure, } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaAlignRight } from 'react-icons/fa'

import { SignOutModal } from './'
import { ActiveUser } from '@/interfaces'

const Sidebar: FC<ActiveUser> = ({ isUser }): JSX.Element => {
    const btnRef = useRef<HTMLButtonElement | any>()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate();

    const handleNavigate = (route: string) => {
        onClose()
        navigate(route)
    }

    return (
        <>
            <Button ref={btnRef} colorScheme='whiteAlpha' onClick={onOpen}><Icon as={FaAlignRight} /></Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>¡Hola, usuario!</DrawerHeader>
                    <DrawerBody>
                        <Text mb={2.5} onClick={onClose}>
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/add')}>
                                Agregar producto
                            </Button>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/products')}>
                                Productos
                            </Button>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/user')}>
                                Usuarios
                            </Button>
                        </Text>
                        <Divider />
                        <Text my={2.5} onClick={onClose}>
                            <Button color='black' fontWeight='normal' variant='link' onClick={() => handleNavigate('/admin/dashboard')}>
                                Ventas
                            </Button>
                        </Text>
                    </DrawerBody>
                    {
                        isUser && (
                            <DrawerFooter>
                                <SignOutModal />
                            </DrawerFooter>
                        )
                    }
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sidebar;