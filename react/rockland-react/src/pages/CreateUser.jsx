import "../components/css/FormInput.css"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLandingPage from "../components/HeaderLandingPage"
import FormInput from "../pages/FormInput"
import axios from 'axios';


const CreateUser = () => {
  const navigate = useNavigate(); //page navigation
 

  const[values, setValues] = useState({

    username:"",
    email:"",
    birthday:"",
    password:"",
    confimPassword:"",
    userOption:"",
    
  
  });
 
  const inputs = [
    {
      id:1,
      name:"username",
      type:"text",
      placeholder:"Username",
      errorMessage:"Username should be 3-16 characters and shouldn't include any special character!",
      label:"Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required:true, //HTML attribute required="true"
    },
    {
      id:2,
      name:"email",
      type:"text",
      placeholder:"Email",
      errorMessage:"It should be a valid email address!",
      label:"Email",
      required:true,
    },
    {
      id:3,
      name:"birthday",
      type:"date",
      placeholder:"Birthday",
      errorMessage:"",
      label:"Birthday",
      required:true,
    },
    {
      id:4,
      name:"password",
      type:"text", 
      //type:"password",
      placeholder:"Password",
      errorMessage:"Password should be 18-20 characters and include at least 1 letter, 1 number and 1 special char",
      label:"Password",
      pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]{8,20}$",
      required:true,
    },
    {
      id:5,
      name:"confirmPassword",
      type:"text",
      //type:"password",
      placeholder:"Confirm Password",
      errorMessage:"Passwords don't match",
      label:"Confirm Password",
      pattern: values.password,
      required:true,
    },
    {
      id:6,
      name:"userOption",
      type: "hidden", /*  workaround to store radiobutton input in this userOption field above */
      //type:"password",
      label:"",
      required:true,
    },
    
  ]
  


const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);

};

  console.log("re-rendered")

/* const handleSubmit = (e) =>{ */
const handleSubmit = async (e) => { 

  e.preventDefault(); //prevent page refresh when user click on submit
  
  console.log("handle submit event")
  const data = new FormData(e.target)
  // Get the selected radio button value

  const userselect = selectedOption; // Assign selectedOption to another variable

  // Append the selected radio button value to the form data
  data.append('is_superuser', userselect); //add key-value pair to my existing data! business user - 2 , rock beginner - 3

  const data_unravel = Object.fromEntries(data.entries())
  console.log("on submit data check")
  console.log(data_unravel.username)
  console.log(data_unravel.email)
  console.log(data_unravel.birthday)
  console.log(data_unravel.password)
  console.log(data_unravel.is_superuser);
 
  // Create an array of key-value pairs with empty values
  const user = {username: '', password: '', is_superuser:'', email:''};
  user.username = data_unravel.username
  user.password = data_unravel.password
  user.is_superuser = userselect
  user.email = data_unravel.email
  // Later, you can populate the values of the object
  //myObject.username = data_unravel.username;
  //myObject.password = data_unravel.password;
  

  //console.log(myObject);
  try{
  axios.post('http://127.0.0.1:8000/api/signup', user)
          .then(response => {
              console.log("axios response ")
              console.log(response.status)
              console.log(response);
              console.log(response.data);

              if (response.status === 200)
              {
                  // Navigate to another page if status == 200
                  //navigate("/home");
                  console.log("pass")
              }
              else
              {
                  console.log("fail");
              }
          });

    }catch(err) {
      console.log(err.message);
    }
  //const newuser = {}
  //const response = axios.post('http://127.0.0.1:8000/api/signup', newuser);
  
    
}

  const onChange = (e) =>{
    //console.log(e)
    setValues({...values, [e.target.name]: e.target.value}); //update values immediately
   
  };
 
  console.log(values);


  const [selectedOption, setSelectedOption] = useState('');

  const onRadioBtnChange = (event) => {
    console.log("onRadioBtnChange event fired")
    console.log(event.target.value)
    setSelectedOption(event.target.value);
    
  };

  return (
       <div>
      <HeaderLandingPage />
      <h2>Create an Account</h2>
      <div className="userform">
        <form onSubmit={handleSubmit}>
          {/* Render form inputs */}
          {inputs.map((input) => (
            <div key={input.id}>
              <label>{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                value={values[input.name]}
                onChange={onChange}
                required={input.required}
              />
            </div>
          ))}

          {/* Render radio buttons */}
          <div className="radio-group">
            <input type="radio" name="gender" value="3" checked={selectedOption === '3'} onChange={onRadioBtnChange} /> 
            <label htmlFor="3">Select this option to register if you are interested in learning about rocks!</label>
            
            <input type="radio" name="gender" value="2" checked={selectedOption === '2'} onChange={onRadioBtnChange}/> 
            <label htmlFor="3">Select this option to register if you are interested in buying/selling rock related items!</label>
          </div>
          {/*<pre>Selected Value: {gender}</pre> */}

          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUser
