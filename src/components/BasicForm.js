import React, { useState } from "react";
import useInput from "../hooks/useInput";
import classes from "./BasicForm.module.css";
import { useNavigate } from "react-router-dom";

const BasicForm = () => {
  const [status, setStatus] = useState(true);
  const nav = useNavigate();

  const {
    value: enteredName,
    valueChangeHandler: nameChangeHandler,
    blurChangeHandler: nameBlurHandler,
    isValid: nameIsValid,
    inValid: nameInputValidity,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredMail,
    valueChangeHandler: mailChangeHandler,
    blurChangeHandler: mailBlurHandler,
    isValid: mailIsValid,
    inValid: mailInputValidity,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const {
    value: enteredPass,
    valueChangeHandler: passChangeHandler,
    blurChangeHandler: passBlurHandler,
    isValid: passIsValid,
    inValid: passInputValidity,
  } = useInput((value) => value.trim().length >= 6);

  let formIsValid = false;

  if (status) {
    if (mailIsValid && passIsValid) {
      formIsValid = true;
    }
  } else {
    if (nameIsValid && mailIsValid && passIsValid) {
      formIsValid = true;
    }
  }

  const statusHandler = () => {
    setStatus((prev) => !prev);
  };

  const isStatus = status ? "Login" : "SignUp";

  const errorText = classes.errorText;

  const nameClass = nameInputValidity
    ? classes.invalid
    : classes["form-control"];
  const mailClass = mailInputValidity
    ? classes.invalid
    : classes["form-control"];
  const passClass = passInputValidity
    ? classes.invalid
    : classes["form-control"];

  // Form Validation Code Ends here

  // Form Submission Function

  const submitHandler = (event) => {
    event.preventDefault();

    let url;
    if (status)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJx433PMwEbhULmKL35pTrGD84PWVDSxE";
    else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJx433PMwEbhULmKL35pTrGD84PWVDSxE";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredMail,
        password: enteredPass,
        returnSecureToken: true,
      }),
      "Content-Type": "application/json",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMessage = "Something went wrong";
            if (data && data.error && data.error.message) {
              errMessage = data.errMessage;
            }
            throw new Error(errMessage);
          });
        }
      })
      .then((data) => {
        if(status) nav("/hello"); 
        else alert("User account created Successfully, please login with details"); 
      })
      .catch((err) => alert(err));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <h1>{isStatus}</h1>
        </div>

        {!status && (
          <div className={classes.inputContainer}>
            <label htmlFor="name">Name</label> <br />
            <input
              id="name"
              type="text"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              className={nameClass}
            />
            {nameInputValidity && <p className={errorText}>Enter valid Name</p>}
          </div>
        )}

        <div className={classes.inputContainer}>
          <label htmlFor="email">Email</label> <br />
          <input
            id="email"
            type="email"
            onChange={mailChangeHandler}
            onBlur={mailBlurHandler}
            value={enteredMail}
            className={mailClass}
          />
          {mailInputValidity && <p className={errorText}>Enter valid Email</p>}
        </div>

        <div className={classes.inputContainer}>
          <label htmlFor="password">Password</label> <br />
          <input
            id="password"
            type="password"
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
            value={enteredPass}
            className={passClass}
          />
          {passInputValidity && (
            <p className={errorText}>
              Enter valid Password (Minimum length of 6)
            </p>
          )}
        </div>

        <p className={classes.statusLine} onClick={statusHandler}>
          {status ? "Create Account" : "Login"}
        </p>

        <div className={classes["form-actions"]}>
          <button type="submit" disabled={!formIsValid}>
            {isStatus}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
