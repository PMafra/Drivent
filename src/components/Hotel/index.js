import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

export default function Hotels({ rooms, hotels }) {
  const [chosenHotel, setChosenHotel] = useState("");

  function defineType(hotel) {
    let roomTypes = [];
  
    rooms.forEach((room) => {
      if (room.hotel.id === hotel.id) {
        if (room.totalBeds === 1 && !roomTypes.some(e => e.type === "Single")) roomTypes.push({ type: "Single", id: 1 });
        if (room.totalBeds === 2 && !roomTypes.some(e => e.type === "Double")) roomTypes.push({ type: "Double", id: 2 });
        if (room.totalBeds === 3 && !roomTypes.some(e => e.type === "Triple")) roomTypes.push({ type: "Triple", id: 3 });
      }
    });

    const sortedTypes = roomTypes.sort((a, b) => a.id - b.id);

    if (sortedTypes.length === 1) {
      return sortedTypes[0].type;
    }
    if (sortedTypes.length === 2) {
      return `${sortedTypes[0].type} e ${sortedTypes[1].type}`;
    }
    if (sortedTypes.length === 3) {
      return `${sortedTypes[0].type}, ${sortedTypes[1].type} e ${sortedTypes[2].type}`;
    }
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
