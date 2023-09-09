import { FC, useCallback, useEffect, useState } from "react"

import { Button, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore"
import { v4 } from "uuid"

import { db } from "@/firebase"

const Backups: FC = (): JSX.Element => {
    const [clicked, setClicked] = useState<boolean>(false)
    const [backupData, setBackupData] = useState<DocumentData[]>([])

    const onClickedBackup = async () => {
        const lastClickedString = localStorage.getItem('lastClicked')
        const lastClicked = lastClickedString ? new Date(JSON.parse(lastClickedString)) : null

        if (!lastClicked || (new Date().getTime() - lastClicked.getTime()) > 86400000) {
            setClicked(true)
            localStorage.setItem('lastClicked', JSON.stringify(new Date()))

            await addDoc(collection(db, 'backups'), {
                backupId: v4(),
                createdBy: 'admin',
                createdAt: new Date().toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                }),
            })

            setTimeout(() => {
                setClicked(false)
            }, 86400000)
        }
    }

    const backupsUpdate = useCallback(async () => {
        const { docs } = await getDocs(collection(db, "backups"));

        const doc = docs.map((ref) => ref.data());

        setBackupData(doc);
    }, []);

    useEffect(() => {
        backupsUpdate()
    }, [clicked, backupsUpdate])

    return (
        <VStack minH='calc(100vh - 64px)' bgColor='gray.100' p={4}>
            <Heading>Backups</Heading>
            <Flex flexDirection={['column', 'column', 'column', 'column', 'row']} gap={8} pt={6}>
                <VStack bgColor='white' p={4} rounded='lg' h='100%' w={['xs', 'sm']} mx='auto'>
                    <Text fontWeight={600} fontSize='xl'>Respaldar base de datos Firestore</Text>
                    <Text py={4}>Vas a poder realizar los respaldos de la base de datos de Firestore de manera diaria.</Text>
                    <Button
                        isDisabled={!clicked}
                        onClick={onClickedBackup}
                    >Respaldar</Button>
                </VStack>
                <TableContainer bgColor='white' rounded='lg' p={4} width={['xs', 'sm', 'md', 'lg', '2xl']} height='100%'>
                    <Table variant='striped'>
                        <Thead>
                            <Tr>
                                <Th>Fecha</Th>
                                <Th>ID de respaldo</Th>
                                <Th isNumeric>Hecho por</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                backupData.map((backup) => (
                                    <Tr key={backup.backupId}>
                                        <Td>{backup.createdAt}</Td>
                                        <Td>{backup.backupId}</Td>
                                        <Td>{backup.createdBy}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </VStack>
    )
}
export default Backups