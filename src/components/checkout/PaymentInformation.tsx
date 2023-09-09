import { FC, useContext, useState } from 'react';

import { Button, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useColorModeValue, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { PaymentInformation as IPay } from '@/interfaces';
import { addOrder } from '@/utils';
import { CartContext, UserContext } from '@/context';

const PaymentInformation: FC = (): JSX.Element => {
    const [formData, setFormData] = useState<IPay>({
        name: '',
        cardNumber: '',
        expDate: {
            month: '',
            year: '',
        },
        cvv: '',
    });

    const { cart, total } = useContext(CartContext)
    const { userInformation } = useContext(UserContext)

    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form data:', formData);
        if (formData.cardNumber.length >= 16 && formData.name.length >= 6 && formData.cvv.length >= 3) {
            try {
                await addOrder(cart, total, formData.cardNumber, userInformation!.uid)
                navigate('/success')
            } catch (e) {
                throw e
            }
        }
    };

    return (
        <Stack spacing={{ base: '6', md: '8' }}>
            <Heading size="lg">Información de pago</Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing="6">
                    <Stack direction='row'>
                        <FormControl>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Nombre en la tarjeta</FormLabel>
                            <Input
                                name="name"
                                placeholder="Auriela Lourdes"
                                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Número en la tarjeta</FormLabel>
                            <Input
                                name="cardNumber"
                                placeholder="4321 1234 5432 7890"
                                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                value={formData.cardNumber}
                                onChange={handleChange}
                                maxLength={19}
                            />
                        </FormControl>
                    </Stack>
                    <HStack spacing="6">
                        <FormControl>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>Fecha de expiración</FormLabel>
                            <HStack spacing="3">
                                <Select
                                    name="month"
                                    aria-label="Select Month"
                                    focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    value={formData.expDate.month}
                                    onChange={handleChange}
                                >
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </Select>
                                <Select
                                    name="year"
                                    aria-label="Select Year"
                                    focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                    value={formData.expDate.year}
                                    onChange={handleChange}
                                >
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                </Select>
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <FormLabel color={useColorModeValue('gray.700', 'gray.200')}>CVV</FormLabel>
                            <Input
                                name="cvv"
                                placeholder="111"
                                focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
                                value={formData.cvv}
                                onChange={handleChange}
                                maxLength={3}
                            />
                        </FormControl>
                    </HStack>
                    <Button type="submit" colorScheme="blue">
                        Realizar pago
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};

export default PaymentInformation;
