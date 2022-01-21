import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

export default function Tickets() {
  const [ticket, setTicket] = useState("");
  return (
    <>
      <StyleTypography variant="h4">Ingresso e pagamento</StyleTypography>
      <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <Container display="grid">
        <Option
          chosen={ticket === "inPerson" ? 1 : 0}
          onClick={() => setTicket("inPerson")}
          variant="outlined"
        >
          Presencial
          <Value>R$ 250</Value>
        </Option>
        <Option
          chosen={ticket === "Online" ? 1 : 0}
          onClick={() => setTicket("Online")}
          variant="outlined"
        >
          Online
          <Value>R$ 100</Value>
        </Option>
      </Container>
    </>
  );
}

const Value = styled(Typography)`
  color: #898989;
`;

const Option = styled(Button)`
  border-radius: 20px !important;
  border: 1px solid #cecece !important;
  text-transform: none !important;
  background-color: ${(props) => (props.chosen ? "#FFEED2 !important" : "")};
  span {
    display: flex;
    flex-direction: column;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 150px;
  display: ${(props) => props.display || "none"};
  grid-template-columns: repeat(5, 1fr);
  gap: 2%;
  margin-bottom: 30px;
`;

const SubTitle = styled(Typography)`
  font-size: 20px !important;
  margin-bottom: 17px !important;
  color: #8e8e8e;
`;

const StyleTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
