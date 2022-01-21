import styled from "styled-components";

export default function Rooms({ rooms }) {
  return (
    <>
      <Header>Ótima pedida! Agora escolha seu quarto:</Header>
      <RoomsContainer>
        {rooms.map(room => <Room></Room>)}
      </RoomsContainer>
    </>
  );
}

const Header = styled.p`
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin-bottom: 33px;
`;

const RoomsContainer = styled.div`
  display: flex;
  gap: 17px 8px;
  max-width: 100%;
  flex-wrap: wrap;
`;

const Room = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  box-sizing: border-box;
  border-radius: 10px;
`;
