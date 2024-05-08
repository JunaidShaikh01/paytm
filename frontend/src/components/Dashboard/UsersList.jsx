import React from "react";
import ListUser from "./ListUser";
import styles from "./Dashboard.module.css";
export default function UsersList({ users }) {
  return (
    <ul className={styles.ul}>
      {users?.map((user, index) => (
        <ListUser username={user.firstname} allUser={user} key={index} />
      ))}
    </ul>
  );
}
