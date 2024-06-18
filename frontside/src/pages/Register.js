// import React, { useEffect, useState } from "react";
// import {Link, useHistory} from "react-router-dom"
// import {useSelector , useDispatch} from 'react-redux';
// import {register} from '../redux/actions/authActions'

// import "../styles/Register.css";

// const Register = () => {
//   const initialState = {username:'',fullname:'',email:'',password:'',confirmPassword:'',gender:'male'}

//   const [showpass , setShowpass] =useState(false)
//   const [showcfpass , setShowcfpass] =useState(false)
//   const [userData , setuserData] = useState(initialState)
//   const {username,fullname,email,password,confirmPassword,gender} = userData;

//   const {auth,alert} = useSelector(state => state);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleChange= (e) =>{
//     const {name,value}= e.target;
//     setuserData({...userData, [name]:value})

//   }

//   useEffect(()=>{
//     if(auth.token){
//       history.push('/')
//     }
//   },[auth.token,history])

//   const handleSubmit = (e) =>{
//     e.preventDefault();

//     dispatch(register(userData))

//   }
//   return (
//     <div className="register">
//     <div className="register-container">
//     <h3 className="register-header">Social Network</h3>
//     <h6 className="register-subheader">register</h6>

//       <form className="register-dataform" onSubmit={handleSubmit}>
//       <input
//       className="register-dataformemail"
//       type="text"
//       value={fullname}
//       name="fullname"
//       onChange={handleChange}
//       placeholder={alert.fullname ? `${alert.fullname}` : 'Enter your fullname'}
//       style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
//       ></input>

//       <input
//       className="register-dataformpass"
//       type="text"
//       name="username"
//       placeholder={alert.username ? `${alert.username}` : 'Enter your username'}
//       value={username.toLowerCase().replace(/ /g,'')}
//       onChange={handleChange}
//       style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
//       >
//       </input>

//       <input
//       className="register-dataformpass"
//       type="email"
//       placeholder={alert.email ? `${alert.email}` : 'Enter your Email'}
//       style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
//       value={email}
//       name="email"
//       onChange={handleChange}
//       >
//       </input>

//       <input
//       className="register-dataformpass"
//       type={showpass ? "type" : "password"}
//       placeholder={alert.password ? `${alert.password}` : 'Enter your Password'}
//       style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
//       value={password}
//       name="password"
//       onChange={handleChange}
//       >
//       </input>

//       <small className="register-showpass" onClick={()=>setShowpass(!showpass)}> {showpass ? "Hide" : "show"} </small>
//       <input
//       className="register-dataformpass"
//       type={showcfpass ? "type" : "password"}
//       placeholder={alert.confirmPassword ? `${alert.confirmPassword}` : 'Enter your password again'}
//       style={{background: `${alert.fullname ? '#fa8e96' : ' '}`}}
//       value={confirmPassword}
//       name="confirmPassword"
//       onChange={handleChange}
//       >
//       </input>

//       <select className="register-dataformselect" name="gender" value={gender} onChange={handleChange}>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//       <small className="register-showcfpass" onClick={()=>setShowcfpass(!showcfpass)}> {showcfpass ? "Hide" : "show"} </small>
//       <button
//       className="register-dataformbtn"
//       type="submit" > Log In </button>
//       <p className="register-small">Already have an account <Link to="/">LogIn HERE</Link></p>
//       </form>
//       </div>
//   </div>
//   );
// };

// export default Register;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../redux/actions/authActions";
import "../styles/Login.css"; // Reuse the same CSS file as Login
import "../styles/Register.css"; // Reuse the same CSS file as Login

import loginImage1 from "../images/login.png";
import loginImage2 from "../images/logo.png";

const Register = () => {
  const initialState = {
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  };
  const [showpass, setShowpass] = useState(false);
  const [showcfpass, setShowcfpass] = useState(false);
  const [userData, setuserData] = useState(initialState);
  const { username, fullname, email, password, confirmPassword, gender } =
    userData;

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth.token, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="login container-fluid d-flex align-items-center justify-content-center">
      <div className="row align-items-center">
        <div className="col-md-6 d-none d-md-block pe-5">
          <img
            src={loginImage2}
            alt="Register Visual"
            style={{ height: "40px", width: "100px" }}
            className="img-fluid2 mb-2"
          />
          <p className="fs-1 hello text-dark">
            Gather Your Circle on This App –
          </p>
          <p className="hello text-dark">Join, Connect, Share!</p>
          <img src={loginImage1} alt="Register Visual" className="img-fluid1" />
        </div>
        <div className="col-md-6 d-flex justify-content-center ps-5">
          <div className="login-container card p-4 shadow">
            <form className="login-dataform mt-4" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={handleChange}
                  placeholder={
                    alert.fullname ? `${alert.fullname}` : "Fullname"
                  }
                  style={{ background: `${alert.fullname ? "#fa8e96" : ""}` }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={username.toLowerCase().replace(/ /g, "")}
                  onChange={handleChange}
                  placeholder={
                    alert.username ? `${alert.username}` : "Username"
                  }
                  style={{ background: `${alert.username ? "#fa8e96" : ""}` }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder={alert.email ? `${alert.email}` : "Email"}
                  style={{ background: `${alert.email ? "#fa8e96" : ""}` }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control "
                  type={showpass ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder={
                    alert.password ? `${alert.password}` : "Password"
                  }
                  style={{ background: `${alert.password ? "#fa8e96" : ""}` }}
                  required
                />
                <small
                  className="register-showpass hover-pointer"
                  onClick={() => setShowpass(!showpass)}
                >
                  {showpass ? "Hide" : "Show"}
                </small>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type={showcfpass ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder={
                    alert.confirmPassword
                      ? `${alert.confirmPassword}`
                      : "Confirm Password"
                  }
                  style={{
                    background: `${alert.confirmPassword ? "#fa8e96" : ""}`,
                  }}
                  required
                />
                <small
                  className="register-showcfpass hover-pointer"
                  onClick={() => setShowcfpass(!showcfpass)}
                >
                  {showcfpass ? "Hide" : "Show"}
                </small>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <button className="btn btn-warning w-100" type="submit">
                  Register
                </button>
              </div>
              <p className="text-center">
                Already have an account? <Link to="/">Log Now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
