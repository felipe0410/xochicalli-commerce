import { FC, lazy, useContext } from 'react'

import { Center, FormControl, FormLabel, Heading, Input, Stack, VStack } from '@chakra-ui/react'

import { UserContext } from '@/context'

const SecurityModal = lazy(() => import('@/components/auth/SecurityModal'))

const Security: FC = (): JSX.Element => {
    const { userInformation } = useContext(UserContext)

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Center bg='white' p={[6, 8]} borderRadius='lg' w={['sm', 'lg', 'xl', '2xl']}>
                <VStack spacing={6} w='full'>
                    <Heading>Seguridad de la cuenta</Heading>
                    <Stack spacing={4} w='full'>
                        <FormControl>
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input value={userInformation!.email} readOnly />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Contraseña</FormLabel>
                            <Input value='********' readOnly />
                        </FormControl>
                    </Stack>
                    <SecurityModal />
                </VStack>
            </Center>
        </VStack>
    )
}
export default Security