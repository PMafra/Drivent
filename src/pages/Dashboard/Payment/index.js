import useApi from "../../../hooks/useApi";
import Unauthorized from "../../../components/shared/Unauthorized";
import React, { useEffect, useState } from "react";
import Tickets from "../../../components/Payment/Tickets";

export default function Payment() {
  const { enrollment } = useApi();

  const [subscription, setSubscription] = useState(false);
  
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
        <Tickets />
      )}
    </>
  );
}
