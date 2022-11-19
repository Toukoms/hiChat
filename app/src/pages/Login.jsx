import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  // state
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  // comportement
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    let ok = true;
    if (username === "") {
      toast.error("Username required.", toastOptions);
      ok = false;
    }
    if (password === "") {
      toast.error("Password required.", toastOptions);
      ok = false;
    }

    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate('/')
      }
    }
  };

  // render
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="head">
            <img src={logo} alt="logo" />
            <h1>Connexion</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
          <button type="submit">sign in</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #120128;
  color: #efefef;
  .head {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    img {
      height: 7.5rem;
    }
    h1 {
      text-transform: uppercase;
      font-size: 1.2rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid;
      border-radius: 0.4rem;
      color: white;
    }
    span {
      letter-spacing: 0.1rem;
      a {
        color: #8547a2;
        text-transform: uppercase;
        text-decoration: none;
      }
    }
    button {
      text-transform: uppercase;
      padding: 1rem;
      border-radius: 0.4rem;
      color: black;
      font-weight: bold;
      font-size: 1rem;
      letter-spacing: 0.1rem;
      cursor: pointer;
      transition: 0.25s ease-in-out;
      border: none;
      &:hover {
        background-color: #8547a2;
        letter-spacing: 0.15rem;
      }
    }
  }
`;

export default Login;
