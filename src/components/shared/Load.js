import styled from "styled-components";
import Loader from "react-loader-spinner";

export default  function Load() {
  return (
    <Container>
      <Loader type="TailSpin" color="#124090" width="180px" height="180px" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
