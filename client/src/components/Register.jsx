import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${BASE_API_URL}/register`, { username, password });
      alert("Registered Successfully! 😀");
    } catch (error) {
      alert("User Already Exists!!! 😮‍💨");
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    ></Form>
  );
};

export default Register;
