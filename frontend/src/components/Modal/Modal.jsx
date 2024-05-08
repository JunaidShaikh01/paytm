import React from "react";
import styles from "./Modal.module.css";
import Logout from "../Logout/Logout";
export default function Modal({ isOpen, onClose }) {
  return (
    <div
      className={styles.modalStyle}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <Logout onClose={onClose} />
    </div>
  );
}
