import { FC } from "react"

import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text, Textarea, VStack, useToast, Divider, HStack } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { SubmitHandler } from "react-hook-form/dist/types"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

import { ContactInputs } from "@/interfaces"
import { sendEmail } from "@/utils"

const Contact: FC = (): JSX.Element => {

    const toast = useToast();

    const validateSchema = yup.object().shape({
        name: yup
            .string()
            .required('El nombre no puede estar vacío')
            .min(4, 'El nombre debe tener mínimo 4 caracteres'),
        email: yup
            .string()
            .required('El correo no puede estar vacío')
            .email('El correo no es válido'),
        message: yup
            .string()
            .required('El mensaje no puede estar vacío')
            .min(10, 'El mensaje debe tener mínimo 10 caracteres')
    })

    const { handleSubmit, register, formState: { isSubmitting, errors }, reset } = useForm<ContactInputs>({ resolver: yupResolver(validateSchema) })

    const onSubmit: SubmitHandler<ContactInputs> = async (values: ContactInputs) => {
        try {
            await sendEmail(values)

            toast({
                status: 'success',
                title: '¡Correo enviado!',
                description: 'Hemos enviado tu mensaje, nos pondremos en contacto contigo pronto.',
                duration: 2000,
                isClosable: true
            })
        } catch (err) {
            console.log(err);

            toast({
                status: 'error',
                title: '¡Error!',
                description: 'Algo salió mal, intenta luego...',
                duration: 2000,
                isClosable: true
            })
        }

        reset()
    }

    return (
        <VStack minH='calc(100vh - 72px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>Contacto</title>
            </Helmet>
            <Heading mt={4}>Contacto</Heading>
            <Text py={4}>Aquí podrás contactarnos y resolver tus dudas o contarnos algo que haya sucedido.</Text>
            <Container>
                <Stack spacing="8" alignItems='center'>
                    <Box py={{ base: '0', sm: '8' }} px={{ base: '2', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'white' }} boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }} id='register-form' w={['sm', 'md', 'xl']}
                    >
                        <Stack spacing="6">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl isInvalid={!!errors.name}>
                                    <Flex direction={['column', 'column', 'row']} alignItems={['flex-start', 'flex-start', 'flex-end']} w='100%' justifyContent='space-between'>
                                        <FormLabel htmlFor='name'>Nombre:</FormLabel>
                                        <Input
                                            width={['100%', '100%', '60%']}
                                            autoComplete='false'
                                            type='text'
                                            id='name'
                                            bgColor={['white', 'transparent']}
                                            borderColor='gray.200'
                                            placeholder='Kevin Vega'
                                            {...register('name')}
                                        />
                                    </Flex>
                                    {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors.email} mt={4}>
                                    <Flex direction={['column', 'column', 'row']} alignItems={['flex-start', 'flex-start', 'flex-end']} w='100%' justifyContent='space-between'>
                                        <FormLabel htmlFor='email'>Correo electrónico:</FormLabel>
                                        <Input
                                            width={['100%', '100%', '60%']}
                                            autoComplete='false'
                                            type='email'
                                            id='email'
                                            bgColor={['white', 'transparent']}
                                            placeholder='correo@electronico.com'
                                            borderColor='gray.200'
                                            {...register('email')}
                                        />
                                    </Flex>
                                    {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors.message} mt={4}>
                                    <Flex direction={['column', 'column', 'row']} alignItems={['flex-start', 'flex-start', 'flex-start']} w='100%' justifyContent='space-between'>
                                        <FormLabel htmlFor='message'>Mensaje:</FormLabel>
                                        <Textarea
                                            width={['100%', '100%', '60%']}
                                            autoComplete='false'
                                            id='message'
                                            bgColor={['white', 'transparent']}
                                            placeholder='Escribe tu mensaje aquí...'
                                            borderColor='gray.200'
                                            {...register('message')}
                                        />
                                    </Flex>
                                    {errors.message && <FormErrorMessage>{errors.message.message}</FormErrorMessage>}
                                </FormControl>
                                <Button isLoading={isSubmitting} loadingText='Enviando mensaje...'
                                    type='submit' colorScheme='blue' width='100%' mt={8}
                                >
                                    Enviar
                                </Button>
                            </form>
                            <HStack>
                                <Divider />
                                <Text whiteSpace='nowrap' fontWeight={600}>O nos puedes llamar al <a href="tel:573014492053">3014492053</a></Text>
                                <Divider />
                            </HStack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </VStack>
    )
}
export default Contact