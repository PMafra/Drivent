/* eslint-disable no-console */
import styled from "styled-components";
import { MdExitToApp } from "react-icons/md";
import { BiXCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function Activity({ activity, ticketInfo }) {
  const { id, name, startTime, endTime, totalSeats, subscriptions } = activity;
  const activityApi = useApi().activity;
  const formatedStartTime = "2022-01-28" + startTime;
  const formatedEndTime = "2022-01-28" + endTime;
  const showStartTime = dayjs(formatedStartTime).format("HH:mm");
  const showEndTime = dayjs(formatedEndTime).format("HH:mm");
  const activityLength = dayjs(formatedEndTime).diff(
    formatedStartTime,
    "hour",
    true
  );
  const [freeSeats, setFreeSeats] = useState(totalSeats - subscriptions.length);
  const [isChosen, setIsChosen] = useState(checkIfActivityIsChosen);
  const [open, setOpen] = useState(false);

  function checkIfActivityIsChosen() {
    let chosen = false;
    subscriptions.forEach((sub) => {
      if (sub.ticketId === ticketInfo.id && sub.activityId === id) {
        chosen = true;
      }
    });
    return chosen;
  }
  function postActivity() {
    setOpen(false);
    const body = {
      activityId: id,
      ticketId: ticketInfo.id,
    };
    activityApi
      .postActivity(body)
      .then((resp) => {
        setIsChosen(true);
        setFreeSeats((element) => element - 1);
      })
      .catch((err) => {
        if (err.response.status === 401) toast("Usuário já cadastrado!");
        if (err.response.status === 409) toast("Conflitos de horario!");
        if (err.response.status === 404) toast("Atividade não existe");
        if (err.response.status === 400) toast("Atividade sem vagas");
        if (err.response.status === 500) toast("Problemas com servidor");
      });
  }
  return (
    <Container
      length={activityLength === 1 ? 80 : activityLength * 80 + 10}
      isChosen={isChosen}
    >
      <InfoWrapper>
        <Name>{name}</Name>
        <Time>
          {showStartTime} - {showEndTime}
        </Time>
      </InfoWrapper>
      <VacancyInfo isChosen={isChosen} onClick={() => setOpen(true)}>
        {isChosen ? (
          <IconContext.Provider
            value={{ color: "green", className: "global-class-name" }}
          >
            <ChosenIcon />
          </IconContext.Provider>
        ) : freeSeats > 0 ? (
          <IconContext.Provider
            value={{ color: "green", className: "global-class-name" }}
          >
            <DoorIcon />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            value={{ color: "red", className: "global-class-name" }}
          >
            <SoldOffIcon />
          </IconContext.Provider>
        )}
        <AvailableSeats available={freeSeats > 0 ? true : false}>
          {freeSeats > 0 ? `${freeSeats} vagas` : "Esgotado"}
        </AvailableSeats>
      </VacancyInfo>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza que deseja se inscrever para essa atividade?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Uma vez inscrito, essa ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Não</Button>
          <Button onClick={() => postActivity()} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

const Container = styled.div`
  width: 91%;
  height: ${(props) => (props.length ? `${props.length}px` : "80px")};
  background-color: ${({ isChosen }) => (isChosen ? "#D0FFDB" : "#F1F1F1")};
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
  justify-content: start;
  padding-left: 10px;
  border-right: 1px solid #cfcfcf;
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
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${({ isChosen }) => (isChosen ? "#D0FFDB" : "#F1F1F1")};
  cursor: ${({ isChosen }) => (isChosen ? "default" : "pointer")};
`;

const ChosenIcon = styled(AiOutlineCheckCircle)`
  height: 20px;
  width: 20px;
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
  color: ${(props) => (props.available ? "green" : "red")};
  font-weight: 400;
`;
