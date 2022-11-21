import React, { useState } from "react";
// import Picker from "emoji-picker-react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ onSendMessage }) {
  // state
  const [msgTosend, setMsgTosend] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // comportement
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleChange = (e) => {
    setMsgTosend(e.target.value);
  };
  return (
    <Container>
      <div className="edit-msg" onClick={handleEmojiPickerHideShow}>
        <div className="icon-emoji">
          <BsEmojiSmileFill />
          {/* {showEmojiPicker && <Picker />} */}
        </div>
        <input
          type="text"
          placeholder="Type your message here"
          value={msgTosend}
          onChange={handleChange}
        />
      </div>
      <div className="icon-send" onClick={(e) => onSendMessage(msgTosend)}>
        <IoMdSend />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 0.5rem 2rem;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  .edit-msg {
    display: flex;
    align-items: center;
    width: 100%;
    .icon-emoji {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 0.5rem;
      cursor: pointer;
      svg {
        color: yellow;
        height: 1.5rem;
        width: 1.5rem;
      }
      /* .emoji-picker-react {
        position: relative;
        top: -185px;
        left: -120px;
      } */
    }
    input {
      height: 75%;
      width: 100%;
      padding: 0.5rem 0.5rem;
      background-color: transparent;
      border-color: #efefef;
      color: #efefef;
      border-radius: 0.3rem;
    }
    @media only screen and (max-width: 640px) {
        input{
          font-size: .75rem;
        }
      }
  }
  .icon-send {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0.5rem;
    border-radius: 0.3rem;
    background-color: #efefef;
    cursor: pointer;
    svg {
      color: black;
    }
  }
`;

export default ChatInput;
