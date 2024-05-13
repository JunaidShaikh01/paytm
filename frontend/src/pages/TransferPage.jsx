import React from "react";

import { redirect } from "react-router-dom";
import axios from "axios";
import Transfer from "../components/Transfer/Transfer";
const API = import.meta.env.VITE_API;
export default function TransferPage() {
  return <Transfer />;
}

export const action = async ({ request }) => {
  const data = await request.formData();
  const amount = data.get("amount");

  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get("id");

  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${API}account/transfer`,

      { to: id, amount },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return redirect("/dashboard");
  } catch (error) {
    return error;
  }
};
