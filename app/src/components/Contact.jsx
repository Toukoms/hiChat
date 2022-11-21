import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

function Contact({ contacts, curentUser, changeChat}) {
  // state
  const [currentName, setCurrentName] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (curentUser) {
      setCurrentImage(curentUser.imageAvatar);
      setCurrentName(curentUser.username);
    }
  }, [curentUser]);

  // comportement
  const changeSelectedChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  };

  // render
  return (
    <>
      { currentName && (
        <Container>
          <div className="head">
            <h1>hi'Cha</h1>
            <img src={logo} alt="logo" />
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={(e) => changeSelectedChat(index, contact)}
                >
                  <img
                    src={`data:image/svg+xml+png;base64,${contact.imageAvatar}`}
                    alt="img"
                  />
                  <h3>{contact.username}</h3>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <img src={`data:image/png;base64,${currentImage}`} alt="avatar" />
            <h3>{currentName}</h3>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 18% 70% 12%;
  background-color: #08080986;
  overflow: hidden;
  border-radius: 2rem 0 0 2rem;
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1{
      font-size: 3rem;
      font-weight: bold;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    &::-webkit-scrollbar{
      width: .2rem;
      &-thumb{
        width: .1rem;
        border-radius: 1rem;
        background-color: #efefef36;
      }
    }
    .contact {
      display: flex;
      border-radius: 0.3rem;
      width: 90%;
      cursor: pointer;
      min-height: 1.75rem;
      background-color: #d3d3d345;
      gap: 1rem;
      align-items: center;
      padding: .5rem 2rem;
      transition: 0.5s ease-in-out;
      img {
        height: 3rem;
      }
    }
    .selected{
      background-color: #12096275;
    }
  }
  .current-user{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
`;

export default Contact;
