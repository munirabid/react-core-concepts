import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "./../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wraper from "./../Helpers/Wraper";

const AddUser = (props) => {
  const entereName = useRef();
  //const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  // const userNameChangeHandler = (event) => {
  //   setEnteredUserName(event.target.value);
  // };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const AddUserHandler = (event) => {
    event.preventDefault();
    const enteredUserName = entereName.current.value;
    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter valid name and age (non-empty value)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0)",
      });
      return;
    }

    props.onAddUser(enteredUserName, enteredAge);
    //setEnteredUserName("");
    entereName.current.value = "";
    setEnteredAge("");
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <Wraper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}

      <Card className={classes.input}>
        <form onSubmit={AddUserHandler}>
          <label>Username</label>
          <input
            type="text"
            id="username"
            autoComplete="false"
            ref={entereName}
          ></input>

          <label>Age</label>
          <input
            type="number"
            id="age"
            onChange={ageChangeHandler}
            value={enteredAge}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wraper>
  );
};

export default AddUser;
