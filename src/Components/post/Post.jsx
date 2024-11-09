import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import db from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

function Post(props) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(props.like);
  const [likedBy, setLikedBy] = useState(props.likedBy || []);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(props.description);
  const cookie = document.cookie;
  const navigate = useNavigate();

  useEffect(() => {
    setLike(likedBy.includes(cookie));
  }, [likedBy, cookie]);

  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(!showDropdown);
  };

  const handleSaveEdit = async () => {
    try {
      await db.collection("posts").doc(props.id).update({
        description : editedDescription,
      });
      setIsEditing(false);
      console.log("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = () => {
    db.collection("posts").doc(props.id).delete().then(() => {
      console.log("Document successfully deleted!");
      if (props.onDelete) {
        props.onDelete(props.id);
      }
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    setShowDropdown(!showDropdown);
  };

  const handleLike = () => {
    const newLikedBy = like
      ? likedBy.filter(user => user !== cookie)
      : [...likedBy, cookie];
    
    const newLikeCount = newLikedBy.length;
    
    setLike(!like);
    setLikeCount(newLikeCount);
    setLikedBy(newLikedBy);

    db.collection("posts").doc(props.id).update({
      like: newLikeCount,
      likedBy: newLikedBy
    }).catch(error => {
      console.error("Error updating like count:", error);
    });
  };

  const handleComment = () => {
    console.log("comment");
  };

  const handleThreeDotsClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={`bg-black font-manrope tracking-wide bg-opacity-20 w-full md:w-${props.width} rounded-2xl p-4 mt-4 md:mt-6 md:mx-auto text-slate-100`}>
      <div className="w-full flex items-center">
        <Link to={props.username === cookie ? "/profile" : `/profile/${props.username}`}>
          <img
            src={props.logo}
            alt="user"
            className="w-12 h-12 rounded-[50%] cursor-pointer"
          />
        </Link>
        <div className="w-9/12 flex flex-col">
          <div className="md:flex items-center ml-4">
            <Link to={props.username === cookie ? "/profile" : `/profile/${props.username}`}>
              <h4 className="mr-2 text-sm cursor-pointer">{props.name}</h4>
            </Link>
            <p className="text-slate-400 md:text-sm text-xs font-manrope">
              (@
              <Link
                to={props.username === cookie ? "/profile" : `/profile/${props.username}`}
                className="text-slate-300 text-xs"
              >
                {props.username}
              </Link>
              )
            </p>
          </div>
          <p className="text-slate-300 text-xs ml-4 mt-1">{props.bio}</p>
        </div>
        <div className="flex ml-auto items-center justify-end">
          {props.username === cookie && (
            <div className="relative group">
              <div
                onClick={handleThreeDotsClick}
                className="m-1 rounded-full bg-pink-500 hover:bg-purple-700 p-2 transition-all 
                duration-200 ease-out cursor-pointer h-max"
              >
                <BsThreeDotsVertical className="" />
              </div>
              {showDropdown && (
                <div className="absolute backdrop-blur-md font-serif right-0 bg-black bg-opacity-20 overflow-hidden z-10 rounded-md border">
                  <div
                    onClick={handleEdit}
                    className="px-5 py-3 text-white cursor-pointer hover:bg-pink-500"
                  >
                    edit
                  </div>
                  <div
                    onClick={handleDelete}
                    className="px-5 py-3 text-white cursor-pointer hover:bg-pink-500"
                  >
                    delete
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col py-4">
      {isEditing ? (
          <>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="my-3 w-full bg-gray-700 rounded-md p-2 text-white"
            ></textarea>
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white py-1 px-4 rounded-md mt-2 hover:bg-blue-600"
            >
              Save Changes
            </button>
          </>
        ) : (
          <p className="my-3 md:mb-2 md:mt-0 md:pl-2 md:pt-1 text-sm tracking-wide">
            {props.description}
          </p>
        )}
        {props.image && (
          <img
            src={props.image}
            alt="feed"
            className="rounded-xl max-h-[22rem]"
          />
        )}
      </div>
      <div className="px-4 flex justify-between bg-black bg-opacity-10 py-2">
        <div className="flex items-center text-xs">
          <BiHeart className="text-red-700" />
          <h5 className="text-slate-200 ml-1">{likeCount}</h5>
        </div>
        <div className="flex items-center text-xs">
          <p>
            {props.commentCnt == null ? "0" : props.commentCnt}{" "}
            {props.commentCnt < 2 || props.commentCnt == null
              ? "comment"
              : "comments"}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex mt-4 justify-around text-sm w-full">
          <div onClick={handleLike} className="flex cursor-pointer">
            {like ? (
              <FaHeart className="text-xl mr-2 text-red-600" />
            ) : (
              <FiHeart className="text-xl mr-2 text-white" />
            )}
            <p className="text-white">Like</p>
          </div>
          <div onClick={handleComment} className="flex cursor-pointer">
            <p className="text-white hover:text-blue-300 hover:underline">
              Comment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;