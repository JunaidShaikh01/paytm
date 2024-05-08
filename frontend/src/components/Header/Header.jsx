import React, { useState } from "react";
import styles from "./Header.module.css";
import Modal from "../Modal/Modal";
export default function Header({ username }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function logout() {
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }
  console.log("isOpen Modal", isOpenModal);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.nameContainer}>
        <h2>Payment App</h2>
      </div>
      <div className={styles.usersDetails} onClick={logout}>
        <div className={styles.userNameLogo}>{username?.[0]}</div>
        <p>Hello, {username}</p>
      </div>
      <Modal isOpen={isOpenModal} onClose={closeModal} />
    </div>
  );
}
