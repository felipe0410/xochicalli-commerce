import { FC } from 'react'

import { HStack, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'

import { RatingProps } from '@/interfaces'

export const Rating: FC<RatingProps> = (props: RatingProps): JSX.Element => {
    const { defaultValue = 0, max = 5, size = 'md', rootProps } = props
    const color = useColorModeValue('gray.200', 'gray.600')
    const activeColor = useColorModeValue('yellow.300', 'yellow.200')
    return (
        <HStack spacing="0.5" {...rootProps}>
            {Array.from({ length: max })
                .map((_, index) => index + 1)
                .map((index) => (
                    <Icon
                        key={index}
                        as={FaStar}
                        fontSize={size}
                        color={index <= defaultValue ? activeColor : color}
                    />
                ))}
        </HStack>
    )
}