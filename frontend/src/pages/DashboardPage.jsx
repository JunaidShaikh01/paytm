import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export default function DashboardPage() {
  const loaderData = useLoaderData();
  const balance = loaderData.balance;
  const username = loaderData.user.firstname;
  const users = loaderData.users;

  return <Dashboard balance={balance} username={username} users={users} />;
}

export const loader = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/user/all_users",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("data:-", data);
    return data;
  } catch (e) {
    return e.response.data.message;
  }
};
