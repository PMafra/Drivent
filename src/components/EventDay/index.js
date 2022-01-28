import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

export default function EventDays({ eventDays, chosenEventDay, setChosenEventDay }) {
  function setWeekDay(date) {
    const newDate = new Date(date);
    const weekDay = format(newDate, "eeee", { locale: pt });
    const formatedWeekDay = weekDay.split("-")[0];
    const firstLetter = formatedWeekDay[0];
    const upperFirst = formatedWeekDay.replace(firstLetter[0], firstLetter[0].toUpperCase());
    return upperFirst;
  }

  function setDateFormat(date) {
    const newDate = new Date(date);
    const dayAndMonth = format(newDate, "dd/MM");
    return dayAndMonth;
  }

  return (
    <>
      <StyleTypography variant="h4">Escolha de atividades</StyleTypography>
      <SubTitle>Primeiro, filtre pelo dia do evento:</SubTitle>
      <Container display="flex">
        {eventDays.map((eventDay) => (
          <Option
            chosen={chosenEventDay.id === eventDay.id ? 1 : 0}
            onClick={() => setChosenEventDay(eventDay)}
            variant="outlined"
            key={eventDay.id}
          >
            <EventDayInfo>
              {setWeekDay(eventDay.day)}, {setDateFormat(eventDay.day)}
            </EventDayInfo>
          </Option>
        ))}
      </Container>
    </>
  );
}

const EventDayInfo = styled.div`
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    word-break: break-all;
`;

const Option = styled(Button)`
  padding: 10px 20px !important;
  border: none !important;
  border-radius: 10px !important;
  text-transform: none !important;
  background-color: ${({ chosen }) => (chosen ? "#FFEED2 !important" : "#E0E0E0 !important")};
  span {
    display: flex;
    flex-direction: row;
    gap: 3px;
    @media (max-width: 600px) {
      flex-direction: column;
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
