import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

import useApi from "../../../hooks/useApi";

import UserCertificate from "../../../components/Certificate";
import Unauthorized from "../../../components/shared/Unauthorized";

export default function Certificate() {
  const { enrollment, ticket } = useApi();
  const [userInfo, setUserInfo] = useState("");
  const [ticketInfo, setTicketInfo] = useState("");
  const [authorized, setAuthorized] = useState(false);

  function downloadPdf() {
    htmlToImage.toPng(document.getElementById("pdf"))
      .then(dataUrl => {
        const link = document.createElement("a");
        link.download = "Certificado.png";
        const doc = new jsPDF({
          orientation: "l",
          unit: "pt",
          format: "a4",
        });
        const pdfWidth = doc.internal.pageSize.getWidth();
        let pdfHeight = doc.internal.pageSize.getHeight();
        doc.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        doc.save("Certificado.pdf"); 
      });
  }
 
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
          <DownloadPdfButton onClick={downloadPdf}>DOWNLOAD DO CERFITICADO</DownloadPdfButton>
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

const DownloadPdfButton = styled(Button)`
  width: 250px;
  height: 45px;
  border: 1px solid #CECECE !important;
  font-weight: 700 !important;
  border-radius: 10px !important;
`;
