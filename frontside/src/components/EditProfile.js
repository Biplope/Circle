import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/profileActions";
import "../styles/EditProfile.css";
import { checkimage } from "../utils/imageupload";

const EditProfile = ({ user, SetOnEdit }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    bio: "",
  };
  const [editData, setEditData] = useState(initState);
  const { firstName, lastName, email, contact, bio } = editData;
  const [avatar, setAvatar] = useState("");

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkimage(file);
    if (err) return dispatch({ type: "ALERT", payload: { error: err } });
    setAvatar(file);
  };

  useEffect(() => {
    setEditData(user);
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const selectUpload = () => {
    const fileUploadInput = document.getElementById("file-upload");
    fileUploadInput.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ editData, avatar, auth }));
    SetOnEdit(false);
  };

  return (
    <div className="editprofile">
      <div className="container editprofile-content">
        <div className="editprofile-closebtn">
          <button className="btn btn-close" onClick={() => SetOnEdit(false)}>
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <div className="editprofile-head d-flex justify-content-between align-items-center mb-3">
          <h4 className="editprofile-headtitle m-0">Edit Profile</h4>
          <div className="editprofile-avatar m-1">
            <div className="avatar-wrapper">
              <img
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                alt="Profile Avatar"
                className="rounded-circle"
              />
              <div className="edit-icon" onClick={selectUpload}>
                <i className="fas fa-camera">
                  <p className="editprofile-userdatapara d-inline">
                    U
                  </p>
                </i>
              </div>
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={changeAvatar}
            />
          </div>
        </div>
        <div className="editprofile-body d-flex">
          <div className="editprofile-form flex-grow-1">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={handleChangeInput}
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={handleChangeInput}
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChangeInput}
                  name="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={handleChangeInput}
                  name="contact"
                  className="form-control"
                  placeholder="Contact"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={handleChangeInput}                                                   
                  name="bio"
                  className="form-control"
                  placeholder="Bio"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
