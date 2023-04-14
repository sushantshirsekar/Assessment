import  { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false); 

  const isValid = validateInput(enteredValue); 

  const valueChangeHandler = event => setEnteredValue(event.target.value); 
  const blurChangeHandler = event => setIsTouched(true); 

  const inValid = !isValid && isTouched ; 

  const reset = () => {
    setEnteredValue(""); 
    setIsTouched(false); 
  }

  return {
    value: enteredValue, 
    isValid, 
    inValid, 
    valueChangeHandler, 
    blurChangeHandler,
    reset,
  };
};

export default useInput;
