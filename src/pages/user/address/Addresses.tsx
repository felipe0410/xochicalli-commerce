import { FC, lazy, useContext } from 'react'

import { Center, Heading, Stack, Text, VStack } from '@chakra-ui/react'

import { UserContext } from '@/context'
import { AddressCard } from '@/components/user'
import { Shipping } from '@/interfaces'

const AddAddressModal = lazy(() => import('@/components/user/AddAddressModal'))

const Addresses: FC = (): JSX.Element => {
    const { userInformation } = useContext(UserContext)

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'md', 'xl', '3xl']}>
                <VStack spacing={6} w='full'>
                    <Heading>Tus direcciones</Heading>

                    <AddAddressModal />

                    {
                        userInformation!.address === null
                            ? <Text>No tienes direcciones actualmente</Text>
                            : <Stack spacing={6}>
                                {userInformation!.address!.map((address: Shipping) => (
                                    <AddressCard {...address} />
                                ))}
                            </Stack>
                    }

                </VStack>
            </Center>
        </VStack>
    )
}
export default Addresses