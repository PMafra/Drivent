import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";

export default function ChosenHotel({ ticketInfo, setHasARoom }) {
  const { hotel } = ticketInfo.room;
  return (
    <Wrapper>
      <StyleTypography variant="h4">Escolha de hotel e quarto</StyleTypography>
      <SubTitle>Você já escolheu seu quarto:</SubTitle>
      <Option>
        <img src={hotel.imgUrl} alt="" />
        <HotelInfo>
          <div className="name">{hotel.name}</div>
          <div className="infos">
            <strong>Quarto reservado</strong>
            {`${ticketInfo.room.name} (${ticketInfo.room.totalBeds === 1 ? "Single" : ticketInfo.room.totalBeds === 2 ? "Double" : "Triple"})`}
          </div>
          <div className="infos last">
            <strong>Pessoas no seu quarto</strong>
            Você e mais 1
          </div>
        </HotelInfo>
      </Option>
      <div></div>
      <SendButton onClick={() => setHasARoom(false)}>TROCAR DE QUARTO</SendButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`]
  display: flex;
  flex-direction: column;
`;

const HotelInfo = styled.span`
    font-size: 12px;
    line-height: 14px;
    color: #3C3C3C;
    .name {
        font-size: 20px !important;
        line-height: 23px !important;
        color: #343434;
    }
    .infos {
        display: flex;
        flex-direction: column;
    }
    .last {
        margin-bottom: 10px;
    }
`;

const SubTitle = styled(Typography)`
  font-size: 20px !important;
  margin-bottom: 17px !important;
  color: #8e8e8e;
`;

const StyleTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;

const Option = styled(Button)`
  width: 190px;
  max-height: 280px;
  border: none !important;
  border-radius: 10px !important;
  text-transform: none !important;
  background-color: #FFEED2 !important;
  span {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  img {
      width: 100%;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
      margin-top: 10px;
  }
  @media(max-width: 670px) {
    img {
      height: 70px;
    }
  }
`;

const SendButton = styled(Button)`
  margin-top: 38px !important;
  width: 182px;
  height: 37px;
  background: #E0E0E0 !important;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;
