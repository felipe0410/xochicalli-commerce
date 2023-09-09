import { FC } from 'react'

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'

export const ErrorBoundaryComponent: FC = (): JSX.Element => {
    return (
        <VStack h='100vh' justifyContent='center' bgGradient='linear(to-b, gray.700, gray.800)' px={[4, 0]}>
            <Box bgColor='whiteAlpha.100' width='100' p={4} rounded='lg'>
                <Heading textAlign='center' color='gray.100'>Se ha detecado un problema interno 😵‍💫</Heading>
                <Text
                    textAlign='center'
                    my={2}
                    color='gray.100'
                >
                    Actualiza la página haciendo click <Button variant='link' colorScheme='blue' onClick={() => window.location.reload()}>aquí</Button>
                </Text>
            </Box>
        </VStack>
    )
}
