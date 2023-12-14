import { useState } from "react";
import styles from "./App.module.css";
import FruitsList from "./components/Fruitslist/FruitsList";
import Form from "./components/Form/Form";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [fruits, setFruits] = useState([]);
  const openFormHandler = (setInputValue) => {
    setOpenForm(!openForm);
    if (openForm) {
      setInputValue("");
    }
  };
  const deleteHandler = (id) => {
    setFruits((prevF) => {
      return prevF.filter((f) => f.id !== id);
    });
  };
  return (
    <div className={styles.container}>
      <h1>Fruits</h1>
      <FruitsList fruits={fruits} deleteHandler={deleteHandler} />
      {openForm && <Form setFruits={setFruits} openHandler={setOpenForm} />}
      <button
        onClick={openFormHandler.bind(null, false)}
        className={styles.btn}
      >
        {openForm ? "Cancel" : "New Fruit +"}
      </button>
    </div>
  );
}

export default App;
