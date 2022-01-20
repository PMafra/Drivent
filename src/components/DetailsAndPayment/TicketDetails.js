import styled from "styled-components";

export default function TicketDetails({ name, price }) {
  const formatedPrice = (price/100).toFixed(2);
  const priceString = `R$ ${formatedPrice.toString().replace(".", ",")}`;

  return (
    <Wrapper>
      <Card>
        <TicketName>{name}</TicketName>
        <Price>{priceString}</Price>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 30px;
  font-weight: 400;
`;

const Card = styled.div`
  width: 290px;
  height: 108px;
  border-radius: 20px;
  background-color: #FFEED2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TicketName = styled.span`
  font-size: 16px;
  color: #454545;
  margin-bottom: 8px;
`;

const Price = styled.span`
  font-size: 14px;
  color: #898989;
`;
