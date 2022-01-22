import { useState, useEffect } from "react";
import Unauthorized from "../../../components/shared/Unauthorized";
import useApi from "../../../hooks/useApi";
import Hotels from "../../../components/Hotel/index";

export default function Hotel() {
  const { ticket, hotel, room } = useApi();
  const [message, setMessage] = useState("Houve um problema ao buscar os hoteis");
  const [authorized, setAuthorized] = useState(false);
  const [hotels, setHotels] = useState("");
  const [rooms, setRooms] = useState("");

  function obtainPaymentInfo() {
    ticket.getTicketInformations().then((res) => {
      checkTicketInfo(res.data[0]);
    });
  }

  function checkTicketInfo(userTicket) {
    if (!userTicket.isPaid) {
      setMessage("Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem");
      return;
    };
    if (userTicket.modality.name !== "Presencial + Com Hotel") {
      setMessage("Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades");
      return;
    };
    setAuthorized(true);
  }

  function obtainHotelsInfo() {
    hotel.getHotelsInformations().then((res) => {
      setHotels(res.data);
    });
  }

  function obtainRoomsInfo() {
    room.getRoomsInformations().then((res) => {
      setRooms(res.data.sort((a, b) => a.id - b.id));
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

  if (!authorized || !hotels || !rooms) {
    return(
      <Unauthorized message={message} />
    );
  }
  return(
    <Hotels hotels={hotels} rooms={rooms}  obtainRoomsInfo={obtainRoomsInfo}/>
  );
}
