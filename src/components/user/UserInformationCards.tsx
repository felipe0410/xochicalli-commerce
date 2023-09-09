import { FC } from "react"

import { Box, Card, CardBody, Divider, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom";
import { FiArrowRight, FiUser, FiAlertCircle, FiLock, FiCreditCard, FiMapPin } from "react-icons/fi"

interface UserInformationCardProps {
    uid: string | undefined;
    hasCompletedInformation: () => boolean;
}

const UserInformationCards: FC<UserInformationCardProps> = ({ uid, hasCompletedInformation }): JSX.Element => {
    return (
        <Card>
            <CardBody width={['xs', 'md', 'lg', '2xl']}>
                <Box as={RouterLink} to={`/user/profile/${uid}/information`}>
                    <HStack gap={4}>
                        <Icon as={FiUser} boxSize={8} />
                        <HStack justifyContent='space-between' width='100%'>
                            <VStack alignItems='flex-start'>
                                <Heading>Mis datos</Heading>
                                <Text>Gestiona tu información personal</Text>
                            </VStack>
                            <VStack alignItems='flex-end' gap={2}>
                                <Icon as={FiArrowRight} boxSize={6} />
                                {!hasCompletedInformation &&
                                    <HStack alignItems='center' color='red.400'>
                                        <Text>Completar registro</Text>
                                        <Icon as={FiAlertCircle} />
                                    </HStack>
                                }
                            </VStack>
                        </HStack>
                    </HStack>
                </Box>
                <Divider my={4} />
                <Box as={RouterLink} to={`/user/profile/${uid}/security`}>
                    <HStack gap={4}>
                        <Icon as={FiLock} boxSize={8} />
                        <HStack justifyContent='space-between' width='100%'>
                            <VStack alignItems='flex-start'>
                                <Heading>Seguridad</Heading>
                                <Text>Configura la seguridad de tu cuenta</Text>
                            </VStack>
                            <VStack alignItems='flex-end' gap={2}>
                                <Icon as={FiArrowRight} boxSize={6} />
                                {!hasCompletedInformation &&
                                    <HStack alignItems='center' color='red.400'>
                                        <Text>Completar registro</Text>
                                        <Icon as={FiAlertCircle} />
                                    </HStack>
                                }
                            </VStack>
                        </HStack>
                    </HStack>
                </Box>
                <Divider my={4} />
                <Box as={RouterLink} to={`/user/profile/${uid}/cards`}>
                    <HStack gap={4}>
                        <Icon as={FiCreditCard} boxSize={8} />
                        <HStack justifyContent='space-between' width='100%'>
                            <VStack alignItems='flex-start'>
                                <Heading>Mis tarjetas</Heading>
                                <Text>Gestiona tus tarjetas</Text>
                            </VStack>
                            <VStack alignItems='flex-end' gap={2}>
                                <Icon as={FiArrowRight} boxSize={6} />
                                {!hasCompletedInformation &&
                                    <HStack alignItems='center' color='red.400'>
                                        <Text>Completar registro</Text>
                                        <Icon as={FiAlertCircle} />
                                    </HStack>
                                }
                            </VStack>
                        </HStack>
                    </HStack>
                </Box>
                <Divider my={4} />
                <Box as={RouterLink} to={`/user/profile/${uid}/addresses`}>
                    <HStack gap={4}>
                        <Icon as={FiMapPin} boxSize={8} />
                        <HStack justifyContent='space-between' width='100%'>
                            <VStack alignItems='flex-start'>
                                <Heading>Direcciones</Heading>
                                <Text>Configura tu domicilio</Text>
                            </VStack>
                            <VStack alignItems='flex-end' gap={2}>
                                <Icon as={FiArrowRight} boxSize={6} />
                                {!hasCompletedInformation &&
                                    <HStack alignItems='center' color='red.400'>
                                        <Text>Completar registro</Text>
                                        <Icon as={FiAlertCircle} />
                                    </HStack>
                                }
                            </VStack>
                        </HStack>
                    </HStack>
                </Box>
            </CardBody>
        </Card>
    )
}

export default UserInformationCards