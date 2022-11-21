import React from "react";
import axios from "axios";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Logout() {
  // state
  const navigate = useNavigate();

  // comportement
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  background-color: #8547a1;
  border-radius: 0.2rem;
  height: 2rem;
  svg {
    font-size: 1.25rem;
    color: #fff;
  }
`;

export default Logout;
