import { FC, lazy, useContext } from 'react'

import {
    VStack, Heading,
    // HStack, PinInput, PinInputField, InputGroup, InputLeftAddon, FormControl, FormErrorMessage,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
// import { FiPhone } from 'react-icons/fi'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'

// import { enroll2FA, verifyUserEnrolled } from '@/utils/firebase'
import { UserContext } from '@/context'
// import { useCaptcha } from '@/hooks'

const UserHeaderCard = lazy(() => import('@/components/user/UserHeaderCard'));
const UserInformationCards = lazy(() => import('@/components/user/UserInformationCards'));

// interface PhoneNumber {
//     phoneNumber: string;
// }

const UserProfile: FC = (): JSX.Element => {
    // const [otpCodeId, setOtpCodeId] = useState<string | undefined>()
    // const [otpValue, setOtpValue] = useState('')
    // const [otpView, setOtpView] = useState<boolean>(false)

    const { user, userInformation } = useContext(UserContext)

    // const captcha = useCaptcha('mfa-button')

    const isCompletedInformation = (): boolean => {
        if (
            userInformation!.name.length <= 1 ||
            userInformation!.fatherSurname.length <= 1 ||
            userInformation!.motherSurname.length <= 1 ||
            userInformation!.birthday.length <= 1 ||
            userInformation!.age <= 1 ||
            userInformation!.address!.length <= 1
        ) {
            return false
        } else {
            return true
        }

    }

    // const validationSchema = yup.object().shape({
    //     phoneNumber: yup
    //         .string()
    //         .required('El número de teléfono no puede estar vacío')
    //         .min(10, 'El número de teléfono debe ser de 10 dígitos')
    //         .max(10, 'El número de teléfono no puede tener más de 10 dígitos'),
    // })

    // const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<PhoneNumber>({ resolver: yupResolver(validationSchema) });

    // const onSubmit: SubmitHandler<PhoneNumber> = async (data) => {
    //     const verificationId = await send2FA(user, `+57${data.phoneNumber}`, captcha)

    //     if (!verificationId) return

    //     setOtpCodeId(verificationId)
    //     setOtpView(true)
    //     reset()
    // }

    // const validateOTP = async () => {
    //     const res = await enroll2FA(user, otpCodeId, otpValue)

    //     res ? setOtpView(false) : alert('error')
    // }

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>Perfil de usuario</title>
            </Helmet>
            {
                !user?.emailVerified
                    ? <Heading>Revisa tu correo electrónico para activar tu cuenta</Heading>
                    // <Box bgColor='white' borderRadius='lg' py={4} px={6} id='mfa'>
                    //     {
                    //         !otpView
                    //             ?
                    //             <>
                    //                 <Heading textAlign='center'>Activar 2FA</Heading>
                    //                 <Text my={4}>Ingresa tu número de teléfono para activar la autenticación por 2 factores (SMS)</Text>
                    //                 {/* <form onSubmit={handleSubmit(onSubmit)}>
                    //                     <FormControl isInvalid={!!errors.phoneNumber} display='flex' flexDir='column' alignItems='center'>
                    //                         <Box width='max-content' mx='auto'>
                    //                             <InputGroup>
                    //                                 <InputLeftAddon bgColor='blue.400' children={<FiPhone color='white' />} />
                    //                                 <Input
                    //                                     type='tel'
                    //                                     inputMode='tel'
                    //                                     width='40'
                    //                                     {...register('phoneNumber')}
                    //                                 />
                    //                             </InputGroup>
                    //                         </Box>
                    //                         {errors.phoneNumber && <FormErrorMessage textAlign='center'>{errors.phoneNumber.message}</FormErrorMessage>}
                    //                     </FormControl>
                    //                     <Button
                    //                         type='submit'
                    //                         mt={8}
                    //                         mb={2}
                    //                         id='mfa-button'
                    //                         width='100%'
                    //                         colorScheme='blue'
                    //                         isLoading={isSubmitting}
                    //                         loadingText='Enviando mensaje...'
                    //                     >
                    //                         Enviar SMS
                    //                     </Button>
                    //                 </form> */}
                    //             </>
                    //             :
                    //             <>
                    //                 <Heading textAlign='center'>Código SMS</Heading>
                    //                 <Text textAlign='center' my={4}>Ingresa el código que hemos enviado a tu celular</Text>
                    //                 {/* <HStack>
                    //                     <PinInput otp type='number' onChange={({ target }) => setOtpValue(target.value)}>
                    //                         <PinInputField />
                    //                         <PinInputField />
                    //                         <PinInputField />
                    //                         <PinInputField />
                    //                     </PinInput>
                    //                 </HStack> */}
                    //                 {/* <VStack justifyContent='center' gap={6} my={4}>
                    //                     <Input
                    //                         type='number'
                    //                         inputMode='numeric'
                    //                         maxLength={6}
                    //                         w={24}
                    //                         textAlign='center'
                    //                         fontWeight={600}
                    //                         value={otpValue}
                    //                         onChange={({ target }) => setOtpValue(target.value)}
                    //                     />
                    //                     <Button onClick={validateOTP} colorScheme='green'>Validar código</Button>
                    //                 </VStack> */}
                    //             </>
                    //     }
                    // </Box>
                    : <>
                        <Heading mt={4} mb={6}>Tu perfil</Heading>
                        <VStack gap={6}>
                            <UserHeaderCard
                                createdAt={userInformation!.createdAt}
                                imageURL={userInformation!.profilePicture}
                                name={`${userInformation?.name} ${userInformation?.fatherSurname} ${userInformation?.motherSurname}`}
                            />
                            <UserInformationCards
                                uid={user?.uid}
                                hasCompletedInformation={isCompletedInformation}
                            />
                        </VStack>
                    </>
            }
        </VStack>
    )
}

export default UserProfile