import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import UserCertificate from "../../../components/Certificate";

export default function Certificate() {
  return (
    <>
      <Title variant="h4">Seu certificado</Title>
      < UserCertificate />
    </>
  );
}

const Title = styled(Typography)`
  margin-bottom: 37px!important;
`;
