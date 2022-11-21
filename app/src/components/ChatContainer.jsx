import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Logout from "../components/Logout";
import ChatInput from "../components/ChatInput";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";

function ChatContainer({ currentChat, currentUser }) {
  // state variables
  const [messages, setMessages] = useState([]);
  const [msgSended, setMsgSended] = useState("");
  useEffect(async () => {
    if (currentUser._id && currentChat._id) {
      const { data } = await axios.post(getAllMessageRoute, {
        sender: currentUser._id,
        receiver: currentChat._id,
      });
      setMessages(data);
    }
  }, [currentChat]);

  // comportement
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      message: msg,
      sender: currentUser._id,
      receiver: currentChat._id,
    });
    setMsgSended(msg);
  };

  // render
  return (
    <Container>
      <div className="chat-header">
        <div className="user-info">
          <img
            src={`data:image/png;base,${currentChat.imageAvatar}`}
            alt="img"
          />
          <h2>{currentChat.username}</h2>
        </div>
        <Logout />
      </div>
      <div className="body">
        {messages.map((value, index) => {
          console.log(value);
          return (
            <div
              className={`message ${value.fromSelf ? "sended" : "received"}`}
              key={index}
            >
              <div className="content">{value.msg}</div>
            </div>
          );
        })}
      </div>
      <ChatInput onSendMessage={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  .chat-header {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      img {
        height: 3rem;
      }
    }
  }
  .body {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: flex-end;
    .message {
      display: flex;
      .content {
        display: flex;
        background-color: #8547a1;
        padding: 0.5rem;
        max-width: 40%;
        border-radius: 0.5rem;
        overflow-wrap: break-word;
      }
      @media only screen and (min-width: 768px) {
        .content{
          max-width: 50%;
        }
      }
      @media only screen and (min-width: 826px) {
        .content{
          max-width: 45%;
        }
      }
      @media only screen and (max-width: 640px) {
        .content{
          max-width: 55%;
        }
      }
    }
    .receveid {
      justify-content: flex-start;
    }
    .sended {
      justify-content: flex-end;
    }
  }
`;

export default ChatContainer;
