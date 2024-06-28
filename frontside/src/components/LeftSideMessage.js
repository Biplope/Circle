import React, { useEffect, useState } from "react";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AddUser, getConversations } from "../redux/actions/messageActions";
import { getDataApi } from "../utils/fetchDataApi";
import UserCardMessages from "./UserCardMessages";

const LeftSideMessage = () => {
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [load, setLoad] = useState(false);
  const { auth, message } = useSelector((state) => state);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations(auth));
  }, [dispatch, auth, message.firstLoad]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setSearchUser(res.data.users);
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

  const handleAddChat = (user) => {
    setSearch("");
    setSearchUser([]);
    dispatch(AddUser({ user, message }));
    history.push(`/message/${user._id}`);
  };

  return (
    <div className="leftsidecontent">
      <div className="leftsidecontentsearch">
        <div className="input-group">
          <input
            type="text"
            className="form-control mr-3"
            placeholder="Find the user for chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="leftsidecontentuserlist">
        {searchUser.length !== 0 ? (
          <>
            {searchUser.map((user, index) => (
              <div onClick={() => handleAddChat(user)} key={index}>
                <UserCardMessages user={user} style={{ color: "red" }} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users?.length > 0 &&
              message.users?.map((user, index) => (
                <div onClick={() => handleAddChat(user)} key={index}>
                  <UserCardMessages
                    user={user}
                    msg={true}
                    style={{ color: "blue" }}
                  >
                    <FiberManualRecordIcon />
                  </UserCardMessages>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSideMessage;
