/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useContext } from 'react'

import { Button, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Stack, useColorModeValue } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';

import { UserContext } from '@/context';

const ShippingInformation: FC = (): JSX.Element => {
    const { userInformation } = useContext(UserContext)

    const uid = localStorage.getItem('uid')

    const navigate = useNavigate();

    return (
        <Stack spacing={{ base: '6', md: '8' }}>
            <Stack direction='row' spacing={8}>
                <IconButton aria-label='back' icon={<ArrowBackIcon />} onClick={() => navigate('/cart')} w='max-content' />
                <Heading size="lg">Información de envío</Heading>
            </Stack>
            <Stack spacing={{ base: '6', md: '6' }}>
                {
                    userInformation!.address === null
                        ? <Button onClick={() => navigate(`/user/profile/${uid}/addresses`)} colorScheme='blue' variant='link'>Agrega una dirección primero</Button>
                        : <>
                            < FormControl id="name">
                                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Nombres y apellidos</FormLabel>
                                <Input
                                    readOnly
                                    name="name"
                                    placeholder="Callie Nun"
                                    focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    value={userInformation!.address[0].names}
                                />
                            </FormControl>
                            <FormControl id="street">
                                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Dirección completa</FormLabel>
                                <Input
                                    readOnly
                                    name="name"
                                    placeholder="123 Ejemplo St"
                                    focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    value={userInformation!.address[0].address}
                                />
                            </FormControl>
                            <SimpleGrid columns={2} spacing="6">
                                <FormControl id="zip" maxW="32">
                                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Código postal</FormLabel>
                                    <Input
                                        readOnly
                                        name="zip"
                                        placeholder="03100"
                                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                        value={userInformation!.address[0].zip}
                                    />
                                </FormControl>
                                <FormControl id="state">
                                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Estado</FormLabel>
                                    <Input
                                        readOnly
                                        name="state"
                                        value={userInformation!.address[0].state}
                                        placeholder="Tamaulipas"
                                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    />
                                </FormControl>
                                <FormControl id="city">
                                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Ciudad</FormLabel>
                                    <Input
                                        readOnly
                                        name="city"
                                        value={userInformation!.address[0].city}
                                        placeholder="Victoria"
                                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    />
                                </FormControl>
                                <FormControl id="colony">
                                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Colonia</FormLabel>
                                    <Input
                                        readOnly
                                        name="colony"
                                        value={userInformation!.address[0].colony}
                                        placeholder="Puebla"
                                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    />
                                </FormControl>
                            </SimpleGrid>
                            <FormControl id="email">
                                <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Correo electrónico</FormLabel>
                                <Input
                                    readOnly
                                    name="email"
                                    placeholder="you@exmaple.com"
                                    focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    value={userInformation!.email}
                                />
                            </FormControl>
                        </>
                }
            </Stack>
        </Stack >
    )
}

export default ShippingInformation;