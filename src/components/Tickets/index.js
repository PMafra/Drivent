import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";
import Load from "../shared/Load";

export default function Tickets({ setReservedTicket }) {
  const [value, setValue] = useState(0);
  const [ingresso, setIngresso] = useState("");
  const [hotel, setHotel] = useState("");
  const { userData } = useContext(UserContext);
  const { ticket } = useApi();
  const [majorLoad, setMajorLoad] = useState(true);

  useEffect(() => {
    setHotel("");
  }, [ingresso]);

  useEffect(() => {
    setMajorLoad(true);
    ticket.getTicketInformations().then((response) => {
      if (response.status !== 200) {
        setMajorLoad(false);
        return;
      }
      if (response.data.length > 0) {
        setReservedTicket(true);
      }
      setMajorLoad(false);
    });
  }, []);

  useEffect(() => {
    let ticketPrice = ingresso === "inPerson" ? 250 : 100;
    let hotelPrice = hotel === "with" ? 350 : 0;
    setValue(hotelPrice + ticketPrice);
  }, [hotel]);

  function postTicketInfo() {
    let modality = 3;
    if (ingresso === "Online") modality = 1;
    if (ingresso === "inPerson" && hotel === "without") modality = 2;

    const body = {
      userId: userData.user.id,
      modalityId: modality,
    };

    ticket
      .postTicketInformations(body)
      .then(() => {
        setReservedTicket(true);
        toast("Seu ticket foi reservado com sucesso!");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast("Você ja possui um ticket");
        } else {
          toast("Servidor fora de área");
        }
      });
  }

  if(majorLoad) {
    return <Load />;
  }

  return (
    <>
      <StyleTypography variant="h4">Ingresso e pagamento</StyleTypography>
      <SubTitle on={1}>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <Container display="grid">
        <Option
          chosen={ingresso === "inPerson" ? 1 : 0}
          onClick={() => setIngresso("inPerson")}
          variant="outlined"
        >
          Presencial
          <Value>R$ 250</Value>
        </Option>
        <Option
          chosen={ingresso === "Online" ? 1 : 0}
          onClick={() => setIngresso("Online")}
          variant="outlined"
        >
          Online
          <Value>R$ 100</Value>
        </Option>
      </Container>
      <SubTitle on={ingresso === "inPerson" ? 1 : 0}>
        Primeiro, escolha sua modalidade de ingresso
      </SubTitle>
      <Container display={ingresso === "inPerson" ? "grid" : ""}>
        <Option
          chosen={hotel === "without" ? 1 : 0}
          onClick={() => setHotel("without")}
          variant="outlined"
        >
          Sem Hotel
          <Value>+ R$ 0</Value>
        </Option>
        <Option
          chosen={hotel === "with" ? 1 : 0}
          onClick={() => setHotel("with")}
          variant="outlined"
        >
          Com Hotel
          <Value>+ R$ 350</Value>
        </Option>
      </Container>
      <SubTitle on={ingresso === "Online" || hotel !== "" ? 1 : 0}>
        Fechado! O total ficou em R$ {value}. Agora é só confirmar:
      </SubTitle>
      <Buton
        on={ingresso === "Online" || hotel !== "" ? 1 : 0}
        onClick={postTicketInfo}
      >
        RESERVAR INGRESSO
      </Buton>
    </>
  );
}

const Buton = styled(Button)`
  display: ${(props) => (props.on ? "" : "none !important")};
  background-color: #e0e0e0 !important;
`;

const Value = styled(Typography)`
  color: #898989;
`;

const Option = styled(Button)`
  border-radius: 20px !important;
  border: 1px solid #cecece !important;
  text-transform: none !important;
  background-color: ${(props) => (props.chosen ? "#FFEED2 !important" : "")};
  span {
    display: flex;
    flex-direction: column;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 150px;
  display: ${(props) => props.display || "none"};
  grid-template-columns: repeat(5, 1fr);
  gap: 2%;
  margin-bottom: 30px;
`;

const SubTitle = styled(Typography)`
  font-size: 20px !important;
  margin-bottom: 17px !important;
  color: #8e8e8e;
  display: ${(props) => (props.on ? "" : "none !important")};
`;

const StyleTypography = styled(Typography)`
  margin-bottom: 35px !important;
`;
