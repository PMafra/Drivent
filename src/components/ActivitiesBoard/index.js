import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import useApi from "../../hooks/useApi";

import Load from "../../components/shared/Load";
import Activity from "./Activity";

export default function ActivitiesBoard({ chosenEventDay, ticketInfo }) {
  const eventDayId = chosenEventDay.id;
  const { activity } = useApi();
  const [ loading, setLoading ] = useState(true);
  const [ activitiesHall1, setActivitiesHall1 ] = useState("");
  const [ activitiesHall2, setActivitiesHall2 ] = useState("");
  const [ activitiesHall3, setActivitiesHall3 ] = useState("");

  function sortArrayByStartTime(arr) {
    arr.sort(function compare(a, b) {
      if (a.startTime < b.startTime) return -1;
      if (a.startTime > b.startTime) return 1;
      return 0;
    });
  }
  
  useEffect(() => {
    activity.getEventDayActivities(eventDayId).then( (res) => {
      const hall1 = res.data.filter( activity => activity.hall.id === 1);
      const hall2 = res.data.filter( activity => activity.hall.id === 2);
      const hall3 = res.data.filter( activity => activity.hall.id === 3);
      sortArrayByStartTime(hall1);
      sortArrayByStartTime(hall2);
      sortArrayByStartTime(hall3);
      setActivitiesHall1(hall1);
      setActivitiesHall2(hall2);
      setActivitiesHall3(hall3);
      setLoading(false);
    })
      .catch( (err) => {
        toast("Houve um problema com as atividades desse dia");
        setLoading(false);
      });
  }, [eventDayId]);

  return(
    <>
      { loading 
        ? (
          < Load />
        )
        : (
          <BoardContainer>
            <HallName>Auditório Principal</HallName>
            <HallName>Auditório Lateral</HallName>
            <HallName>Sala de Workshop</HallName>
            < ContainerHall1 >
              {activitiesHall1.map( activity => 
                < Activity 
                  key = {activity.id}
                  activity = {activity}
                  ticketInfo = {ticketInfo}
                />)}
            </ ContainerHall1>
            < ContainerHall2 >
              {activitiesHall2.map( activity => 
                < Activity 
                  key = {activity.id}
                  activity = {activity}
                  ticketInfo = {ticketInfo}
                />)}
            </ ContainerHall2>
            < ContainerHall3 >
              {activitiesHall3.map( activity => 
                < Activity 
                  key = {activity.id}
                  activity = {activity}
                  ticketInfo = {ticketInfo}
                />)}
            </ContainerHall3>
          </BoardContainer>
        )
      }
    </>
  );
}

const BoardContainer = styled.div`
    width: 91%;
    display: grid;
    grid-template-columns: 288px 288px 288px;
    grid-template-rows: 40px 391px;
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

const ContainerHall1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #7B7B7B;
  border-right: 1px solid #7B7B7B;
  border-top: 1px solid #7B7B7B;
  border-bottom: 1px solid #7B7B7B;
  padding-top: 10px;
`;
const ContainerHall2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #7B7B7B;
  border-top: 1px solid #7B7B7B;
  border-bottom: 1px solid #7B7B7B;
  padding-top: 10px;
`;

const ContainerHall3 = ContainerHall2;
