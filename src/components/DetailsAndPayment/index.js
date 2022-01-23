import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { toast } from "react-toastify";

import useApi from "../../hooks/useApi";
import { useForm } from "../../hooks/useForm";

import creditCardValidation from "./creditCardValidation";
import TicketDetails from "./TicketDetails";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { ErrorMsg } from "../PersonalInformationForm/ErrorMsg";

export default function DetailsAndPayment() {
  const { ticket } = useApi();
  const {
    handleSubmit,
    handleChange,
    data,
    errors,
    setData,
  } = useForm({
    validations: creditCardValidation,

    onSubmit: () => {
      ticket.confirmPayment().then(() => {
        toast("Pagamento confirmado!");
      }).catch((error) => {
        if (error.response?.data?.details) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível");
        }
        /* eslint-disable-next-line no-console */
        console.log(error);
      });
    },

    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: ""
    },
  });

  const [ticketData, setTicketData] = useState({
    id: "",
    name: "Carregando...",
    price: "",
  });

  const handleSelectChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.name });
  };

  useEffect(() => {
    ticket.getTicketInformations().then(response => {
      if (response.status !== 200) {
        return;
      }

      setTicketData({
        id: response.data[0].id,
        name: response.data[0].modality.name,
        price: response.data[0].modality.price
      });
    });
  }, []);

  return (
    <>
      <Title variant="h4">Ingresso e pagamento</Title>
      <Subtitle variant="h6">Ingresso escolhido</Subtitle>
      <TicketDetails 
        id={ticketData.id}
        name={ticketData.name} 
        price={ticketData.price}
      />
      <Subtitle variant="h6">Pagamento</Subtitle>
      <CardInfoContainer>
        <CardWrapper>
          <Cards 
            number = {data.number} 
            name = {data.name} 
            expiry = {data.expiry} 
            cvc = {data.cvc} 
            focused = {data.focus}
          />
        </CardWrapper>
        <Form id="card-form" onSubmit={handleSubmit}>
          <Input 
            type = "text"
            name = "number"
            label = "Card number"
            style = {{ width: "100%" }}
            maxLength = "20"
            mask = "9999 9999 9999 9999"
            value = {data.number}
            onChange = {handleChange("number")}
            onSelect = {handleSelectChange("focus")}
            inputProps={{
              autoComplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
          />
          {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          <Input 
            type = "text"
            name = "name"
            label = "Name"
            value = {data.name}
            onChange = {handleChange("name")}
            onSelect = {handleSelectChange("focus")}
            variant = "outlined"
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          <HorizontalDisplay>
            <Expiry 
              type = "text"
              name = "expiry"
              label = "Valid Thru"
              mask = "99/99"
              value = {data.expiry}
              onChange = {handleChange("expiry")}
              onSelect = {handleSelectChange("focus")}
              variant = "outlined"
            />
            {errors.expiry && <ErrorMsg>{errors.expiry}</ErrorMsg>}
            <CVC 
              type = "text"
              name = "cvc"
              label = "CVC"
              mask = "999"
              value = {data.cvc}
              onChange = {handleChange("cvc")}
              onSelect = {handleSelectChange("focus")}
              variant = "outlined"
            />
            {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
          </HorizontalDisplay>
        </Form>
      </CardInfoContainer>
      <Button form = "card-form" type = "submit">
          FINALIZAR PAGAMENTO
      </Button>
    </>
  );
}

const Title = styled(Typography)`
  margin-bottom: 37px!important;
`;

const Subtitle = styled(Typography)`
  margin-bottom: 17px!important;
  font-size: 20px!important;
  color: #8E8E8E;
`;

const CardInfoContainer = styled.div`
  display: flex;
  height: 225px;
  width: 706px;
`;

const CardWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 10px 15px 0 0;
`;

const Form = styled.form`
  width: 53%;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content:start;
`;

const HorizontalDisplay = styled.div`
  display: flex;
  flex-direction: row;
`;

const CVC = styled(Input)`
  width: 150px;
  height: 30px;
  margin-bottom: 8px!important;
`;

const Expiry = styled(Input)`
  width: 220px;
  height: 30px;
  margin: 8px 20px 8px 0!important;
`;
