import { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import useApi from "../../hooks/useApi";

import TicketDetails from "./TicketDetails";

export default function DetailsAndPayment() {
  const { ticket } = useApi();
  const [data, setData] = useState({
    id: "",
    name: "Carregando...",
    price: "",
  });

  useEffect(() => {
    ticket.getTicketInformations().then(response => {
      if (response.status !== 200) {
        return;
      }

      setData({
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
        id={data.id}
        name={data.name} 
        price={data.price}
      />
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
