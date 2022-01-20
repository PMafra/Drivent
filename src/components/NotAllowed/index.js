import styled from "styled-components";

export default function NotAllowed({ message }) {
  return(
    <MessageContainer>
      <p>
        {message}
      </p>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & p {
        font-size: 20px;
        line-height: 25px;
        color: #8E8E8E;
        text-align: center;
        max-width: 60%;
    }
`;
