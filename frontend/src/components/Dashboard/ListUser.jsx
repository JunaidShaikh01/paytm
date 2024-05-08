import React from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
export default function ListUser({ allUser, username, index }) {
  const navigate = useNavigate();
  // console.log("allUser", allUser);
  return (
    <li className={styles.list}>
      <div className={styles.outputInfo}>
        <div className={styles.userNameLogo}>{username?.[0]}</div>
        <p className={styles.outputUsername}>{username}</p>
      </div>
      <button
        className={styles.btn}
        onClick={() =>
          navigate(`/transfer?id=${allUser._id}&name=${allUser.firstname}`)
        }
      >
        Send money
      </button>
    </li>
  );
}
