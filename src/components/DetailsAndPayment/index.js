import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import useApi from "../../hooks/useApi";

import TicketDetails from "./TicketDetails";
import Input from "../Form/Input";
import Button from "../Form/Button";

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

  function handlePaymentSubmit(event) {
    event.preventDefault();
  }

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
            number = {cardData.number} 
            name = {cardData.name} 
            expiry = {cardData.expiry} 
            cvc = {cardData.cvc} 
            focused = {cardData.focus}
          />
        </CardWrapper>
        <Form id="card-form" onSubmit={handlePaymentSubmit}>
          <Input 
            type = "text"
            name = "number"
            label = "Card number"
            style = {{ width: "100%" }}
            maxLength = "20"
            mask = "9999 9999 9999 9999"
            value = {cardData.number}
            onChange = {handleCardChange("number")}
            onSelect = {handleCardChange("focus")}
            inputProps={{
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
          />
          <Input 
            type = "text"
            name = "name"
            label = "Name"
            value = {cardData.name}
            onChange = {handleCardChange("name")}
            onSelect = {handleCardChange("focus")}
            variant = "outlined"
          />
          <HorizontalDisplay>
            <Expiry 
              type = "text"
              name = "expiry"
              label = "Valid Thru"
              mask = "99/99"
              value = {cardData.expiry}
              onChange = {handleCardChange("expiry")}
              onSelect = {handleCardChange("focus")}
              variant = "outlined"
            />
            <CVC 
              type = "text"
              name = "cvc"
              label = "CVC"
              mask = "999"
              value = {cardData.cvc}
              onChange = {handleCardChange("cvc")}
              onSelect = {handleCardChange("focus")}
              variant = "outlined"
            />
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
