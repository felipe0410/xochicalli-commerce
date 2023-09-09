import { FC } from "react"

import { Avatar, Card, CardBody, CardHeader, HStack, Text } from "@chakra-ui/react"

import { UserHeaderCardProps } from "@/interfaces"

const UserHeaderCard: FC<UserHeaderCardProps> = ({ createdAt, imageURL, name }) => {
    return (
        <Card direction={['column', 'row']} alignItems={['center']} width={['xs', 'md', 'lg', 'lg', '2xl']}>
            <CardHeader>
                <Avatar size='2xl' name={name} src={imageURL} />
            </CardHeader>
            <CardBody>
                <HStack alignItems='center'>
                    <Text fontSize={[15, 13, 15, 16, 20]} fontWeight={700}>Nombre:</Text>
                    <Text fontSize={[15, 13, 15, 16, 20]} fontWeight={500} noOfLines={1}>{name ? name : 'Loading...'}</Text>
                </HStack>
                <Text fontSize={12}>Miembro desde: {createdAt ? createdAt : 'Loading...'}</Text>
            </CardBody>
        </Card>
    )
}
export default UserHeaderCard