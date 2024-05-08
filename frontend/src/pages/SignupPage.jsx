import React from "react";
import Signup from "../components/Signup/signup";
import axios from "axios";
import { redirect } from "react-router-dom";

export default function SignupPage() {
  return <Signup />;
}

export const action = async ({ request }) => {
  const data = await request.formData();
  const authData = {
    firstname: data.get("firstname"),
    lastname: data.get("lastname"),
    username: data.get("username"),
    password: data.get("password"),
  };
  console.log("AuthData", authData);
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      authData
    );
    console.log("Data ", data);

    localStorage.clear();
    localStorage.setItem("token", data.token);

    return redirect("/");
  } catch (error) {
    return error.response.data.message;
  }
};
