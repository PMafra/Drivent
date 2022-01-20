import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import TicketDetails from "./TicketDetails";

// MOCKED DATA FROM SERVICES
const mockedTicket = {
  id: 3, 
  name: "Presencial + Com Hotel",
  price: 60000
};

export default function DetailsAndPayment() {
  return (
    <>
      <Title variant="h4">Ingresso e pagamento</Title>
      <Subtitle variant="h6">Ingresso escolhido</Subtitle>
      <TicketDetails 
        id={mockedTicket.id}
        name={mockedTicket.name} 
        price={mockedTicket.price}
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
