<<<<<<< HEAD
import ActivitiesBoard from "../../../components/ActivitiesBoard.js";

export default function Activities() {
  return <ActivitiesBoard />;
=======
import { useState, useEffect } from "react";
import Unauthorized from "../../../components/shared/Unauthorized";
import useApi from "../../../hooks/useApi";
import EventDays from "../../../components/EventDay/index";
import { toast } from "react-toastify";

export default function Activities() {
  const { ticket, eventDay } = useApi();
  const [message, setMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [eventDays, setEventDays] = useState("");

  function checkTicketInfo(userTicket) {
    if (!userTicket?.isPaid) {
      setMessage("Você precisa ter confirmado pagamento antes de fazer a escolha das atividades");
      return;
    };
    if (userTicket.modality.name === "Online") {
      setMessage("Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.");
      return;
    };
    setAuthorized(true);
  }

  function obtainPaymentInfo() {
    ticket.getTicketInformations().then((res) => {
      checkTicketInfo(res.data[0]);
    }).catch((err) => {
      toast("Houve um problema ao buscar as informações do ticket");
    });
  }

  function obtainEventDaysInfo() {
    eventDay.getEventDaysInformations().then((res) => {
      setEventDays(res.data);
    }).catch((err) => {
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

  if (!authorized || !eventDays) {
    return(
      <Unauthorized message={message} />
    );
  }
  return(
    <EventDays eventDays={eventDays}/>
  );
>>>>>>> e277ff9a61da61b51f22c8711d415d9504efb505
}
