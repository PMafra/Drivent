import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import useApi from "../../hooks/useApi";

import TicketDetails from "./TicketDetails";

export default function DetailsAndPayment() {
  const { ticket } = useApi();

  const [ticketData, setTicketData] = useState({
    id: "",
    name: "Carregando...",
    price: "",
  });

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: ""
  });

  const handleCardChange = (prop) => (event) => {
    setCardData({ ...cardData, [prop]: prop === "focus"? event.target.name : event.target.value });
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
      <CardWrapper>
        <Cards 
          number = {cardData.number} 
          name = {cardData.name} 
          expiry = {cardData.expiry} 
          cvc = {cardData.cvc} 
          focused = {cardData.focus}
        />
        <Form >
          <Input 
            type = "tel"
            name = "number"
            placeholder = "Card number"
            value = {cardData.number}
            onChange = {handleCardChange("number")}
            onFocus = {handleCardChange("focus")}
            variant = "outlined"
          />
          <Input 
            type = "text"
            name = "name"
            placeholder = "Name"
            value = {cardData.name}
            onChange = {handleCardChange("name")}
            onFocus = {handleCardChange("focus")}
            variant = "outlined"
          />
          <HorizontalDisplay>
            <Expiry 
              type = "text"
              name = "expiry"
              placeholder = "Valid Thru"
              value = {cardData.expiry}
              onChange = {handleCardChange("expiry")}
              onFocus = {handleCardChange("focus")}
              variant = "outlined"
            />
            <CVC 
              type = "tel"
              name = "cvc"
              placeholder = "CVC"
              value = {cardData.cvc}
              onChange = {handleCardChange("cvc")}
              onFocus = {handleCardChange("focus")}
              variant = "outlined"
            />
          </HorizontalDisplay>
        </Form>
      </CardWrapper>
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

const CardWrapper = styled.div`
  display: flex;
  height: 225px;
  width: 706px;
`;

const Form = styled.form`
  width: 53%;
  height:100%;
  display: flex;
  flex-direction: column;
`;

const HorizontalDisplay = styled.div`
  display: flex;
  flex-direction: row;
`;

const Input = styled(TextField)`
  width: 100%;
  height: 30px;
  margin-bottom: 35px!important;
`;

const CVC = styled(TextField)`
  width: 150px;
  height: 30px;
  margin-bottom: 8px!important;
`;

const Expiry = styled(TextField)`
  width: 220px;
  height: 30px;
  margin: 0 20px 8px 0!important;
`;
