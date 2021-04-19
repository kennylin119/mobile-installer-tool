import React from "react";
import styled from "styled-components";


const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 10rem;
  background: light gray;
  color: gray;
  border: 2px solid black;
  text-align: center;
`;

const handleOnClick = (event) => {
  console.log("[handleOnClick]");

  // prevents broswer refresh
  event.preventDefault();
};

const SelectionButton = (props) => {
  return <Button> {props.label} </Button>;
};

export default SelectionButton;
