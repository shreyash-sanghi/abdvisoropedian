import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DotSpinner } from '@uiball/loaders';
const UserPage = ()=>{
const navigate = useNavigate();
const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
   const [iniName,finName] =  useState("");
   const [initial,final] = useState([{
    id:"",
    photo_url:"",
    title:"",
    category:"",
    content_text:""
   }])

const getdata = async()=>{
try {
  setLoading(true);
	const response = await fetch("https://api.slingacademy.com/v1/sample-data/blog-posts?offset=5&limit=50");
 let result = await response.json();
  result = result.blogs;
  result.map((info)=>{
    // console.log(info)
    final((data)=>[
      ...data,{
       photo_url : info.photo_url,
       title : info.title,
       category : info.category,
       content_text : info.content_text,
       id : info.id,
      }
    ])
  })
  setLoading(false);
} catch (error) {
  setLoading(false);
	console.error(error);
}
}

const verifyuser = async()=>{
    try {
        axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("https://abdvisoropedian-1wdb.vercel.app/postlist");
      const Name = response.data.Name;
      finName(Name);
    } catch (error) {
        alert(error);
        navigate("/");
    }
}
useEffect(()=>{
    verifyuser();
    getdata()
},[])
// console.log(initial)
    return(
        <>
		<div className="flex flex-col">
        <nav class="relative px-4 py-4 flex justify-between bg-blue-900 items-center ">
		<a class="text-lg sm:text-3xl text-white	  font-bold leading-none" href="#">
			My Post
		</a>
		<div class="lg:hidden">
			<button onClick={()=>{
             localStorage.removeItem("token");
			 navigate("/");
		}} class="navbar-burger flex items-center text-white p-3">
		<svg class="w-6 h-6  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
  </svg><h1 className="hidden sm:block">Log Out</h1>
			</button>
		</div>
		<ul class=" absolute space-x-2 items-center top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
			<li><Link to={"/"} class="text-sm text-white hover:text-gray-500 whitespace-nowrap" href="#">Home</Link></li>
			<li class="text-gray-300 ">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><Link to={"/postlist"} class="text-sm text-white font-bold whitespace-nowrap" href="#">Post</Link></li>

		</ul>

		{(iniName=="")?(<>
		<Link to={"/login"} class="hidden lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="#">{iniName}</Link>
		</>):(<>
		<Link to={"/login"} class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="#">{iniName}</Link>
		</>)}
		<button onClick={()=>{
             localStorage.removeItem("token");
			 navigate("/");
		}} class="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Log Out</button>
	</nav>
	<div>
	<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex text-black justify-evenly flex-wrap -m-4">
      {(initial.length==1)?(<>
        <div className="flex flex-col justify-evenly m-auto">
      <div className="flex justify-evenly mx-auto">
        <DotSpinner size={100} speed={0.9} color="white" className="flex items-center   mx-auto" />
                     <DotSpinner size={100} speed={0.9} color="red" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={100} speed={0.9} color="blue" className="flex items-center  justify-center mx-auto" />
                     </div>
                     <div className="hidden mt-32 md:flex justify-evenly mx-auto">
        <DotSpinner size={100} speed={0.9} color="pink" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={100} speed={0.9} color="green" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={100} speed={0.9} color="black" className="flex items-center  justify-center mx-auto" />
                     </div>
                     </div>           
      </>):(<>
        {initial.map((info)=>{
        
        if(!info.id) return null;
        return(
          <>
          <div class="p-4 sm:w-1/2  lg:w-1/3">
        <div class="h-full bg-white border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img class="h-42 lg:h-64  w-full object-cover object-center" src={info.photo_url} alt="blog"/>
          <div class="p-6">
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{info.category}</h2>
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{info.title}</h1>
            <p class="leading-relaxed overflow-hidden max-h-20 md:max-h-12 mb-3">{info.content_text}</p>
            <div class="flex items-center flex-wrap ">
              <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <svg class="w-6 h-6 text-gray-800 dark:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M15 9.7h4a2 2 0 0 1 1.6.9 2 2 0 0 1 .3 1.8l-2.4 7.2c-.3.9-.5 1.4-1.9 1.4-2 0-4.2-.7-6.1-1.3L9 19.3V9.5A32 32 0 0 0 13.2 4c.1-.4.5-.7.9-.9h1.2c.4.1.7.4 1 .7l.2 1.3L15 9.7ZM4.2 10H7v8a2 2 0 1 1-4 0v-6.8c0-.7.5-1.2 1.2-1.2Z" clip-rule="evenodd"/>
  </svg>1.2K
              </span>
              <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
            </div>
          </div>
        </div>
      </div>
          </>
        )
      })}
      </>)}
   

    </div>
  </div>
</section>
	</div>
	</div>
        </>
    )
}
export default UserPage;