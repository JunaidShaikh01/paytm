import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";
import axios from "axios";
// import { useState } from "react";
export default function Logout({ onClose }) {
  // const [username, setUsername] = useState("");

  const navigate = useNavigate();
  function logoutFunc() {
    localStorage.clear();
    navigate("/");
  }

  function updateFunc() {
    axios
      .get("http://localhost:3000/api/v1/user/deleteuser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((responce) =>
        navigate(`/update?username=${responce.data.username.username}`)
      );
  }
  return (
    <div className={styles.logoutMain}>
      {/* <div className={styles.logoutText}>
        <h2>Do You Want to logout ?</h2>
      </div> */}
      <div className={styles.logoutButtons}>
        <button onClick={onClose}>Close </button>
        <button onClick={logoutFunc}> Logout</button>
        <button onClick={updateFunc}>Update</button>
      </div>
    </div>
  );
}
