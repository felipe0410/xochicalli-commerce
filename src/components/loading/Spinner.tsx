import { FC } from "react"

import { VStack, Spinner as Loader } from "@chakra-ui/react"

export const Spinner: FC = (): JSX.Element => (
    <VStack minH='100vh' alignItems='center' justifyContent='center'>
      <Loader size='xl' />
    </VStack>
  )