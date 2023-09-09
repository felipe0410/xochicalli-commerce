import { FC, useContext, useEffect, useRef, useState } from "react"

import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, SimpleGrid, Stack, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import { SmallAddIcon } from "@chakra-ui/icons"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from "axios"

import { addAddress } from "@/utils"
import { MXZip, Shipping } from "@/interfaces"
import { UserContext } from "@/context"

const AddAddressModal: FC = (): JSX.Element => {
  const { userInformation } = useContext(UserContext)

  const [zipCode, setZipCode] = useState<string>('');
  const [zipData, setZipData] = useState<MXZip | undefined>(); // Set initial value as undefined
  const [shippingInformation, setShippingInformation] = useState<Shipping>({
    names: '',
    address: '',
    zip: '',
    state: '',
    city: '',
    colony: '',
    email: userInformation!.email,
  });


  const cancelRef = useRef<any>()

  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  const validationSchema =
    yup.object().shape({
      names: yup
        .string()
        .required('El nombre es requerido')
        .min(6, 'El nombre debe tener al menos 6 caracteres'),
      address: yup
        .string()
        .required('La dirección es requerida')
        .min(4, 'La dirección debe tener al menos 4 caracteres'),
      zip: yup
        .string()
        .required('El código postal es requerido')
        .min(5, 'Debe ser de 5 dígitos'),
      state: yup
        .string()
        .required('El estado es requerido')
        .min(4, 'El estado debe tener al menos 4 caracteres'),
      city: yup
        .string()
        .required('La ciudad es requerida')
        .min(4, 'La ciudad debe tener al menos 4 caracteres'),
      colony: yup
        .string()
        .required('La ccolonia es requerida')
        .min(4, 'La colonia debe tener al menos 4 caracteres')
    })


  const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<Shipping>({ resolver: yupResolver(validationSchema) })

  const getShippingByCode = async () => {
    try {
      if (zipCode.length === 5) {
        const { data } = await axios.get<MXZip>(`https://raw.githubusercontent.com/pulgueta/mxzip/main/mxzip.json`)

        setZipData(data[zipCode] as unknown as MXZip);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const delayTimer = setTimeout(getShippingByCode, 500);

    if (zipData) {
      setShippingInformation((prevShippingInfo) => ({
        ...prevShippingInfo,
        zip: zipCode,
        state: zipData.state || prevShippingInfo.state,
        city: zipData.municipality || prevShippingInfo.city,
        colony: zipData.neighborhoods[0] || prevShippingInfo.colony,
      }));
    } else {
      setShippingInformation((prevShippingInfo) => ({
        ...prevShippingInfo,
        zip: zipCode,
        state: '',
        city: '',
        colony: '',
      }));
    }

    return () => clearTimeout(delayTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode, zipData]);



  const onSubmit: SubmitHandler<Shipping> = async (values) => {
    try {
      console.log(values);
      await addAddress(values, userInformation!.uid)
  
      toast({
        status: 'success',
        duration: 1000,
        position: 'top',
        title: 'Dirección',
        description: 'Tu dirección ha sido agregada.'
      })
      reset()
      onClose()
    } catch (e) {
      throw Error(e as string, { cause: 'error' })
    }
  }

  return (
    <>
      <Button
        bgColor='gray.50'
        p={8}
        rounded='lg'
        border='dotted'
        borderColor='gray.100'
        onClick={() => onOpen()}
      >
        <Stack align='center' direction='row'>
          <SmallAddIcon rounded='full' boxSize={5} bgColor='blue.400' color='white' />
          <Text>
            Agrega una dirección
          </Text>
        </Stack>
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}
        leastDestructiveRef={cancelRef} size={['sm', 'md', 'lg', '2xl']}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Agregar una dirección
            </AlertDialogHeader>
            <AlertDialogCloseButton onClick={() => { onClose(); reset() }} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogBody>
                <Stack spacing={{ base: '6', md: '6' }}>
                  <FormControl isInvalid={!!errors.names}>
                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Nombres y apellidos</FormLabel>
                    <Input
                      placeholder="Callie Nun"
                      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                      {...register('names')}
                    />
                    {errors.names && <FormErrorMessage>{errors.names.message}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isInvalid={!!errors.address}>
                    <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Dirección completa</FormLabel>
                    <Input
                      placeholder="123 Ejemplo St"
                      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                      {...register('address')}
                    />
                    {errors.address && <FormErrorMessage>{errors.address.message}</FormErrorMessage>}
                  </FormControl>

                  <SimpleGrid columns={[1, 2]} spacing="6">
                    <FormControl isInvalid={!!errors.zip} maxW={32}>
                      <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Código postal</FormLabel>
                      <Input
                        placeholder="03100"
                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                        {...register('zip')}
                        onChange={({ target }) => setZipCode(target.value)}
                      />
                      {errors.zip && <FormErrorMessage>{errors.zip.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.state}>
                      <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Estado</FormLabel>
                      <Input
                        defaultValue={shippingInformation.state} // Use defaultValue to initialize the value
                        placeholder="Tamaulipas"
                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                        {...register('state')}
                      />
                      {errors.state && <FormErrorMessage>{errors.state.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.city}>
                      <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Ciudad</FormLabel>
                      <Input
                        defaultValue={shippingInformation.city} // Use defaultValue to initialize the value
                        placeholder="Victoria"
                        focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                        {...register('city')}
                      />
                      {errors.city && <FormErrorMessage>{errors.city.message}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={!!errors.colony}>
                      <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Colonia</FormLabel>
                      <Select
                        defaultValue={shippingInformation.colony} // Use defaultValue to initialize the value
                        {...register('colony')}
                      >
                        {zipData && zipData.neighborhoods.map((neighborhood) => (
                          <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </option>
                        ))}
                      </Select>
                      {errors.colony && <FormErrorMessage>{errors.colony.message}</FormErrorMessage>}
                    </FormControl>
                  </SimpleGrid>
                </Stack>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button type='submit' colorScheme='blue' isLoading={isSubmitting}>Agregar dirección</Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </>

  )
}
export default AddAddressModal