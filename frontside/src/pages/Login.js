import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import "../styles/Login.css";

// Import the image
import loginImage1 from "../images/login.png";
import loginImage2 from "../images/logo.png";

const Login = () => {
  const initialState = { email: "", password: "" };
  const history = useHistory();
  const { auth } = useSelector((state) => state);
  const [showpass, setShowpass] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth.token, history]);

  const { email, password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="login container-fluid d-flex align-items-center justify-content-center">
      <div className="row align-items-center ">
        <div className="col-md-6 d-none d-md-block pe-5">
          <img
            src={loginImage2} // Path to the imported image
            alt="Login Visual"
            style={{ height: "40px", width: "100px" }}
            class="img-fluid2 mb-2"
          />
          <p className="fs-1 hello text-dark">
            Gather Your Circle on This App –
          </p>
          <p class="hello text-dark">Join, Connect, Share!</p>
          <img
            src={loginImage1} // Path to the imported image
            alt="Login Visual"
            className="img-fluid1"
          />
        </div>
        <div className="col-md-6 d-flex justify-content-center ps-5">
          <div className="login-container card p-4 shadow">
            {/* <h3 className="login-header text-center">Social Network</h3>
            <h6 className="login-subheader text-center text-muted">Login</h6> */}
            <form className="login-dataform mt-4" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type={showpass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input mx-1"
                  type="checkbox"
                  id="showPassword"
                  checked={showpass}
                  onChange={() => setShowpass(!showpass)}
                />
                <label className="form-check-label" htmlFor="showPassword">
                  {showpass ? "Hide" : "Show"} Password
                </label>
              </div>
              <div className="form-group ">
                <button className="btn btn-warning w-100" type="submit">
                  Log In
                </button>
              </div>
              <p className="text-center">
                <Link to="/register">Forgot Password?</Link>
              </p>
              <p className="text-center">
                Don't have an account? <Link to="/register">Register Now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
