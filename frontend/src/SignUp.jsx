import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotSpinner } from '@uiball/loaders';
const SignUp = ()=>{
  const navigate = useNavigate();
    const [initial,final] = useState({
        Name:"",
        Email:"",
        Password:""
    })
  const [loading, setLoading] = useState(false);
    const setdata = (event)=>{
        const {name,value} = event.target;
        final((info)=>{
            return{
            ...info,
            [name] : value
            }
        })
    }

    const savedata = async(event)=>{
        event.preventDefault();
        try {
            setLoading(true);
        const {Name,Email,Password} = initial;
        const response = await axios.post("http://localhost:5000/signup",{
            Name,Email,Password
        })
        alert("Successfully Save ...")
        setLoading(true);
        navigate('/login')
    } catch (error) {
        setLoading(true);
            alert(error);
    }
    }
    return(
        <div className="body">
        <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    <form className="form">
        <h3 >Sign Up</h3>

        <label className="label" for="username">Full Name</label>
        <input  className="input" type="text" onChange={setdata} name="Name" placeholder="Full Name" id="username"/>
        <label className="label" for="username">Email*</label>
        <input className="input" type="email" onChange={setdata} required name="Email" placeholder="Email" id="username"/>

        <label className="label"  for="password">Password*</label>
        <input className="input" type="password" name="Password" required onChange={setdata} placeholder="Password" id="password"/>
        {loading ? (
                      <div className="flex mt-10 justify-evenly ">
                     <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={40} speed={0.9} color="red" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={40} speed={0.9} color="blue" className="flex items-center  justify-center mx-auto" />
                 </div>
                  ) : (
                    <button className="button" onClick={save}>Sign Up</button> 
                  )}
        <div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><Link to={"/login"} class="fab fa-facebook">Sign In</Link></div>
        </div>    </form>

    
        </div>
        
    )
}
export default SignUp;