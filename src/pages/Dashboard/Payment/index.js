import useApi from "../../../hooks/useApi";
import Unauthorized from "../../../components/shared/Unauthorized";
import React, { useEffect, useState } from "react";

import DetailsAndPayment from "../../../components/DetailsAndPayment";
import Tickets from "../../../components/Tickets";

export default function Payment() {
  const { enrollment } = useApi();

  const [subscription, setSubscription] = useState(false);
  const [ reservedTicket, setReservedTicket] = useState(true);

  useEffect(() => {
    enrollment.getPersonalInformations().then((resp) => {
      if (resp.data.id) setSubscription(!subscription);
    });
  }, []);

  return (
    <>
      {!subscription ? (
        <Unauthorized
          message="Você precisa completar sua inscrição antes
          de prosseguir pra escolha de ingresso"
        />
      ) : (
        <>{ !reservedTicket? (
          <Tickets />
        ) : (
          <DetailsAndPayment />
        )
        }
        </>
      )}
    </>
  );
}
