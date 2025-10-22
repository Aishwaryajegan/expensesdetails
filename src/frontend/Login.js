import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import "./Expenses.css";


export default function Login()
{
    let [email,setemail]=useState("");
    let[password,setpassword]=useState("");
const passwordInputRef =useRef(null);
const navigate = useNavigate();

    const login = (e) => {
  //  console.log("Server clicked");
if(!email||!password){
  toast.warn("please fill all fields");
  return;
}
axios.post("http://localhost:3003/expenses/login",{

         email:email,
         password:password,
  
})
    .then((res) => {
      if (res.data.msg === "login successfully"&&res.data.data) {
       // console.log("Server response:", res.data);
       const user =res.data.data;
       localStorage.setItem("email",user.email);
       localStorage.setItem("name",user.name);
 localStorage.setItem("isLoggedIn", "true");

        toast.success('Login successfully', {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/dashboard'); // Navigate to the Dashboard page
        }, 2000);

      } else {
        toast.error("Login failed");
      }
    });
  };
  // Handle keydown events for username and password
  const handleKeyDown = (e, nextFieldRef = null) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission

      if (nextFieldRef) {
        nextFieldRef.current.focus(); // Focus the next field (password)
      } else {
        login(e); // Trigger login if "Enter" is pressed in the password field
      }
    }
  };
    
    return(

        <div className="forms-wrappers register-body-page">
 <ToastContainer />
<form className="forms-colors form-container">
<h1>Login Expenses</h1>
<div className="forms-groups">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
          
            onChange={(e) => setemail(e.target.value) } onKeyDown={(e)=>handleKeyDown(e,passwordInputRef)}
          />
        </div>

        <div className="forms-groups">
          <label>Password</label>
          <input 
          ref ={passwordInputRef}
            type="password" 
            placeholder="Enter your password" 
            
            onChange={(e) => setpassword(e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}
          />
        </div>
        <button type="button" className="but-exp" onClick={login}>
          Submit
        </button>
        <div className="logins-links">
          Don't have an Account? <u onClick={() => navigate('/Register')} style={{ cursor: "pointer" }}>Register</u>
        </div>
</form>

        </div>
     
    )
}    