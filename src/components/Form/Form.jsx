import { useState } from "react";
import styles from "./Form.module.css";

const Form = (props) => {
  const [changeInputValue, setChangeInputValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.setFruits((fruits) => {
      const newObj = {
        id: Date.now().toString(),
        name: changeInputValue,
      };
      return [newObj, ...fruits];
    });
    setChangeInputValue("");
    props.openHandler((prevV) => !prevV);
  };

  const changeInputHandler = (e) => {
    setChangeInputValue(e.target.value);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <input
        type="text"
        placeholder="Fruit"
        onChange={changeInputHandler}
        value={changeInputValue}
      />

      <button type="submit" className={styles.btn}>
        Save
      </button>
    </form>
  );
};

export default Form;
