import styled from "styled-components";
import { Button } from "@material-ui/core";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";

export default function Certificate() {
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
  return (
    <Wrapper>
      <Pdf id="pdf">
        
        CERTIFICADO AQUI
      </Pdf>
      <DownloadPdfButton onClick={downloadPdf}>DOWNLOAD DO CERFITICADO</DownloadPdfButton>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  gap: 15px;
`;

const DownloadPdfButton = styled(Button)`
  width: 250px;
  height: 45px;
  border: 1px solid #CECECE !important;
  font-weight: 700 !important;
  border-radius: 10px !important;
`;

const Pdf = styled.div`
  background-color: pink;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 4em;
`;
