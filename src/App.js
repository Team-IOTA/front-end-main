
import './App.css';
import React, { useEffect } from 'react';
import { createUserFromUID, getUserFromUID, logUser } from "./Controller.js";
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PlayerPage from './SecondPage/PlayerPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username:"",
  });
  
  const [name, setName] = useState("");
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  function createAccount(){
    const userId="UID"+Math.floor(Date.now() / 1000)
    const objectId =uuidv4()
    createUserFromUID(formData.username,formData.email,formData.password,objectId,userId);
    if(formData.email!=""&&formData.username!=""&&formData.password!=""){
      setShowLogin(!showLogin); 

    }else{
      setError2(true)
     
    }
    setFormData({
      email: "",
      password: "",
      username:"",
    })
  }
  const [error1,setError]=useState(false)
  const [error2,setError2]=useState(false)
    function loggedIn(){

      let res=logUser(formData.username,formData.password);
      res.then(
        r=>{
          if(r.login==true){
            setShowLogin(!showLogin);  
            console.log("yes")
         

          }else{
            console.log("no")
            setError(true)
          }
        }
        
        );
      setFormData({
        password: "",
        username:"",
      })
    

  }

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
   /*   const [post,setPost] = useState({ username:' ',password:' ' , email:' ' })   
     const handleInput=(event)=>{ 
      setPost({...post,[event.target.name]:event.target.value})
    }  
   function handleSubmit(event){ 
      event.preventDefault () 
      axios.post('http://localhost:8000/classifie/api/CreateUser',{post})
      .then(response=>console.log(response)) 
      .catch(err=>console.log(err))}
*/

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
      //createUserFromUID(formData.username,formData.email,formData.password);
    });


    sign_in_btn.addEventListener("click", () => {
     container.classList.remove("sign-up-mode");
    });

    const htmlEl = document.getElementsByTagName("html")[0];
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;
    if (currentTheme) {
      htmlEl.dataset.theme = currentTheme;
    }
    const toggleTheme = (theme) => {
      htmlEl.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    };

    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#id_password");

    togglePassword.addEventListener("click", function (e) {
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
      this.classList.toggle("fa-eye-slash");
    });

    const toggleReg = document.querySelector("#toggleReg");
    const pass = document.querySelector("#id_reg");

    toggleReg.addEventListener("click", function (e) {
      const type = pass.getAttribute("type") === "password" ? "text" : "password";
      pass.setAttribute("type", type);
      this.classList.toggle("fa-eye-slash");
    });
  }, []);
 

  return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        {!showLogin && (
        <div className="container">
          <div className="forms-container">
            <div className="signin-signup">
              <form action="post" className="sign-in-form">
                <h2 className="title">Login</h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input type="text" name="username" autoComplete="username" placeholder="Username" required="yes" value={formData.username}
          onChange={handleFormChange} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input type="password" name="password" autoComplete="current-password" placeholder="Password"  required="yes" value={formData.password}
          onChange={handleFormChange} />
                  
                  <i className="far fa-eye" id="togglePassword" style={{cursor: 'pointer'}} />
                </div>
                {error1 ? (
  <label className="errortext">Invalid Username or Password</label>
) : null}

                <a className="pass" href="#">Forgot your password?</a>
                <label className="check">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark">Keep Me Logged</span>
                </label>
                <input type="submit" defaultValue="Sign in" onClick={()=>loggedIn()} className="btn solid" />
                
                <p className="social-text">You can login with:</p>
                <div className="social-media">
                  <a href="#" className="social-icon" aria-label="Register with Google">
                    <i className="fab fa-google" />
                  </a>
                  <a href="#" className="social-icon" aria-label="Register with Discord">
                    <i className="fab fa-discord" />
                  </a>
                  <a href="#" className="social-icon" aria-label="Register with Twitter">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
                  </a>
                </div>
                <div className="social-media">
                  <a className="icon-mode" onclick="toggleTheme('dark');"><i className="fas fa-moon" /></a>
                  <a className="icon-mode" onclick="toggleTheme('light');"><i className="fas fa-sun" /></a>
                </div>
                <p className="text-mode">Change theme</p>
              </form>
              <form action='POST' className="sign-up-form">
                <h2 className="title">Register</h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input type="text" name="username" autoComplete="username" placeholder="Username" required="yes" value={formData.username}
          onChange={handleFormChange} />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope" />
                  <input type="email" name="email" autoComplete="email" placeholder="Email" required="yes" value={formData.email}
          onChange={handleFormChange}  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock" />
                  <input type="password" name="password" autoComplete="current-password" placeholder="Password" id="id_reg" required="yes" value={formData.password}
          onChange={handleFormChange} />
                  <i className="far fa-eye" id="toggleReg" style={{cursor: 'pointer'}} />
                </div>
                {error2 ? (
  <label className="errortext2">Fill in all the Required fields</label>
) : null}
                <label className="check">
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark">I accept the terms and services</span>
                </label>
                <button type="button"  onClick={()=>createAccount()} defaultValue="Create account" className="btn solid" >Submit</button>
                <p className="social-text">You can register with:</p>
                <div className="social-media">
                  <a href="#" className="social-icon" aria-label="Register with Google">
                    <i className="fab fa-google" />
                  </a>
                  <a href="#" className="social-icon" aria-label="Register with Discord">
                    <i className="fab fa-discord" />
                  </a>
                  <a href="#" className="social-icon" aria-label="Register with Twitter">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <p>
                  <font size={300} face="arial">
                    CLASSIFIE
                  </font>
                </p>
                <h3>Are You Tired of Struggling with Your Education work? Let Us Help Make it Easy for You! </h3>
                <p> Simply Create an Account And Get Started Today!</p>
                <button className="btn transparent" id="sign-up-btn">Register</button>
                <div className="created">
                  <p>Powered by&nbsp;<a> I O T A</a></p>
                </div>
              </div>
              <img src="img/log.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Already have an account?</h3>
                <p>Great to see you again! Please log in to your Account to get started</p>
                <button className="btn transparent"  id="sign-in-btn">Sign in</button>
              </div>
              <img src="img/register.svg" className="image" alt="" />
            </div>
          </div>
        </div>)}
        <script>
      
        </script>
        {showLogin && (
        <div className="loginnext">
          <PlayerPage />
        </div>
      )}
      </div>
    );

  }
  
export default App;
