import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, { useEffect, useState } from "react";

import SaveAltIcon from "@material-ui/icons/Bookmark";
import CommentIcon from "@material-ui/icons/ChatBubble";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  likepost,
  savedPost,
  unlikepost,
  unsavedPost,
} from "../redux/actions/postActions";
import "../styles/PostCard.css";
import LikePost from "./LikePost";

const PostCardFooter = ({ pos }) => {
  const [isLike, setIsLike] = useState(false);
  const [load, setLoad] = useState(false);
  const [saved, setSaved] = useState(false);
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pos.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [pos.likes, auth.user._id]);
  useEffect(() => {
    if (auth.user.saved.find((id) => id === pos._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [pos._id, auth.user.saved]);
  const handleLike = async () => {
    if (load) return;
    setIsLike(true);
    setLoad(true);
    dispatch(likepost({ pos, auth, socket }));
    setLoad(false);
  };
  const handleUnLike = async () => {
    if (load) return;
    setIsLike(false);
    setLoad(true);
    dispatch(unlikepost({ pos, auth, socket }));
    setLoad(false);
  };

  return (
    <div className="postcardfooter">
      <div className="postcardfootertop">
        <div className="postcardfootertopitems">
          <span> {pos.likes?.length} </span>
          <FavoriteBorderIcon style={{ color: "red" }} />
        </div>
        <div className="postcardfootertopitems">
          <span> {pos.commentss?.length} </span>
          <CommentIcon />
        </div>
      </div>
      <div className="postcardfooterbottom">
        <div className="postcardfooterbottomitems">
          <LikePost
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <p> Like </p>
        </div>
        <Link to={`/post/${pos._id}`}>
          <div className="postcardfooterbottomitems text-dark ">
            <CommentIcon />
            <p> Comment </p>
          </div>
        </Link>
        <div className="postcardfooterbottomitems">
          {saved ? (
            <SaveAltIcon
              style={{ color: "rebeccapurple" }}
              onClick={() => dispatch(unsavedPost({ pos, auth }))}
            />
          ) : (
            <SaveAltIcon onClick={() => dispatch(savedPost({ pos, auth }))} />
          )}
          <p> Save </p>
        </div>
      </div>
    </div>
  );
};

export default PostCardFooter;
