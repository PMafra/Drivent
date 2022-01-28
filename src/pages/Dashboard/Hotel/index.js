import { useState, useEffect } from "react";
import Unauthorized from "../../../components/shared/Unauthorized";
import useApi from "../../../hooks/useApi";
import Hotels from "../../../components/Hotel/index";
import { toast } from "react-toastify";
import Load from "../../../components/shared/Load";

export default function Hotel() {
  const { ticket, hotel, room } = useApi();
  const [message, setMessage] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [hotels, setHotels] = useState("");
  const [rooms, setRooms] = useState("");
  const [majorLoad, setMajorLoad] = useState(true);

  function obtainPaymentInfo() {
    ticket.getTicketInformations().then((res) => {
      checkTicketInfo(res.data[0]);
    }).catch((err) => {
      toast("Houve um problema ao buscar os hoteis");
    });
  }

  function checkTicketInfo(userTicket) {
    if (!userTicket?.isPaid) {
      setMessage("Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem");
      setMajorLoad(false);
      return;
    };
    if (userTicket.modality.name !== "Presencial + Com Hotel") {
      setMessage("Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades");
      setMajorLoad(false);
      return;
    };
    setAuthorized(true);
    setMajorLoad(false);
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

  if(majorLoad || ((!hotels || !rooms) && authorized)) {
    return <Load />;
  }

  if (!authorized || !hotels || !rooms) {
    return(
      <Unauthorized message={message} />
    );
  }
  return(
    <Hotels hotels={hotels} rooms={rooms}  obtainRoomsInfo={obtainRoomsInfo}/>
  );
}
