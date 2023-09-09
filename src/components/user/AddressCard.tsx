import { FC, useId } from "react"

import { Shipping } from "@/interfaces"
import { Box, HStack, Heading, IconButton, Stack, Text } from "@chakra-ui/react"
import { FiTrash } from "react-icons/fi"

const AddressCard: FC<Shipping> = (values): JSX.Element => {
    const id = useId()
    
    return (
        <Box key={id} as='section' border='1px' borderColor='gray.300' borderRadius='lg' p={4} w={['xs', 'sm', 'lg', '2xl']}>
            <Stack spacing={2}>
                <HStack width='100%' justifyContent='space-between' alignItems='center'>
                    <Heading size='lg'>{values.names}</Heading>
                    <IconButton aria-label="delete-address" colorScheme="red" icon={<FiTrash />} />
                </HStack>
                <Text fontSize='md'><strong>Dirección:</strong> {values.address}</Text>
                <Text fontSize='md'><strong>Estado:</strong> {values.state}</Text>
                <Text fontSize='md'><strong>Ciudad:</strong> {values.city}</Text>
                <Text fontSize='md'><strong>Colonia:</strong> {values.colony}</Text>
                <Text fontWeight={600}>{values.zip}</Text>
            </Stack>
        </Box>
    )
}
export default AddressCard