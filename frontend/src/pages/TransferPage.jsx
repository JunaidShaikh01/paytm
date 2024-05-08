import React from "react";

import { redirect } from "react-router-dom";
import axios from "axios";
import Transfer from "../components/Transfer/Transfer";

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
      "http://localhost:3000/api/v1/account/transfer",

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
