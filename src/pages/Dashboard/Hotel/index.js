import { useState, useEffect } from "react";
import Unauthorized from "../../../components/shared/Unauthorized";
import useApi from "../../../hooks/useApi";

export default function Hotel() {
  const { ticket, hotel, room } = useApi();
  const [ticketInfo, setTicketInfo] = useState("");
  const [message, setMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);

  function obtainPaymentInfo() {
    ticket.getTicketInformations().then((res) => {
      checkTicketInfo(res.data[0]);
      setTicketInfo(res.data[0]);
    });
  }

  function checkTicketInfo(ticket) {
    if (!ticket.isPaid) {
      setMessage("Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem");
      return;
    };
    if (ticket.modality.name !== "Presencial + Com Hotel") {
      setMessage("Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades");
      return;
    };
    setAuthorized(true);
  }

  function obtainHotelsInfo() {
    hotel.getHotelsInformations().then((res) => {
      // eslint-disable-next-line no-console
      console.log(res.data);
    });
  }

  function obtainRoomsInfo() {
    room.getRoomsInformations().then((res) => {
      // eslint-disable-next-line no-console
      console.log(res.data);
    });
  }

  useEffect(() => {
    obtainPaymentInfo();
  }, []);

  useEffect(() => {
    if (authorized) {
      obtainHotelsInfo();
      obtainRoomsInfo();
    };
  }, [authorized]);

  if (!authorized) {
    return(
      <Unauthorized message={message} />
    );
  }

  return(
    <>
      Hotel
    </>
  );
}
