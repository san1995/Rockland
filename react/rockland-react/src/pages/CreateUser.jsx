import "../components/css/FormInput.css"
import "../components/css/Error.css"
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeaderLandingPage from "../components/HeaderLandingPage"
import FormInput from "../pages/FormInput"
import axios from 'axios';
import { UserContext } from '../components/UserContext'


const CreateUser = () => {
  const navigate = useNavigate(); //page navigation

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
      maxDate: getMaxDate(), // Set minimum date dynamically
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
  
  function getMaxDate() { //do not let user select future dates
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }


const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);

};

  console.log("re-rendered")

/* const handleSubmit = (e) =>{ */
const handleSubmit = async (e) => { 
  
  //on submit event fired, clear previous error messages
  setSuccessMessage(''); 
  setErrorMessage('');

  e.preventDefault(); //prevent page refresh when user click on submit
  
  console.log("handle submit event")
  const data = new FormData(e.target)
  // Get the selected radio button value

  const gender = selectedOption; // Assign selectedOption to another variable

  // Append the selected radio button value to the form data
  //data.append('is_superuser', userselect); //add key-value pair to my existing data! business user - 2 , rock beginner - 3

  const data_unravel = Object.fromEntries(data.entries())
  console.log("on submit data check")
  console.log(data_unravel.username)
  console.log(data_unravel.email)
  console.log(data_unravel.birthday)
  console.log(data_unravel.password)
  //console.log(data_unravel.is_superuser);
 
  // Create an array of key-value pairs with empty values
  //const user = {username: '', password: '', last_name:'', email:''};
  const user = {username: '', password: '', email:'', dob:'', usertype:'3', gender:'', level:'beginner'}; //usertype default rock beginner
  user.username = data_unravel.username
  user.password = data_unravel.password
  //user.last_name = userselect  //store usertype in last_name field. workaround for django generated user_auth tbl
  user.email = data_unravel.email
  user.dob = data_unravel.birthday
  user.gender = gender
  // Later, you can populate the values of the object
  //myObject.username = data_unravel.username;
  //myObject.password = data_unravel.password;
  

  //console.log(myObject);
 // try{
axios.post('http://127.0.0.1:8000/api/signup', user)
        .then(response => {
            console.log("axios response")
            console.log(response.status)
            console.log(response);
            console.log("=========response.data")
            console.log(response.data);

            if (response.status === 200)
            {
                // Navigate to another page if status == 200
                //navigate("/home");
                console.log("pass")
                setSuccessMessage('User account successfully created!');
            }
            else
            {
                console.log("fail");
            }
        })
        .catch(error => {    // To catch HTTP error codes returned by an axios.post
          // Handle error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("1st")
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            
            if (error.response.status === 404){ //views.py signup return http 404 error
             
              setErrorMessage('username already exists!');
            }
            //else do nothing

          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
           
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            
          }
          console.log(error.config);
        });

  //}catch(err) {
    //console.log("error caught")
    //console.log(err.message);
    //console.log(err.response.data);
    //console.log(err.response.status);
    //console.log(err.response.headers);
    

  //}
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
      <div style={{ textAlign: 'center' }}>
      <h2>Create an Account -  Sign up for free today!</h2>
    </div>
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
                max={input.maxDate} // Set max date
              />
            </div>
          ))}

          {/* Render radio buttons */}
          <div className="radio-group">
            <input type="radio" name="gender" value="Male" checked={selectedOption === 'Male'} onChange={onRadioBtnChange} /> 
            <label htmlFor="Male">Male</label>
            
            <input type="radio" name="gender" value="Female" checked={selectedOption === 'Female'} onChange={onRadioBtnChange}/> 
            <label htmlFor="Female">Female</label>
          </div>

          
          {/*<pre>Selected Value: {gender}</pre> */}

          <button>Submit</button>

          {/* Display success message if register user success */}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Display error message if it exists */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

        </form>

          
      </div>
    </div>
  )
}

export default CreateUser
