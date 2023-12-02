/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { CartContext, UserContext } from "@/context";
import PaymentForm from "./PaymentInformation";
import axios from "axios";
import { guardarDireccion, queryUser } from "@/utils/firebase";

interface UserProfile {
  securityQuestion: string;
  birthday: string;
  gender: string;
  profilePicture: string | null;
  address: Address[];
  fatherSurname: string;
  securitySelect: string;
  age: number;
  name: string;
  createdAt: string;
  motherSurname: string;
  role: string;
  email: string;
  uid: string;
  phoneNumber: string;
}
interface Address { }

const ShippingInformation: FC = (): JSX.Element => {
  const { cart } = useContext(CartContext);
  const arrayStripe: { price_data: { product_data: { name: any; }; currency: string; unit_amount: any; }; quantity: any; }[] = []
  // eslint-disable-next-line array-callback-return
  cart.map((element) => {
    const obj = {
      price_data: {
        product_data: {
          name: element.title,
        },
        currency: "MXN",
        unit_amount: Number(element.price,)
      },
      quantity: element.quantity,
    }
    arrayStripe.push(obj)
  })

  const { userInformation } = useContext(UserContext);
  const [dataCard, setDataCard] = useState({
    name: "",
    address: "",
    code: "",
    state: "Puebla",
    city: "Acajete",
    email: "",
  });
  console.log('dataCard::>', dataCard)
  const uid: string | any = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [payment, setPayment] = useState(false);
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/martinciscap/json-estados-municipios-mexico/master/estados-municipios.json";
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error load state Mexico JSON:", error);
      });
  }, []);

  const data1 = [
    {
      FormLabel: "Nombres y apellidos",
      name: "name",
      placeholder: "Callie Nun",
      value: dataCard.name,
      validation: () => dataCard.name.trim().length > 0,
    },
    {
      FormLabel: "Dirección completa",
      name: "address",
      placeholder: "123 Ejemplo St",
      value: dataCard.address,
      validation: () => dataCard.address.trim().length > 0,
    },
    {
      FormLabel: "Correo electrónico",
      name: "email",
      placeholder: "you@exmaple.com",
      value: dataCard.email,
      validation: () => {
        const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regularExpression.test(dataCard.email);
      },
    },
  ];

  const getCityPostalCodes = async (stateName: string) => {
    console.log('entro aqui', stateName)
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${stateName},+${dataCard.state},+Mexico&key=f299b88cb2724371afc4605625880341`
      );
      if (response.data.results.length > 0) {
        const result = response.data.results[response.data.results.length - 1];
        const citiesAndPostalCodes = result.components.postcode;
        setDataCard({ ...dataCard, code: citiesAndPostalCodes });
        return citiesAndPostalCodes;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener ciudades y códigos postales:", error);
      return 7211;
    }
  };

  useEffect(() => {
    getCityPostalCodes(dataCard.city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validation = () => {
    const validation = Object.values(dataCard).some(value => value === "")
    return validation
  }
  useEffect(() => {
    const getDataUser = async () => {
      if (uid) {
        const dataUser: UserProfile | any = await queryUser(uid);
        if (
          dataUser.name &&
          dataUser.fatherSurname &&
          dataUser.motherSurname &&
          dataUser.email
        )
          setDataCard({
            ...dataCard,
            name:
              dataUser.name +
              " " +
              dataUser.fatherSurname +
              " " +
              dataUser.motherSurname,
            email: dataUser.email,
          });
      }
    };
    getDataUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generarNumeros = () => {
    // Los dos primeros números son 72
    var numero1 = 72;
    var numero2 = 72;

    // Los dos siguientes números son aleatorios entre 1 y 100 (puedes ajustar este rango según tus necesidades)
    var numero3 = Math.floor(Math.random() * 100) + 1;
    var numero4 = Math.floor(Math.random() * 100) + 1;

    // Devolver los cuatro números en un arreglo
    return [numero1, numero2, numero3, numero4];
  }

  return (
    <Stack spacing={{ base: "6", md: "8" }}>
      <Stack direction="row" spacing={8}>
        <IconButton
          aria-label="back"
          icon={<ArrowBackIcon />}
          onClick={() => { payment ? setPayment(false) : navigate("/cart") }}
          w="max-content"
        />
        <Heading size="lg">Información de envío</Heading>
      </Stack>
      {!payment ? (
        <Stack spacing={{ base: "6", md: "6" }}>
          {userInformation!.address === null ? (
            <Button
              onClick={() => navigate(`/user/profile/${uid}/addresses`)}
              colorScheme="blue"
              variant="link"
            >
              Agrega una dirección primero
            </Button>
          ) : (
            <>
              {data1.map((input, index) => {
                return (
                  <FormControl key={index} id={input.name}>
                    <FormLabel
                      style={{ fontWeight: 600 }}
                      color={useColorModeValue("gray.700", "gray.200")}
                    >
                      {input.FormLabel}
                    </FormLabel>
                    <Input
                      value={input.value}
                      onChange={(e) => {
                        setDataCard((prevDataCard) => ({
                          ...prevDataCard,
                          [input.name]: e.target.value,
                        }));
                      }}
                      name={input.name}
                      placeholder={input.placeholder}
                      focusBorderColor={useColorModeValue(
                        "blue.500",
                        "blue.200"
                      )}
                    />
                    {!input.validation() && (
                      <Text color="tomato">
                        Este campo no puede estar vacio
                      </Text>
                    )}
                  </FormControl>
                );
              })}
              <FormLabel
                style={{ fontWeight: 600 }}
                color={useColorModeValue("gray.700", "gray.200")}
              >
                {"Estado"}
              </FormLabel>
              <Select
                value={dataCard.state}
                onChange={(e) =>
                  setDataCard({ ...dataCard, state: e.target.value })
                }
                placeholder="Estado"
                size="md"
              >
                {Object.keys(data).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormLabel
                style={{ fontWeight: 600 }}
                color={useColorModeValue("gray.700", "gray.200")}
              >
                {"ciudad"}
              </FormLabel>
              <Select
                // value={dataCard.city}
                onChange={(e) => {
                  setDataCard({ ...dataCard, city: e.target.value });
                  getCityPostalCodes(e.target.value);
                }}
                placeholder="ciudad"
                size="md"
              >
                {data[dataCard.state]?.map((option: any, index: any) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormControl id={"code"}>
                <FormLabel
                  style={{ fontWeight: 600 }}
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  {"Codigo Postal"}
                </FormLabel>
                <Input
                  name={'dataCard.code'}
                  value={dataCard.code}
                  placeholder={"Codigo Postal"}
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                />
              </FormControl>

              <Button
                background={validation() ? "gray.300" : "blue.500"}
                color={validation() ? '' : "#fff"}
                isDisabled={validation()}
                onClick={() => {
                  guardarDireccion(uid, dataCard);
                  axios.post('https://app-gbt7czzzeq-uc.a.run.app/create-checkout-session', arrayStripe)
                    .then(response => {
                      if (response.data.url) {
                        window.location.href = response.data.url;
                      } else {
                        console.error('La respuesta no contiene una URL.');
                      }
                    })
                    .catch(error => {
                      console.error('ocurrio un error', error);
                    });
                }}
              >
                Continuar
              </Button>
            </>
          )}
        </Stack>
      ) : (
        <>
          <PaymentForm dataCard={dataCard} />
        </>

      )}
    </Stack>
  );
};

export default ShippingInformation;
