import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import Rooms from "../Rooms";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";

export default function Hotels({ rooms, hotels }) {
  const [chosenHotel, setChosenHotel] = useState("");
  const [chosenRoom, setChosenRoom] = useState("");
  const { userData } = useContext(UserContext);
  const { ticket } = useApi();

  function postRoomHandler() {
    const body = {
      roomId: chosenRoom.id,
    };
    ticket.updateTicketRoom(body, userData.user.id).then(res => {
      toast("Quarto escolhido com sucesso!");
    }).catch(err => {
      toast("Houve um erro ao escolher o quarto.");
    });
  }

  function defineType(hotel) {
    let typesString = "";
    let hashtableTypes = {
      Single: false,
      Double: false,
      Triple: false,
    };
  
    rooms.forEach((room) => {
      if (room.hotel.id === hotel.id) {
        if (room.totalBeds === 1) hashtableTypes["Single"] = true;
        if (room.totalBeds === 2) hashtableTypes["Double"] = true;
        if (room.totalBeds === 3) hashtableTypes["Triple"] = true;
      }
    });

    for (const type in hashtableTypes) {
      if (type === Object.keys(hashtableTypes)[Object.keys(hashtableTypes).length-1]) {
        typesString += " e ";
      } else {
        if (typesString) typesString += ", ";
      }
      if (hashtableTypes[type]) {
        typesString += String(type);
      }
    }

    return typesString;
  }

  function calculateEmptyBeds(hotel) {
    let totalEmptyBeds = 0;
  
    rooms.forEach((room) => {
      if (room.hotel.id === hotel.id) {
        totalEmptyBeds += room.totalBeds - room.occupiedBeds;
      }
    });

    return totalEmptyBeds;
  }

  return (
    <>
      <StyleTypography variant="h4">Escolha de hotel e quarto</StyleTypography>
      <SubTitle>Primeiro, escolha seu hotel</SubTitle>
      <Container display="flex">
        {hotels.map((hotel) => (
          <Option
            chosen={chosenHotel.id === hotel.id ? 1 : 0}
            onClick={() => setChosenHotel(hotel)}
            variant="outlined"
            key={hotel.id}
          >
            <img src={hotel.imgUrl} alt="" />
            <HotelInfo>
              <div className="name">{hotel.name}</div>
              <div className="infos">
                <strong>Tipos de acomodação</strong>
                {defineType(hotel)}
              </div>
              <div className="infos last">
                <strong>Vagas disponíveis</strong>
                {calculateEmptyBeds(hotel)}
              </div>
            </HotelInfo>
          </Option>
        ))}
      </Container>
      {chosenHotel&&<Rooms rooms={rooms.filter(room => room.hotel.id === chosenHotel.id)} setChosenRoom={setChosenRoom} chosenRoom={chosenRoom} />}
      {chosenRoom&&<SendButton onClick={postRoomHandler}>Reservar Quarto</SendButton>}
    </>
  );
}

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

const Option = styled(Button)`
  width: 190px;
  max-height: 280px;
  border: none !important;
  border-radius: 10px !important;
  text-transform: none !important;
  background-color: ${({ chosen }) => (chosen ? "#FFEED2 !important" : "#F1F1F1 !important")};
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

const Container = styled.div`
  display: ${(props) => props.display || "none"};
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

const SendButton = styled.button`
  margin-top: 46px;
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;
