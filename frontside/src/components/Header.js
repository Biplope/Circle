import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import React, { useState } from "react";
import "../styles/Header.css";

import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExploreIcon from "@material-ui/icons/Explore";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import LoadIcon from "../images/loading.gif";
import loginImage2 from "../images/logo.png";
import { logout } from "../redux/actions/authActions";
import { getDataApi } from "../utils/fetchDataApi";
import UserCard from "./UserCard";

export const Header = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  const { auth, notify } = useSelector((state) => state);
  const { pathname } = useLocation();

  // useEffect(()=>{
  //    if(search && auth.token){
  //       getDataApi(`search?username=${search}`,auth.token)
  //       .then(res=>setUsers(res.data.users))
  //       .catch(err=>{
  //          dispatch({
  //             type:'ALERT',
  //             payload:{
  //                error: err.response.data.msg
  //             }
  //          })
  //       })
  //    }else {
  //       setUsers([])
  //    }
  // },[search,auth.token,dispatch])

  // const isActive = (pn) => {
  //    console.log(pn)
  //     if(pn === pathname) return true;
  // }

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
  return (
    <div className="header container-fluid d-flex justify-content-between align-items-center bg-primary text-white px-2 py-2 sticky-top">
      <div className="header-right pl-5">
        <img
          to="/"
          src={loginImage2} // Path to the imported image
          alt="Login Visual"
          style={{ height: "40px", width: "100px" }}
          class="img-fluid2 mb-2"
        />
      </div>
      <form className="header-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon style={{ opacity: users.length > 0 ? "0" : "1" }} />
        <span
          className="header-centersearchclose"
          onClick={handleClose}
          style={{ opacity: users.length > 0 ? "1" : "0" }}
        >
          &times;
        </span>
        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
        <div className="header-searchusers">
          {load && (
            <img
              src={LoadIcon}
              alt=""
              style={{ width: "48px", height: "48px" }}
            />
          )}
          {search &&
            users.length > 0 &&
            users.map((user) => (
              <UserCard user={user} handleClose={handleClose} />
            ))}
        </div>
      </form>
      <div className="header-left pe-5">
        <Link to={`/profile/${auth.user._id}`}>
          {" "}
          <div className="header-leftAvatar">
            <Avatar src={auth.user.avatar} />
            <div className="mt-1">
              <div className="mx-3">
                <text style={{ color: "black" }}>{auth.user.fullname}</text>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/">
          <IconButton className="text-dark">
            <HomeIcon />
          </IconButton>
        </Link>

        <Link to="/message">
          <IconButton className="text-dark">
            <MessageIcon />
          </IconButton>
        </Link>
        <Link to="/notification">
          <IconButton className="text-dark">
            <NotificationsIcon />
          </IconButton>
          <span
            style={{
              position: "absolute",
              transform: "translate(-26px,16px)",
              color: "white",
              fontSize: "10px",
            }}
          >
            {notify && notify.data.length}
          </span>
        </Link>
        <IconButton onClick={() => dispatch(logout())} className="text-dark">
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
