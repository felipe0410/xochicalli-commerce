import { FormLabel, Input, Select, HStack, PinInput, PinInputField, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const letterToUpperCase = (name: string) => name.charAt(0).toUpperCase() + name.slice(1) + '.'

export const Duplex = (name: string, data: any, type: string, handle: any, values: any) => {
    const [initialChangeOccurred, setInitialChangeOccurred] = useState(false);
    const dataValue = `unidad-${name}`
    useEffect(() => {
        if (!initialChangeOccurred) {
            handle({ target: { name: dataValue, value: data[0] } });
            handle({ target: { name, value: '' } });
            setInitialChangeOccurred(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, dataValue, initialChangeOccurred, name]);
    return (
        <Box>
            <FormLabel htmlFor='content'>{letterToUpperCase(name)}</FormLabel>
            <Box display={"flex"}>
                <Input
                    onChange={handle}
                    name={name}
                    type={type}
                    borderColor='gray.200'
                    placeholder='350'
                    width={"350px"}
                />
                <Select
                    name={dataValue}
                    width={"150px"}
                    onChange={handle}
                    value={values[dataValue]}
                >
                    {data?.map((content: string) => (
                        <option key={crypto.randomUUID()} value={content}>
                            {content}
                        </option>
                    ))}
                </Select>
            </Box>
        </Box>
    );
};

export const ComponentSelect = (name: string, data: any, handle: any, values: any) => {
    const [initialChangeOccurred, setInitialChangeOccurred] = useState(false);

    useEffect(() => {
        if (!initialChangeOccurred) {
            handle({ target: { name, value: data[0] } });
            setInitialChangeOccurred(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, initialChangeOccurred, name]);

    return (
        <Box>
            <Box mb={4}>
                <FormLabel>{letterToUpperCase(name)}</FormLabel>
                <Select name={name} onChange={handle} value={values[name]}>
                    {data?.map((delivery: string) => (
                        <option key={crypto.randomUUID()} value={delivery}>
                            {delivery}
                        </option>
                    ))}
                </Select>
            </Box>
        </Box>
    );
};



export const ComponentInput = (name: string, type: string, handle: any) => {
    return (
        <Box>
            <FormLabel>{letterToUpperCase(name)}</FormLabel>
            <Input
                name={name}
                onChange={handle}
                type={type}
                borderColor='gray.200'
            />
        </Box>
    );
};

export const ComponentPinInput = (name: string, setValue: any) => {
    return (
        <>
            <Text>{letterToUpperCase(name)}</Text>
            <HStack>
                <PinInput
                    onChange={(e) => {
                        setValue((prevState: any) => ({
                            ...prevState,
                            Graduacion: e,
                        }));
                    }}
                >
                    <PinInputField />
                    <PinInputField />
                    <Text>
                        --
                    </Text>
                    <PinInputField />
                    <PinInputField />
                    <Text>
                        --
                    </Text>
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
        </>
    );
};

export const Tags = (name: string, handle: any, values: any, setValue: any) => {
    return (
        <>
            <Text>{letterToUpperCase(name)}</Text>
            <TagsInput
                value={values[name] ?? []}
                onChange={(event: any) => {
                    setValue((prevState: any) => ({
                        ...prevState,
                        [name]: event,
                    }));
                }}
            />
        </>
    );
};