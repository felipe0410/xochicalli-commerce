import { getUsers } from "@/hooks/getDataFirebase";
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Container,
  Stack,
  ButtonGroup,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoArrowDown } from "react-icons/io5";
import ManualClose from "./deleteModal";
import EditUserModal from "./editUserModal";
import { User } from "firebase/auth";

const Users = (props: TableProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getFirebaseUser = async () => {
      const arrayUsers = await getUsers();
      setUsers(arrayUsers);
    };
    getFirebaseUser();
  }, []);
  console.log("users::>", users);
  const colums = [
    {
      colum: (
        <HStack spacing="3">
          <Checkbox />
          <HStack spacing="1">
            <Text>Nombre</Text>
            <Icon as={IoArrowDown} color="muted" boxSize="4" />
          </HStack>
        </HStack>
      ),
    },
    {
      colum: "Email",
    },
    {
      colum: "role",
    },
  ];
  return (
    <Container py={{ base: "4", md: "8" }} px={{ base: "0", md: 8 }}>
      <Box
        bg="bg-surface"
        boxShadow={{ base: "none", md: "sm" }}
        borderRadius={{ base: "none", md: "lg" }}
      >
        <Stack spacing="5">
          <Box px={{ base: "4", md: "6" }} pt="5">
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              <Text fontSize="lg" fontWeight="medium">
                Usuarios
              </Text>
            </Stack>
          </Box>
          <Box>
            <Table {...props}>
              <Thead>
                <Tr>
                  {colums.map((colum, index) => (
                    <Th key={index}>{colum.colum}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {users.map((member: any) => (
                  <Tr key={member.id}>
                    <Td>
                      <HStack spacing="3">
                        <Checkbox />
                        <Box>
                          <Text fontWeight="medium">{member.name}</Text>
                        </Box>
                      </HStack>
                    </Td>
                    <Td>
                      <Text color="muted">{member.email}</Text>
                    </Td>
                    <Td>
                      <Text color="muted">{member.role}</Text>
                    </Td>
                    <Td>
                      <HStack spacing="1">
                        <ManualClose />
                        <EditUserModal dataUser={member} />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          {/* ____________________pagination________________________-_ */}
          <Box px={{ base: "4", md: "6" }} pb="5">
            <HStack spacing="3" justify="space-between">
              {!isMobile && (
                <Text color="muted" fontSize="sm">
                  Showing 1 to 5 of 42 results
                </Text>
              )}
              <ButtonGroup
                spacing="3"
                justifyContent="space-between"
                width={{ base: "full", md: "auto" }}
                variant="secondary"
              >
                <Button>Previous</Button>
                <Button>Next</Button>
              </ButtonGroup>
            </HStack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Users;
