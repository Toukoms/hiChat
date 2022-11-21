import React from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";

function Welcome({ currentUser }) {
  return (
    <>
      {currentUser && (
        <Container>
          <img src={robot} alt="robot" />
          <h2>Welcome, <span>{currentUser.username}</span></h2>
          <p>Select a chat to start</p>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
img{
    height: 20rem;
}
h2{
    span{
        font-size: 1.5rem;
        color: #07ffe3;
    }
}
`;

export default Welcome;
