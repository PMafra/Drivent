import React from "react";
import styled from "styled-components";

export default function Unauthorized({ message }) {
  return <Message>{message}</Message>;
}

const Message = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  color: #8e8e8e;
  justify-content: center;
  align-items: center;
  padding: 0px 15%;
  line-height: 23px;
  font-size: 20px;
  text-align: center;
`;
