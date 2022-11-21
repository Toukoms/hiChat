import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  // state
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);
  const key = process.env.REACT_APP_LOCALHOST_KEY;
  useEffect(async () => {
    if (!localStorage.getItem(key)) {
      navigate("/login");
    }
    setCurrentUser(await JSON.parse(localStorage.getItem(key)));
    setisLoaded(true);
  }, []);
  useEffect(async () => {
    if (currentUser) {
      const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(data);
    }
  }, [currentUser]);

  // comportement
  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
    setisLoaded(false);
  };

  // render
  return (
    <Container>
      <div className="container">
        <Contact
          contacts={contacts}
          curentUser={currentUser}
          changeChat={handleChangeChat}
        />
        {currentUser &&
          (!isLoaded && currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
            />
          ) : (
            <Welcome currentUser={currentUser} />
          ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #120128;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    border-radius: 0.75rem;
    display: grid;
    grid-template-columns: 25% 75%;
    @media only screen and (max-width: 960px) {
      grid-template-columns: 35% 65%;
    }
    @media only screen and (max-width: 700px) {
      grid-template-columns: 45% 55%;
    }
  }
`;

export default Chat;
