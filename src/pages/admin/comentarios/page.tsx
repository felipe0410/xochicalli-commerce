import { Avatar, Box, Stack, Text } from "@chakra-ui/react"

const Comentarios = () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    return (
        <Box style={{
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
        }}>
            {array.map((e) => (
                <Box key={e} p={4} marginY={'20px'} borderRadius='md' bgColor='gray.100' minWidth={['full', 350]} maxWidth={['full', 350]}>
                    <Stack direction='row' alignItems='center'>
                        <Avatar src={"" as string} name={"commentInfo?.name" as string} />
                        <Text fontWeight={600}>{"commentInfo?.name"} {"commentInfo?.fatherSurname"}</Text>
                    </Stack>
                    <Text noOfLines={3} my={2}>{"commentInfo?.comment"}</Text>
                    <Text fontWeight={600}>Fecha: {new Date().toLocaleDateString()}</Text>
                </Box>
            ))}
        </Box>
    )
}

export default Comentarios