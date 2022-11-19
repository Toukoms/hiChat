import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Chat() {
  // state
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  },[])

  // comportement

  // render
  return (
    <>Chat</>
  )
}

export default Chat