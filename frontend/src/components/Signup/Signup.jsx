import React, { useCallback, useState } from "react";
import styles from "./Signup.module.css";
import { Form, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",



    
    password: "",
  });

  // const actionData = useActionData();
  // console.log("Action data", actionData);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.subComponent}>
        <div className={styles.signupHeader}>
          <h1>Signup</h1>
          <p>Enter your information to create an account</p>
        </div>

        <Form method="post" action="/signup" className={styles.signupForm}>
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

          <label htmlFor="email">E-mail</label>
          <input
            required
            type="email"
            name="username"
            placeholder="johndeo@gmail.com"
            onChange={handleChange}
            value={formData.username}
          />

          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <button className={styles.submitBtn}>SignUp</button>
        </Form>
        <p className={styles.signupFooter}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
