import React from "react";
import styled from "styled-components";
import { ReactComponent as Warning } from "../assets/icons/danger.svg";

const ErrorStyles = styled.div`
  padding: 15px;
  background: ${props => props.theme.red2};

  display: flex;
  align-items: center;
  border-radius: 10px;
  h1 {
    font-size: 20px;
    color: ${props => props.theme.white};
    font-weight: 400;
  }

  .warning-logo {
    fill: ${props => props.theme.white};
    height: 30px;
    margin-right: 15px;
  }
`;

const ErrorMessage = props => (
  <ErrorStyles>
    <Warning className="warning-logo" />
    <h1>{props.error}</h1>
  </ErrorStyles>
);

export default ErrorMessage;
