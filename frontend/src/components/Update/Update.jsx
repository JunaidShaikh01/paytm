import React, { useCallback, useState } from "react";
import styles from "./Update.module.css";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Update() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  async function deleteFunc() {
    const confermation = confirm("Do you want to delete your account?");
    if (confermation) {
      const username = searchParams.get("username");
      console.log("Username :-", username);
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.delete(
          "http://localhost:3000/api/v1/user/delete",
          {
            data: { username },
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        localStorage.clear();
        return navigate("/");
      } catch (error) {
        console.log(error);
        alert("Invalid username");
      }
    }
  }

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);
  //   const userdata = User;
  // console.log("formData", formData);
  //   console.log(userdata);q
  return (
    <div className={styles.main}>
      <div className={styles.subComponent}>
        <div className={styles.signupHeader}>
          <h1>Update</h1>
          <p>Update information of your account</p>
        </div>

        <Form method="post" action="/update" className={styles.signupForm}>
          <label htmlFor="firstname">First Name</label>
          <input
            required
            type="text"
            name="firstname"
            placeholder="John"
            onChange={handleChange}
            value={formData.firstname}
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            required
            type="text"
            name="lastname"
            placeholder="Deo"
            onChange={handleChange}
            value={formData.lastname}
          />

          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <div className={styles.deleteBtn}>
            <button className={styles.submitBtn}>Update</button>
            <button onClick={deleteFunc}> Delete</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
