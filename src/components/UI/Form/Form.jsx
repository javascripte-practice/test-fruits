import React, { useRef, useState } from "react";
import styles from "./Form.module.css";
import Modal from "../Modal/Modal";

/*
    Components
  1. StateFull Component - StateLess Component / Presentation Component
  2. Smart Component - Dump Component
  3. Controlled - UnControlled Components
  // ========  6-dars
  1. Izalation
  2. Errors and Modal window
  3. LocalStorage 
  4. useEffect hook
  5. Clean-up function 


*/

const Form = (props) => {
  const [changeInputValue, setChangeInputValue] = useState("");
  const [changePriceInput, setChangePriceInput] = useState("");
  // =====    bad--practice
  // const [changeInputValue, setChangeInputValue] = props.setName;
  // const [changePriceInput, setChangePriceInput] = props.setPrice;
  const [okPrice, setOkPrice] = useState(false);
  const [okName, setOkName] = useState(false);
  const [errName, setErrName] = useState(false);
  const [errPrice, setErrPrice] = useState(false);
  const [error, setError] = useState("");

  // const [formState, setFromState] = useState({
  //   name: "",
  //   price: "",
  // });

  // const nameInput = useRef();
  // const priceInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (changeInputValue.length < 3 || changePriceInput.length < 4) {
      if (changeInputValue.length < 3) {
        setError(() => "Nom bo'sh bo'lmasin!");
      }
      if (changePriceInput.length < 4) {
        setError((err) =>
          err ? err + " Narx bo'sh bo'lmasin!" : "Narx bo'sh bo'lmasin!"
        );
      }
      return;
    }
    props.setFruits((fruits) => {
      const obj = {
        id: Date.now().toString(),
        name: changeInputValue,
        price: changePriceInput,
      };
      // return [newObj, ...fruits];
      // const obj = {
      //   id: Date.now().toString(),
      // name: formState.name,
      //   price: formState.price,
      // };
      // --- useRef ---
      // const obj = {
      //   id: Date.now().toString(),
      //   name: nameInput?.current?.value,
      //   price: priceInput?.current?.value,
      // };
      const value = [...fruits, obj];
      localStorage.setItem("fruits", JSON.stringify(value));
      return value;
    });
    // setChangeInputValue("");
    // setChangePriceInput("");
    props.openHandler((prevV) => !prevV);
  };

  // const inputsHandler = (e) => {
  //   if (e.target.name === "fruit") {
  //     setFromState((obj) => ({ ...obj, name: e.target.value }));
  //   }
  //   if (e.target.name === "price") {
  //     setFromState((obj) => ({ ...obj, price: e.target.value }));
  //   }
  // };

  const changePriceHandler = (e) => {
    const value = e?.target?.value?.trim();
    if (value.length > 3) {
      setErrPrice(false);
      setOkPrice(true);
    }
    if (value.length <= 3) {
      setErrPrice(true);
      setOkPrice(false);
    }
    setChangePriceInput(value);
  };

  const changeInputHandler = (e) => {
    const value = e?.target?.value?.trim();
    if (value.length > 2) {
      setErrName(false);
      setOkName(true);
    }
    if (value.length <= 2) {
      setErrName(true);
      setOkName(false);
    }
    setChangeInputValue(value);
  };
  //   [
  //    React.createElement("div", { className: "box" }, [
  //      React.createElement("span", {}, ["Spandiv"]),
  //      React.createElement("button", { type: "button" }, ["Save"]),
  //    ]),
  //    React.createElement("form", {}, ["Form"]),
  //  ];

  /*
  1. <Wrapper></Wrapper>,  
  2. [], 
  3. <React.Fragment></React.Fragment>,  
  4. <></>
  */

  const errIsOpen = () => {
    setError(false);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      {error && <Modal isOpen={errIsOpen} message={error} />}
      <label htmlFor="">
        <input
          type="text"
          placeholder="Fruit"
          onChange={changeInputHandler}
          value={changeInputValue}
          className={`${errName ? styles.error : ""} ${
            okName ? styles.success : ""
          }`}
          // onChange={inputsHandler}
          // value={formState.name}
          // name="fruit"
          // ref={nameInput}
        />
        <p
          className={`${errName ? styles.textErr : ""} ${
            okName ? styles.textSuccess : ""
          }`}
        >
          {errName ? "error" : ""}
          {okName ? "success" : ""}
        </p>
      </label>
      <label htmlFor="">
        <input
          type="text"
          placeholder="Price"
          // name="price"
          onChange={changePriceHandler}
          value={changePriceInput}
          className={`${okPrice ? styles.success : ""}`}
          // onChange={inputsHandler}
          // value={formState.price}
          // ref={priceInput}
        />

        <p
          className={`${errPrice ? styles.textErr : ""} ${
            okPrice ? styles.textSuccess : ""
          }`}
        >
          {errPrice ? "error" : ""}
          {okPrice ? "success" : ""}
        </p>
      </label>

      <button type="submit" className={styles.btn}>
        Save
      </button>
    </form>
  );
};

export default Form;
