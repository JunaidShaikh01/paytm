import React from "react";
import Signin from "../components/Signin/Signin";
import axios from "axios";
import { redirect } from "react-router-dom";
const API = import.meta.env.VITE_API;

export default function SigninPage() {
  return <Signin />;
}

export const action = async ({ request }) => {
  const data = await request.formData();

  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  console.log("auth data ", authData);

  try {
    const { data } = await axios.post(`${API}user/signin`, {
      username: authData.username,
      password: authData.password,
    });

    console.log(data.token);

    localStorage.clear();
    localStorage.setItem("token", data.token);

    return redirect("/dashboard");
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
