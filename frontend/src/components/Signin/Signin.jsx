import React, { useState, useCallback } from "react";
import styles from "./Signin.module.css";
import { Form, Link, useActionData } from "react-router-dom";
export default function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  console.log("formData", formData);
  // const actionData = useActionData();
  // console.log("Action Data", actionData);
  const changeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.subComponent}>
          <div className={styles.signinHeader}>
            <h1>Sign In</h1>
            <p>Enter your Cradention for signin</p>
          </div>
          <Form method="post" action="/" className={styles.signinForm}>
            <label htmlFor="email">E-mail</label>
            <input
              required
              type="mail"
              name="username"
              value={formData.username}
              placeholder="johndeo@gmail.com"
              onChange={changeHandler}
            />

            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              placeholder="Enter your name"
            />
            <button className={styles.submitBtn}>Sign In</button>
          </Form>

          <p className={styles.signinFooter}>
            Don't have an account? <Link to="/signup">signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
