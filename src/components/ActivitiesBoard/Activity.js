import styled from "styled-components";
import { MdExitToApp } from "react-icons/md";
import { BiXCircle } from "react-icons/bi";
import { IconContext } from "react-icons";
import dayjs from "dayjs";

export default function Activity({ id, name, startTime, endTime, totalSeats }) {
  // 2021-02-05 is just a date so dayjs can reconize the time as a date
  const formatedStartTime = "2022-01-28" + startTime;
  const formatedEndTime = "2022-01-28" + endTime;
  const showStartTime = dayjs(formatedStartTime).format("HH:mm"); 
  const showEndTime = dayjs(formatedEndTime).format("HH:mm");    
  const activityLength =  dayjs(formatedEndTime).diff(formatedStartTime, "hour", true);
                                                                        
  return(
    < Container length = {activityLength === 1 ? 80 : ((activityLength * 80) + 10)}>
      <InfoWrapper>
        <Name>{name}</Name>
        <Time>{showStartTime} - {showEndTime}</Time>
      </InfoWrapper>
      < VacancyInfo >
        {totalSeats > 0 
          ? (
            <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
              <DoorIcon />
            </IconContext.Provider>
          )
          : (
            <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
              < SoldOffIcon />
            </IconContext.Provider>
          )
        }
        < AvailableSeats available = { totalSeats > 0 ? true : false}>
          {totalSeats > 0
            ? (`${totalSeats} vagas`)
            : ("Esgotado")
          }
          
        </AvailableSeats>
      </ VacancyInfo >
    </ Container >
  );
}

const Container = styled.div`
    width: 91%;
    height: ${ props => props.length ? `${props.length}px` : "80px"};
    background-color: #F1F1F1;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const InfoWrapper = styled.div`
  width: 74%;
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
  padding-right: 5px;
`;

const Time = styled.span`
  font-weight: 400;
`;

const VacancyInfo = styled.button`
  width: 26%;
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

const SoldOffIcon = styled(BiXCircle)`
  height: 20px;
  width: 20px;
`;

const AvailableSeats = styled.span`
  margin-top: 5px;
  font-size: 9px;
  color: ${ props => props.available? "green" : "red" };
  font-weight: 400;
`;
