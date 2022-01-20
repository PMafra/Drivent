import useApi from "../../../hooks/useApi";
import Unauthorized from "../../../components/shared/Unauthorized";

export default function Payment() {
  const { enrollment } = useApi();

  enrollment.getPersonalInformations().then((resp) => {
    console.log(resp.data);
  });
  
  return (
    <Unauthorized
      message="Você precisa completar sua inscrição antes
  de prosseguir pra escolha de ingresso"
    />
  );
}
