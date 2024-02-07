import "../components/css/FormInput.css"
import { useState } from "react";

const FormInput = (props) => {
  const[focused, setFocused] = useState(false);
  const {label, errorMessage, onChange, id, ...inputProps} = props;

  const handleFocus = (e) =>{
    setFocused(true);
  };

  return (
  <div className="formInput">

     <label>{label}</label>
     <input {...inputProps} 
     onChange={onChange} 
     onBlur={handleFocus} 
     onFocus={() => inputProps.name==="confimPassword" && setFocused(true)}
     focused={focused.toString()}/>  {/*once user click away*/}
     <span>{errorMessage}</span>
  </div>
  )
}

export default FormInput;
