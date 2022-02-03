import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import useApi from "../../../hooks/useApi";

import UserCertificate from "../../../components/Certificate";
import Unauthorized from "../../../components/shared/Unauthorized";

export default function Certificate() {
  const { enrollment, ticket } = useApi();
  const [userInfo, setUserInfo] = useState("");
  const [ticketInfo, setTicketInfo] = useState("");
  const [authorized, setAuthorized] = useState(false);
 
  useEffect(() => {
    ticket.getTicketInformations().then((res) => {
      setTicketInfo(res.data[0]);
    }).catch((err) => {
      toast("Houve um problema ao buscar as informações do ticket");
    });

    enrollment.getPersonalInformations().then((res) => {
      setUserInfo(res.data);
    }).catch((err) => {
      toast("Houve um problema ao buscar as informações do usuário");
    });
  }, []);

  useEffect(() => {
    if (userInfo && ticketInfo && ticketInfo.isPaid) {
      setAuthorized(true);
    }
  }, [userInfo, ticketInfo]);

  return (
    <>
      { authorized
        ? 
        <Wrapper>
          <Title variant="h4">Seu certificado</Title>
          < UserCertificate 
            userInfo = {userInfo}
            ticketInfo = {ticketInfo}
          />
        </Wrapper>
        : 
        < Unauthorized  message = "Certificado não disponível"/>
      }
     
    </>
  );
}

const Title = styled(Typography)`
  margin-bottom: 37px!important;
`;

const Wrapper = styled.section`
  height: 100%;
`;
