import styled from "styled-components";
import { useState, useEffect } from "react";

export default function UserCertificate({ ticketInfo, userInfo }) {
  const EVENT_HOURS = 15;
  const [modalityName, setModalityName] = useState("");

  function cleanModalityName() {
    const modalityName = ticketInfo.modality.name.split("+");
    return modalityName[0];
  }

  useEffect(() => {
    setModalityName(cleanModalityName());
  }, []);

  return (
    <Container>
      <Title>Certificado</Title>
      <Text>Certificamos que {userInfo.name} concluiu o evento de tecnologia Drivent, com duração de {EVENT_HOURS} horas entre os dias 22/10, 23/10 e 24/10.
        <br/>
      Tipo de participação:  {modalityName}.  
      </Text>
      <Signature>Equipe Drivent</Signature>
      _________________________________
    </Container>
  );
}

const Container = styled.div`
    width: 650px;
    height: 450px;
    background-image: linear-gradient(to right, #ee409740, #f8d87f49);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid #7B7B7B;
`;

const Title = styled.span`
  font-size: 40px;
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
  font-weight: bold;
  font-family: 'Oooh Baby', cursive;
`;
