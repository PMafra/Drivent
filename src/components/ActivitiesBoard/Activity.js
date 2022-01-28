import styled from "styled-components";
import { MdExitToApp } from "react-icons/md";
import { IconContext } from "react-icons";

export default function ActivitiesBoard({ id, name, startTime, endTime, totalSeats }) {
  return(
    < Container >
      <InfoWrapper>
        <Name>{name}</Name>
        <Time>{startTime} - {endTime}</Time>
      </InfoWrapper>
      < VacancyInfo >
        <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
          <DoorIcon />
        </IconContext.Provider>
        < AvailableSeats >
          {totalSeats} vagas
        </AvailableSeats>
      </ VacancyInfo>
    </ Container >
  );
}

const Container = styled.div`
    width: 91%;
    height: 80px;
    background-color: #F1F1F1;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const InfoWrapper = styled.div`
  width: 70%;
  height: 70%;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content:start;
  padding-left: 10px;
  border-right: 1px solid #CFCFCF;
  color: #343434;
`;

const Name = styled.span`
  font-weight: 700;
  margin: 3px 0 8px 0;
`;

const Time = styled.span`
  font-weight: 400;
`;

const VacancyInfo = styled.button`
  width: 30%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center ;
  align-items: center;
  border: none;
  cursor: pointer;
`;

const DoorIcon = styled(MdExitToApp)`
  height: 20px;
  width: 20px;
`;

const AvailableSeats = styled.span`
  margin-top: 5px;
  font-size: 9px;
  color: green;
  font-weight: 400;
`;
