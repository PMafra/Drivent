import styled from "styled-components";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { useState } from "react";

export default function Rooms({ rooms, chosenRoom, setChosenRoom }) {
  rooms.forEach(room => {
    room.emptyBedsArray = [];
    room.occupiedBedsArray = [];
    for(let i=0; i<room.totalBeds - room.occupiedBeds; i++) {
      room.emptyBedsArray.push(1);
    }
    for(let i=0; i<room.occupiedBeds; i++) {
      room.occupiedBedsArray.push(1);
    }
  });

  function choseRoomHandler(room) {
    setChosenRoom(room);
  }

  return (
    <>
      <Header>Ótima pedida! Agora escolha seu quarto:</Header>
      <RoomsContainer>
        {rooms.map(room => 
          <Room onClick={() => choseRoomHandler(room)} full={room.totalBeds === room.occupiedBeds} chosen={room.id === chosenRoom.id}>
            <RoomName>{room.name}</RoomName>
            <Beds>
              {room.emptyBedsArray.map((bed, index) => {
                if (chosenRoom.id === room.id && index === room.emptyBedsArray.length - 1) {
                  // eslint-disable-next-line array-callback-return
                  return;
                }
                return (<BsPerson key={index}/>);
              })}
              {room.id === chosenRoom.id ? <ChosenBed chosen /> : ""}
              {room.occupiedBedsArray.map((bed, index) => <BsPersonFill key={index}/>)}
            </Beds>
          </Room>
        )}
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
  background: ${props => props.full ? "#E9E9E9" : props.chosen ? "#FFEED2" : "inherit"};
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 12px;
  cursor: ${props => props.full ? "default" : "pointer"};
  pointer-events: ${props => props.full ? "none" : "initial"};
  p {
    font-weight: bold;
  }
`;

const RoomName = styled.p`
  font-weight: bold;
`;

const Beds = styled.div`
  font-size: 22px;
  margin-top: 5px;
  display: flex;
  gap: 3px;
`;

const ChosenBed = styled(BsPersonFill)`
  color: #FF4791
`;
