import React from "react";
import Update from "../components/Update/Update";
import axios from "axios";
import { redirect } from "react-router-dom";
const API = import.meta.env.VITE_API;
export default function UpdatePage() {
  return <Update />;
}

export const action = async ({ request }) => {
  const data = await request.formData();
  const updateData = {
    firstname: data.get("firstname"),
    lastname: data.get("lastname"),
    password: data.get("password"),
  };
  // console.log("update data", updateData);
  const token = localStorage.getItem("token");
  try {
    const { data } = axios.put(`${API}user/update`, updateData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("Data", data);
    return redirect("/dashboard");
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
