import { FC } from 'react'

import { Avatar, Box, Stack, Text } from '@chakra-ui/react'

import { CommentInfo } from '@/interfaces'

const Comment: FC<CommentInfo> = (commentInfo) => (
    <Box p={4} borderRadius='md' bgColor='gray.100' minWidth={['full', 350]} maxWidth={['full', 350]}>
        <Stack direction='row' alignItems='center'>
            <Avatar src={commentInfo.avatar as string} name={commentInfo?.name as string} />
            <Text fontWeight={600}>{commentInfo?.name} {commentInfo?.fatherSurname}</Text>
        </Stack>
        <Text noOfLines={3} my={2}>{commentInfo?.comment}</Text>
        <Text fontWeight={600}>Fecha: {new Date().toLocaleDateString()}</Text>
    </Box>
)

export default Comment