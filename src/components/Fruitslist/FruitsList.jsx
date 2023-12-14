import styles from "./FruitsList.module.css";

const FruitsList = (props) => {
  const deleteItem = (id) => {
    props.deleteHandler(id);
  };
  return (
    <ul className={styles.list}>
      {props.fruits.map((f) => {
        return (
          <li key={f.id} onClick={deleteItem.bind(null, f.id)}>
            {f.name}
          </li>
        );
      })}
    </ul>
  );
};

export default FruitsList;
