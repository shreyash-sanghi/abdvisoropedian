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
        const response = await axios.post("https://abdvisoropedian-1wdb.vercel.app/signup",{
            Name,Email,Password
        })
        alert("Successfully Save ...")
        setLoading(false);
        navigate('/login')
    } catch (error) {
        setLoading(false);
            alert(error);
    }
    }
    
    return(
        <>
        

<div className="main_root">

<div class="main">  	
    <div class="signup">
            <form onSubmit={savedata} method="POST">
                <label className="label" for="chk" aria-hidden="true">Sign Up</label>
                <input  className="sign_input" type="text" onChange={setdata} name="Name" placeholder="Full Name" required/>
                <input  className="sign_input" type="email" onChange={setdata} required name="Email" placeholder="Email" />
                <input  className="sign_input" type="password" name="Password" required onChange={setdata} placeholder="Password" />
                {/* <input type="submit" value="Log in" className="" ></input> */}
                {loading ? (
                      <div className="flex mt-10 justify-evenly ">
                     <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={40} speed={0.9} color="red" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={40} speed={0.9} color="blue" className="flex items-center  justify-center mx-auto" />
                 </div>
                  ) : (
                    <input type="submit" className="signup_button bg-purple-600 text-white" >Sign Up</input> 
                  )}
    </form>   
        </div>
</div>
</div>
        </>
    )
}
export default SignUp;