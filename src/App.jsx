import { useEffect, useState } from "react";
import styles from "./App.module.css";
import FruitsList from "./components/UI/Fruitslist/FruitsList";
import Form from "./components/UI/Form/Form";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [fruits, setFruits] = useState([]);
  const openFormHandler = (setInputValue) => {
    setOpenForm(!openForm);
    if (setInputValue) {
      setInputValue("");
    }
  };
  useEffect(() => {
    if (fruits.length === 0) {
      const storageFruits = JSON.parse(localStorage.getItem("fruits"));
      setFruits(storageFruits);
    }
  }, []);

  const deleteHandler = (id) => {
    setFruits((prevF) => {
      const value = prevF.filter((f) => f.id !== id);
      localStorage.setItem("fruits", JSON.stringify(value));
      return value;
    });
  };
  return (
    <div className={styles.container}>
      <h1>Fruits</h1>
      <FruitsList fruits={fruits} deleteHandler={deleteHandler} />
      {openForm && (
        <Form
          setFruits={setFruits}
          openHandler={setOpenForm}
          // setPrice={[changePriceInput, setChangePriceInput]}
          // setName={[changeInputValue, setChangeInputValue]}
        />
      )}

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
