import { useState, useEffect } from "react";
import Unauthorized from "../../../components/shared/Unauthorized";
import useApi from "../../../hooks/useApi";

export default function Hotel() {
  const { ticket } = useApi();
  const [ticketInfo, setTicketInfo] = useState("");

  function checkForPayment() {
    ticket.getTicketInformations().then((res) => {
      // eslint-disable-next-line no-console
      console.log(res.data[0]);
      setTicketInfo(res.data[0]);
    });
  }

  useEffect(() => {
    checkForPayment();
  }, []);

  if (!ticketInfo.isPaid) {
    return(
      <Unauthorized 
        message="Você precisa ter confirmado pagamento
        antes de fazer a escolha de hospedagem"
      />
    );
  }

  return(
    <>
      Hotel
    </>
  );
}
