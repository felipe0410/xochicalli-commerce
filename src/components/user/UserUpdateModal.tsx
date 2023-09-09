import { FC, useContext, useRef } from 'react'

import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Button, FormControl, FormErrorMessage, FormLabel, Input, useDisclosure, useMediaQuery, useToast, Box, Grid, GridItem, Flex
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { UserContext } from '@/context';
import { updateInformation } from '@/utils';
import { PersonalDataProps } from '@/interfaces';
import { useNavigate } from 'react-router-dom';

const UserUpdateModal: FC = (): JSX.Element => {
    const cancelRef = useRef<any>();
    const { userInformation } = useContext(UserContext)

    const navigate = useNavigate()

    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast()
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('El nombre no puede estar vacío')
            .min(4, 'Debes ingresar al menos 4 caracteres'),
        fatherSurname: yup
            .string()
            .required('El apellido paterno no puede estar vacío')
            .min(4, 'Debes ingresar al menos 4 caracteres'),
        motherSurname: yup
            .string()
            .required('El apellido paterno no puede estar vacío')
            .min(4, 'Debes ingresar al menos 4 caracteres'),
        birthday: yup
            .date()
            .required('La fecha de nacimiento es requerida')
            .max(new Date(), 'La fecha de nacimiento debe ser antes de hoy'),
    })

    const { handleSubmit, register, formState: { errors, isSubmitting }, } = useForm<PersonalDataProps>({ resolver: yupResolver(validationSchema) });

    const onUpdateValues: SubmitHandler<PersonalDataProps> = async (values) => {
        try {
            await updateInformation(values, userInformation!.uid)
            toast({
                title: 'Actualización de datos',
                description: 'Se han actualizado tus datos',
                isClosable: true,
                duration: 1500,
                status: 'success',
                position: isLargerThan800 ? 'top-right' : 'bottom',
            })
            onClose()
        } catch (error) {
            toast({
                title: 'Actualización de datos',
                description: 'No se han podido actualizar los datos',
                isClosable: true,
                duration: 1500,
                status: 'error',
                position: isLargerThan800 ? 'top-right' : 'bottom',
            })
            console.log(error)
        }
    }

    return (
        <>
            <Box pt={4}>
                <Flex direction='column' width='100%' gap={4}>
                    <Button colorScheme='blue' onClick={onOpen}>Editar mis datos</Button>
                    <Button colorScheme='blue' variant='link' onClick={() => navigate(-1)}>Volver</Button>
                </Flex>
            </Box>

            <AlertDialog isOpen={isOpen} onClose={onClose}
                leastDestructiveRef={cancelRef} size={['xs', 'sm', 'md', 'lg', 'xl']}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Actualizar datos
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <Grid
                                p={4} rounded='lg' bgColor='white'
                                templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
                                gap={6}
                            >
                                <GridItem>
                                    <FormControl isInvalid={!!errors.name}>
                                        <FormLabel htmlFor='name'>Nombre(s)</FormLabel>
                                        <Input type='text' {...register('name')} />
                                        {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}

                                    </FormControl>
                                </GridItem>
                                <GridItem>
                                    <FormControl isInvalid={!!errors.fatherSurname}>
                                        <FormLabel htmlFor='fatherSurname'>Apellido paterno</FormLabel>
                                        <Input type='text' {...register('fatherSurname')} />
                                        {errors.fatherSurname && <FormErrorMessage>{errors.fatherSurname.message}</FormErrorMessage>}
                                    </FormControl>
                                </GridItem>
                                <GridItem>
                                    <FormControl isInvalid={!!errors.motherSurname}>
                                        <FormLabel htmlFor='motherSurname'>Apellido materno</FormLabel>
                                        <Input type='text' {...register('motherSurname')} />
                                        {errors.motherSurname && <FormErrorMessage>{errors.motherSurname.message}</FormErrorMessage>}
                                    </FormControl>
                                </GridItem>
                                <GridItem>
                                    <FormControl isInvalid={!!errors.birthday}>
                                        <FormLabel htmlFor='birthday'>Fecha de nacimiento</FormLabel>
                                        <Input type='date' {...register('birthday')} />
                                        {errors.birthday && <FormErrorMessage>{errors.birthday.message}</FormErrorMessage>}
                                    </FormControl>
                                </GridItem>
                            </Grid>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                onClick={handleSubmit(onUpdateValues)}
                                isLoading={isSubmitting}
                                loadingText='Actualizando datos...'
                                colorScheme='green'
                            >Guardar cambios</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default UserUpdateModal;