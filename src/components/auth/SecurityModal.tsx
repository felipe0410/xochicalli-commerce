import { FC, useRef, useState } from "react"

import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, useDisclosure, useToast } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateEmailAddress } from "@/utils"
import { updatePassword } from "firebase/auth"
import { currentUser } from "@/firebase"

interface Update {
    email?: string
    password?: string
}

const SecurityModal: FC = (): JSX.Element => {
    const [toChange, setToChange] = useState<string>('')

    const cancelRef = useRef<any>()

    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast();

    const validationSchema =
        toChange === 'email'
            ?
            yup.object().shape({
                email: yup
                    .string()
                    .required('El correo es requerido')
                    .email('Debe ser un correo válido'),
            })
            :
            yup.object().shape({
                password: yup
                    .string()
                    .required('La contraseña es requerida')
                    .min(6, 'Debes ingresar al menos 6 caracteres')
            })

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<Update>({ resolver: yupResolver(validationSchema) })


    const onEmail: SubmitHandler<Update> = async ({ email }) => {
        try {
            email && await updateEmailAddress(email)
            toast({
                status: 'success',
                duration: 1000,
                position: 'top',
                title: 'Correo electrónico',
                description: 'Tu correo electrónico ha sido actualizado.'
            })
            reset()
            onClose()
        } catch (e) {
            throw Error(e as string, { cause: 'error' })
        }
    }

    const onPassword: SubmitHandler<Update> = async ({ password }) => {
        try {
            (currentUser && password) && await updatePassword(currentUser, password)
            toast({
                status: 'success',
                duration: 1000,
                position: 'top',
                title: 'Contraseña',
                description: 'Tu contraseña ha sido actualizada.'
            })
            reset()
            onClose()
        } catch (e) {
            throw Error(e as string, { cause: 'error' })
        }
    }

    return (
        <>
            <ButtonGroup>
                <Button onClick={() => { setToChange('email'); onOpen() }}>Cambiar correo</Button>
                <Button onClick={() => { setToChange('password'); onOpen() }}>Cambiar contraseña</Button>
            </ButtonGroup>
            {
                toChange === 'email' ?
                    <AlertDialog isOpen={isOpen} onClose={onClose}
                        leastDestructiveRef={cancelRef} size={['sm', 'md', 'lg', 'xl']}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Cambiar correo
                                </AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <form onSubmit={handleSubmit(onEmail)}>
                                    <AlertDialogBody>
                                        <FormControl isInvalid={!!errors.email}>
                                            <FormLabel htmlFor='email'>Nuevo correo electrónico</FormLabel>
                                            <Input autoComplete='false' id='email' type='email'
                                                {...register('email')}
                                            />
                                            {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}

                                        </FormControl>
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button type='submit' colorScheme='blue' isLoading={isSubmitting}>Actualizar</Button>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                    :
                    <AlertDialog isOpen={isOpen} onClose={onClose}
                        leastDestructiveRef={cancelRef} size={['sm', 'md', 'lg', 'xl']}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Cambiar contraseña
                                </AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <form onSubmit={handleSubmit(onPassword)}>
                                    <AlertDialogBody>
                                        <FormControl>
                                            <FormLabel htmlFor='password'>Nueva contraseña</FormLabel>
                                            <Input autoComplete='false' id='password' type='password'
                                                {...register('password')}
                                            />
                                            {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                                        </FormControl>
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button isLoading={isSubmitting} type='submit' colorScheme='blue'>Actualizar</Button>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
            }
        </>

    )
}
export default SecurityModal