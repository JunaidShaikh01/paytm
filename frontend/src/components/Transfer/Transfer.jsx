import React from "react";
import styles from "./Transfer.module.css";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

const Transfer = () => {
  const [searchParams] = useSearchParams();
  const actionData = useActionData();
  
  return (
    <div className={styles.main}>
      <div className={styles.subMain}>
        <h1 className={styles.heading}>Send Money</h1>
        <div className={styles.name}>
          <div className={styles.firstLatter}>
            {searchParams.get("name")?.[0].toUpperCase()}
          </div>
          <h2 className={styles.firstName}>{searchParams.get("name")}</h2>
        </div>
        <Form
          method="post"
          // action="/transfer"
          className={styles.form}
        >
          <label htmlFor="amount">Enter amount (in Rs.)</label>
          <input
            className="px-2 py-2 rounded-md shadow-lg w-full"
            type="number"
            name="amount"
            id="amount"
            required
            step="1"
            min="1"
            placeholder="Positive Integer"
          />
          <button className="bg-white font-bold w-full text-black rounded-md py-2 transition-all transform hover:bg-emerald-300 active:translate-y-0.5 shadow-none">
            Initiate Transfer
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Transfer;
