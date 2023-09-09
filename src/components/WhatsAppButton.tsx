import { FC } from 'react'

import { Box, IconButton, Tooltip } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton: FC = (): JSX.Element => (
    <Box position='fixed' bottom={6} right={6}>
        <Tooltip label='Hablar en nuestro WhatsApp' placement='left' hasArrow rounded='sm'>
            <IconButton
                colorScheme='whatsapp'
                aria-label='whatsapp-btn'
                isRound
                size='lg'
                fontSize='32px'
                icon={<FaWhatsapp />}
                onClick={() => window.location.assign(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`)}
            />
        </Tooltip>
    </Box>
)

export default WhatsAppButton