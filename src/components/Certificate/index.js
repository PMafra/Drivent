import styled from "styled-components";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import signature from "../../assets/images/signature.png";

export default function UserCertificate({ ticketInfo, userInfo }) {
  const EVENT_HOURS = 15;
  const [modalityName, setModalityName] = useState("");

  function cleanModalityName() {
    const modalityName = ticketInfo.modality.name.split("+");
    return modalityName[0];
  }

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
        const pdfHeight = doc.internal.pageSize.getHeight();
        doc.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        doc.save("Certificado.pdf"); 
      });
  }

  useEffect(() => {
    setModalityName(cleanModalityName());
  }, []);

  return (
    <Wrapper>
      <Container id="pdf">
        <Title>Certificado</Title>
        <Text>Certificamos que {userInfo.name} concluiu o evento de tecnologia Drivent, com duração de {EVENT_HOURS} horas entre os dias 22/10, 23/10 e 24/10.
          <br/>
        Tipo de participação:  {modalityName}.  
        </Text>
        <Signature><img src={signature} alt="assinatura"></img></Signature>
        <Line>
          _________________________________
        </Line>
      </Container>
      <DownloadPdfButton onClick={downloadPdf}>DOWNLOAD DO CERFITICADO</DownloadPdfButton>
    </Wrapper>
  );
}

const Line = styled.p``;

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Container = styled.div`
    width: 85%;
    height: 475px;
    background-image: linear-gradient(to right, #ee409740, #f8d87f49);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid #7B7B7B;
`;

const Title = styled.span`
  font-size: 40px;
  margin-top: 15px;
`;

const Text = styled.p`
  width: 85%;
  font-size: 18px;
  text-align: center;
  margin: 80px 0;
  line-height: 30px;
`;

const Signature = styled.span`
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: -15px;
  font-weight: bold;
  font-family: 'Oooh Baby', cursive;
  width: 350px;
  text-align: center;
`;

const DownloadPdfButton = styled(Button)`
  width: 250px;
  height: 45px;
  border: 1px solid #CECECE !important;
  font-weight: 700 !important;
  border-radius: 5px !important;
`;
