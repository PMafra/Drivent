import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import Load from "../shared/Load";

export default function ActivitiesBoard() {
  return(
    <BoardContainer>
      <HallName>Auditório Principal</HallName>
      <HallName>Auditório Lateral</HallName>
      <HallName>Sala de Workshop</HallName>
      <FirstEventsContainer />
      <EventsContainer />
      <EventsContainer />
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
    width: 91%;
    display: grid;
    grid-template-columns: 288px 288px 288px;
    grid-template-rows: 40px 391px;

    :nth-child(4) {
      border-left: 1px solid black;
  }
`;

const HallName = styled.div`
  display: flex;
  justify-content: center ;
  align-items: center;
  font-size: 17px;
  line-height: 20px;
  font-weight: 400;
  color: #7B7B7B;
`;

const FirstEventsContainer = styled.div`
  display: flex;
  border-left: 1px solid #7B7B7B;
  border-right: 1px solid #7B7B7B;
  border-top: 1px solid #7B7B7B;
  border-bottom: 1px solid #7B7B7B;
`;
const EventsContainer = styled.div`
  display: flex;
  border-right: 1px solid #7B7B7B;
  border-top: 1px solid #7B7B7B;
  border-bottom: 1px solid #7B7B7B;
`;
