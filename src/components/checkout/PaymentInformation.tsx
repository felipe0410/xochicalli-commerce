import React, { useState } from "react";
import Card from "react-credit-cards-2";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Box, FormControl, Input, Heading, Button } from "@chakra-ui/react";

const PaymentForm = ({ dataCard }: { dataCard: any }) => {
  const [data, setData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: undefined,
    formData: null,
  });

  const handleCallback = ({ issuer }: { issuer: any }, isValid: any) => {
    if (isValid) {
      setData({ ...data, issuer });
    }
  };

  const handleInputFocus = ({ target }: { target: any }) => {
    setData({
      ...data,
      focused: target.name,
    });
  };

  const handleInputChange = ({ target }: { target: any }) => {
    let value = target.value;
    if (target.name === "number") {
      value = formatCreditCardNumber(value);
    } else if (target.name === "expiry") {
      value = formatExpirationDate(value);
    } else if (target.name === "cvc") {
      value = formatCVC(value);
    }
    setData({
      ...data,
      [target.name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setData({
      ...data,
      formData,
    });
  };


  const validation = () => {
    return Object.values(data).some(value => value === "")
  }

  return (
    <Box key="Payment">
      <Box className="App-payment">
        <Heading fontSize="xl">Ingresa tu tarjeta de credito</Heading>
        <Card
          number={data.number.slice(0, 4)}
          name={data.name}
          expiry={data.expiry}
          cvc={data.cvc}
          focused={data.focused}
          callback={handleCallback}
        />
        <FormControl onSubmit={handleSubmit}>
          <Box className="form-group">
            <Input
              style={{ margin: "20px 0" }}
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              required
              pattern="^\d{16}$"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <small>E.g.: 49..., 51..., 36..., 37...</small>
          </Box>
          <Box className="form-group">
            <Input
              style={{ margin: "20px 0" }}
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Box>
          <Box className="row">
            <Box className="col-6">
              <Input
                style={{ margin: "20px 0" }}
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Box>
            <Box className="col-6">
              <Input
                style={{ margin: "20px 0" }}
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Box>
          </Box>
        </FormControl>
        <Button
          background={validation() ? "gray.300" : "blue.500"}
          color={validation() ? '' : "#fff"}
          isDisabled={validation()}
          width={'100%'}
          onClick={() => {

          }}
        >
          Finalizar compra
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;
