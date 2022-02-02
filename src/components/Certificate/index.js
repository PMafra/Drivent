import styled from "styled-components";

export default function UserCertificate() {
  const EVENT_HOURS = 15;
  return (
    <Container>
      <Title>Certificado</Title>
      <Text>Certificamos que Victor Durço Gomes Bijos concluiu o evento de tecnologia Drivent, com duração de {EVENT_HOURS} horas entre os dias 22/10, 23/10 e 24/10.
        <br/>
      Tipo de participação: presencial.  
      </Text>
      <Signature>Equipe Drivent</Signature>
    </Container>
  );
}

const Container = styled.div`
    width: 650px;
    height: 450px;
    background-color: #ededed;
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
  font-size: 15px;
  text-align: center;
  margin: 80px 0;
  line-height: 30px;
`;

const Signature = styled.span`
  font-size: 25px;
  margin-top: 80px;
`;
