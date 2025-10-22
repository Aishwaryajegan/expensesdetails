import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
//import 'react-toastify/dist/ReactToastify.css';
import './Expenses.css';

export default function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const navigate = useNavigate();

 

  let add_data = (e) => {

    e.preventDefault();
  if(username =="")
            {
             toast.warn("please enter your name")


            }
           
           else if(password=="")
            {
              toast.warn("please enter your password")
            }
      
           
             else if(email=="")
            {
               toast.warn("please enter your email")
            }
         else{ 
           //alert("hai");
    axios.post("http://localhost:3003/expenses/add", {
      name: username,
      email: email,
      password: password,
      
    })
      .then((res) => {
        toast.success(res.data.msg, { autoClose: 20000 });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      });
  }};




  return (
    <div className="register-body-page">
    <div className="forms-wrappers">
      <ToastContainer />
      
      <form className="forms-colors form-container" onSubmit={add_data}>
        
        <h1>Welcome to Expense Management System</h1>
<h3 className="text-center">Registration</h3>
        <div className="forms-groups">
          <label>Name</label>
          <input type="text" placeholder="Full name" onChange={(e) => setusername(e.target.value)} />
        </div>
       <div className="forms-groups">
          <label>Email</label>
          <input type="email" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
        </div>
        <div className="forms-groups">
          <label>Password</label>
          <input type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
        </div>


        <button type="submit" className="but-exp">Submit</button>

<div className="logins-links">
          Already Have an Account? <u onClick={() => navigate('/')} style={{ cursor: "pointer" }}>LOGIN</u>
        </div>
       
      </form>
       
    </div>
    </div>
  );
}