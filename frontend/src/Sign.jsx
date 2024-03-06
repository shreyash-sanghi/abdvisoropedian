import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotSpinner } from '@uiball/loaders';

const Sign = ()=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initial,final] = useState({
    Email:"",
    Password:"",
  })
 const updatedata = (e)=>{
    const {name,value} = e.target;
    final((info)=>{
      return{
        ...info,
        [name] :value
      }
    })
 }

  const save =async(event)=>{
    event.preventDefault(); 
    try {
      setLoading(true);
    const {Email,Password} = initial;
   const result  = await axios.post("http://localhost:5000/login",
   {Email,Password});
   const status = result.status;
   if(status == 202){
   const token = result.data.Token;
   localStorage.setItem('token', token);
   axios.defaults.headers.common["Authorization"] = token;
   setLoading(false);
     navigate("/postlist")
   }
  } catch (error) {
    setLoading(false);
      alert("Invalid Details please Singn In again...")
  }
  }
  
    return(
        <>
          {/* <div className="body">
            <div class="background">
          <div class="shape"></div>
          <div class="shape"></div>
      </div>
      <form className="form">
          <h3>Sign In Here</h3>
    <div className="mt-10">
          <label className="level" for="username">Email</label>
          <input className="input" onChange={updatedata} name="Email" type="text" placeholder="Email" id="username"/>

          <label className="level"  for="password">Password</label>
          <input className="input" onChange={updatedata} name="Password" type="password" placeholder="Password" id="password"/>

          {loading ? (
                        <div className="flex mt-10 justify-evenly ">
                      <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                      <DotSpinner size={40} speed={0.9} color="red" className="flex items-center  justify-center mx-auto" />
                      <DotSpinner size={40} speed={0.9} color="blue" className="flex items-center  justify-center mx-auto" />
                  </div>
                    ) : (
                      <button className="button" onClick={save}>Sign In</button> 
                    )}
              
          <div class="social">
            <div class="go"><i class="fab fa-google"></i>  Google</div>
            <div class="fb"><Link to={"/signup"} class="fab fa-facebook">Sign Up</Link></div>
          </div>
          </div>
      </form>
      </div> */}
      <div className="main_root">

    <div class="main">  	
        <div class="signup">
				<form method="POST">
					<label className="label" for="chk" aria-hidden="true">Sign in</label>
					<input  className="sign_input" onChange={updatedata} name="Email" type="text" placeholder="Email" required/>
					<input  className="sign_input" onChange={updatedata} name="Password" type="password" placeholder="Password" required/>
					{/* <input type="submit" value="Log in" className="" ></input> */}
          {loading ? (
                        <div className="flex mt-10 justify-evenly ">
                      <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                      <DotSpinner size={40} speed={0.9} color="red" className="flex items-center  justify-center mx-auto" />
                      <DotSpinner size={40} speed={0.9} color="blue" className="flex items-center  justify-center mx-auto" />
                  </div>
                    ) : (
                      <button className="signup_button bg-purple-600 text-white" onClick={save}>Sign In</button> 
                    )}
        </form>

			</div>
	</div>
    </div>
        </>
    )
}

export default Sign;