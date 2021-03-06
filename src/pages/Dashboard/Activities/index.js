import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import useApi from "../../../hooks/useApi";

import Unauthorized from "../../../components/shared/Unauthorized";
import EventDays from "../../../components/EventDay/index";
import ActivitiesBoard from "../../../components/ActivitiesBoard";
import Load from "../../../components/shared/Load";

export default function Activities() {
  const { ticket, eventDay } = useApi();
  const [message, setMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [eventDays, setEventDays] = useState("");
  const [chosenEventDay, setChosenEventDay] = useState("");
  const [ticketInfo, setTicketInfo] = useState("");
  const [majorLoad, setMajorLoad] = useState(true);

  function checkTicketInfo(userTicket) {
    if (!userTicket?.isPaid) {
      setMessage("Você precisa ter confirmado pagamento antes de fazer a escolha das atividades");
      setMajorLoad(false);
      return;
    };
    if (userTicket.modality.name === "Online") {
      setMessage("Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.");
      setMajorLoad(false);
      return;
    };
    setAuthorized(true);
  }

  function obtainPaymentInfo() {
    ticket.getTicketInformations().then((res) => {
      checkTicketInfo(res.data[0]);
      setTicketInfo(res.data[0]);
    }).catch((err) => {
      setMajorLoad(false);
      toast("Houve um problema ao buscar as informações do ticket");
    });
  }

  function obtainEventDaysInfo() {
    setMajorLoad(true);
    eventDay.getEventDaysInformations().then((res) => {
      setEventDays(res.data);
      setMajorLoad(false);
    }).catch((err) => {
      setMajorLoad(false);
      toast("Houve um problema ao buscar as atividades");
    });
  }

  useEffect(() => {
    obtainPaymentInfo();
  }, []);

  useEffect(() => {
    if (authorized) {
      obtainEventDaysInfo();
    };
  }, [authorized]);

  if(majorLoad) {
    return <Load />;
  }

  if (!authorized || !eventDays) {
    return(
      <Unauthorized message={message} />
    );
  }
  return(
    <>
      <EventDays 
        eventDays={eventDays}
        chosenEventDay = { chosenEventDay }
        setChosenEventDay={ setChosenEventDay }
      />
      {chosenEventDay && < ActivitiesBoard chosenEventDay={chosenEventDay} ticketInfo={ticketInfo}/>}
    </>
  );
}

