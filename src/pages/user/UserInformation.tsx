import { FC, lazy, useContext, useRef, RefObject, ChangeEvent } from 'react'

import { Avatar, Heading, IconButton, Tooltip, VStack, useToast, useMediaQuery } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async';
import { FiUpload } from 'react-icons/fi'

import { UserContext } from '@/context'
import { updateProfilePicture } from '@/utils';

const UserPersonalData = lazy(() => import('@/components/user/UserPersonalData'));

const UserInformation: FC = (): JSX.Element => {

    const { userInformation, user } = useContext(UserContext)
    const inputRef = useRef<HTMLInputElement>(null);

    const toast = useToast();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

    const updatePicture = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            user &&
                updateProfilePicture(e.target.files[0], user?.uid)
                    .then(() =>
                        toast({
                            status: 'success',
                            duration: 1500,
                            isClosable: false,
                            title: 'Foto actualizada',
                            position: isLargerThan800 ? 'top-right' : 'bottom',
                            description: '¡Foto actualizada con éxito!'
                        })
                    ).catch(() =>
                        toast({
                            status: 'error',
                            duration: 1500,
                            isClosable: false,
                            title: 'Error al actualizar',
                            position: isLargerThan800 ? 'top-right' : 'bottom',
                            description: '¡La foto debe ser inferior a 2MB!'
                        })
                    )
        }
    }

    const handleButtonClick = (inputRef: RefObject<HTMLInputElement>) => inputRef.current?.click();

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>Datos personales</title>
            </Helmet>
            <Heading>
                Datos personales
            </Heading>
            <VStack>
                <Avatar
                    loading="lazy"
                    style={{ width: '216px', height: '216px' }}
                    name={`${userInformation!.name} ${userInformation!.fatherSurname} ${userInformation!.motherSurname}`}
                    src={
                        userInformation!.profilePicture
                            ?
                            userInformation!.profilePicture
                            :
                            'https://via.placeholder.com/500x500.png?text=Image+Placeholder'
                    }
                    mt={4}
                />
                <Tooltip
                    hasArrow
                    label={
                        userInformation!.profilePicture === null
                            ?
                            'Subir foto de perfil'
                            :
                            'Cambiar foto de perfil'
                    }
                    placement="bottom"
                >
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={updatePicture}
                            ref={inputRef}
                        />
                        <IconButton
                            size='lg'
                            position='relative'
                            top='-12'
                            left='12'
                            onClick={() => handleButtonClick(inputRef)}
                            rounded='full'
                            icon={<FiUpload />}
                            colorScheme='blue'
                            aria-label="Subir foto de perfil"
                        />
                    </>
                </Tooltip>
                <UserPersonalData
                    name={userInformation!.name}
                    fatherSurname={userInformation!.fatherSurname}
                    motherSurname={userInformation!.motherSurname}
                    birthday={userInformation!.birthday}
                />
            </VStack>
        </VStack>
    )
}

export default UserInformation