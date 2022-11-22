import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Logout from "../components/Logout";
import ChatInput from "../components/ChatInput";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  // state variables
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(async () => {
    if (currentUser._id && currentChat._id) {
      const { data } = await axios.post(getAllMessageRoute, {
        sender: currentUser._id,
        receiver: currentChat._id,
      });
      setMessages(data);
    }
  }, [currentChat]);
  useEffect(() => {
    if (socket) {
      socket.on("message-receive", (msg) => {
        if (msg) {
          setMessages((prev) => [...prev, {fromSelf: false, msg: msg}]);
        }
      });
    }
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  // comportement
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      message: msg,
      sender: currentUser._id,
      receiver: currentChat._id,
    });
    const temp_messages = [...messages, { fromSelf: true, msg: msg }];
    setMessages(temp_messages);
    socket.emit("send-message", { msg: msg, to: currentChat._id, from: currentUser._id });
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
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${value.fromSelf ? "sended" : "received"}`}
              >
                <div className="content">{value.msg}</div>
              </div>
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
  overflow: hidden;
  gap: 0.1rem;
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
    overflow: auto;
    &::-webkit-scrollbar{
      width: .2rem;
      &-thumb{
        width: .1rem;
        border-radius: 1rem;
        background-color: #efefef36;
      }
    }
    .message {
      display: flex;
      .content {
        display: flex;
        background-color: #8547a1;
        padding: 0.5rem;
        max-width: 40%;
        overflow-wrap: break-word;
      }
      @media only screen and (min-width: 768px) {
        .content {
          max-width: 50%;
        }
      }
      @media only screen and (min-width: 826px) {
        .content {
          max-width: 45%;
        }
      }
      @media only screen and (max-width: 640px) {
        .content {
          max-width: 55%;
        }
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        border-radius: 0 .5rem .5rem 0;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        border-radius: .5rem 0 0 .5rem;
      }
    }
  }
`;

export default ChatContainer;
