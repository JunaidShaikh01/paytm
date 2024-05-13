import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Header from "../Header/Header";
import UsersList from "./UsersList";
import axios from "axios";
import useDebounce from "../../Debounce/Debounce";
const API = import.meta.env.VITE_API;

export default function Dashboard({ balance, username, users }) {
  const [userArr, setUserArr] = useState([]);
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 500);
  // console.log("userArr", userArr);
  // console.log("filetr", filter);
  useEffect(() => {
    axios.get(`${API}user/bulk?filter=${debouncedFilter}`).then((responce) => {
      if (filter.length === 0) {
        setUserArr(users);
      } else {
        setUserArr(responce.data.user);
      }
    });
  }, [filter, debouncedFilter, users]);

  return (
    <div>
      <Header username={username} />
      <div className={styles.mainDashboard}>
        <div className={styles.userInfo}>
          <h2 className={styles.balance}>Your Balance ${balance}</h2>
          <h2 className={styles.username}>
            {username?.[0].toUpperCase() + username.slice(1)}
          </h2>
        </div>
        <div className={styles.input}>
          <input
            type="text"
            placeholder="Search users..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <UsersList users={userArr} />
      </div>
    </div>
  );
}
