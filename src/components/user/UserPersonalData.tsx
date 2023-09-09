import { FC, lazy } from 'react'

import { FormControl, FormLabel, Grid, GridItem, Input } from '@chakra-ui/react'

import { PersonalDataProps } from '@/interfaces'

const UserUpdateModal = lazy(() => import('./UserUpdateModal'));

const UserPersonalData: FC<PersonalDataProps> = ({ birthday, fatherSurname, motherSurname, name }): JSX.Element => {

  return (
    <>
      <Grid width={['xs', 'sm', 'lg', 'xl']}
        p={8} rounded='lg' bgColor='white'
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
        gap={6}
      >
        <GridItem>
          <FormControl>
            <FormLabel htmlFor='name'>Nombre(s)</FormLabel>
            <Input value={name}
              readOnly
              cursor='default'
              bgColor='gray.50'
              borderColor='gray.200' />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor='fatherSurname'>Apellido paterno</FormLabel>
            <Input value={fatherSurname}
              readOnly
              cursor='default'
              bgColor='gray.50'
              borderColor='gray.200' />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor='motherSurname'>Apellido materno</FormLabel>
            <Input value={motherSurname}
              readOnly
              cursor='default'
              bgColor='gray.50'
              borderColor='gray.200' />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor='birthday'>Fecha de nacimiento</FormLabel>
            <Input value={birthday}
              readOnly
              cursor='default'
              bgColor='gray.50'
              borderColor='gray.200' />
          </FormControl>
        </GridItem>
      </Grid>
      <UserUpdateModal />
    </>
  )
}

export default UserPersonalData