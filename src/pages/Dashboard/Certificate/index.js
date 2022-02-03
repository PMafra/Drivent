import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import useApi from "../../../hooks/useApi";

import UserCertificate from "../../../components/Certificate";
import Unauthorized from "../../../components/shared/Unauthorized";
import Load from "../../../components/shared/Load";

export default function Certificate() {
  const { enrollment, ticket } = useApi();
  const [userInfo, setUserInfo] = useState("");
  const [ticketInfo, setTicketInfo] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [majorLoad, setMajorLoad] = useState(true);
 
  useEffect(() => {
    ticket.getTicketInformations().then((res) => {
      setTicketInfo(res.data[0]);
      enrollment.getPersonalInformations().then((res) => {
        setUserInfo(res.data);
        setMajorLoad(false);
      }).catch((err) => {
        setMajorLoad(false);
        toast("Houve um problema ao buscar as informações do usuário");
      });
    }).catch((err) => {
      setMajorLoad(false);
      toast("Houve um problema ao buscar as informações do ticket");
    });
  }, []);

  useEffect(() => {
    if (userInfo && ticketInfo && ticketInfo.isPaid) {
      setAuthorized(true);
    }
  }, [userInfo, ticketInfo]);

  if(majorLoad) {
    return <Load />;
  }

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
