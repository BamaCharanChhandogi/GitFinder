import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import db from "../../firebase";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";

function Post(props) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(props.like);
  const [showDropdown, setShowDropdown] = useState(false);
  const cookie = document.cookie;
  const navigate = useNavigate();

  const handleEdit = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDelete = () => {
    db.collection("posts").doc(props.id).delete();
    setShowDropdown(!showDropdown);
  };
  const handleLike = () => {
    setLike(!like);
    like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  };
  useEffect(() => {
    const postLike = db.collection("posts").doc(props.id);
    postLike.update({
      like: likeCount,
    });
  }, [likeCount]);
  const handleComment = () => {
    console.log("delete");
  };

  const handleThreeDotsClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div
      className={`bg-black font-manrope tracking-wide bg-opacity-20 w-full md:w-${props.width} rounded-2xl p-4 mt-4 md:mt-6 md:mx-auto text-slate-100 `}
    >
      <div className="w-full flex items-center">
        <img src={props.logo} alt="user" onClick={()=>{navigate(`/profile/${props.username}`)}} className="w-12 h-12 rounded-[50%] cursor-pointer" />
        <div className="w-9/12 flex flex-col">
          <div className="md:flex items-center ml-4">
            <h4 className="mr-2 text-sm cursor-pointer" onClick={()=>{navigate(`/profile/${props.username}`)}}>{props.name}</h4>
            <p className="text-slate-400 md:text-sm text-xs font-manrope">
              (@
              {props.username == cookie ? (
                <Link
                  to="/profile"
                  className="text-slate-300 text-xs"
                >
                  {props.username}
                </Link>
              ) : (
                <Link
                  to={`/profile/${props.username}`}
                  className="text-slate-300 text-xs"
                  target="_blank"
                >
                  {props.username}
                </Link>
              )}
              )
            </p>
          </div>
          <p className="text-slate-300 text-xs ml-4 mt-1">{props.bio}</p>
        </div>
        <div className="flex ml-auto items-center justify-end">
          {/* {linkDiv} */}
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
                <div className="absolute font-serif right-0 bg-black bg-opacity-20 overflow-hidden z-10 rounded-md border">
                  <div
                    onClick={handleEdit}
                    className="px-4 py-2 text-white  cursor-pointer hover:bg-pink-500"
                  >
                    edit
                  </div>
                  <div
                    onClick={handleDelete}
                    className="px-4 py-2 text-white cursor-pointer hover:bg-pink-500"
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
        <p className="my-3 md:mb-2 md:mt-0 text-sm tracking-wide">
          {props.description}
        </p>
        {props.image && (
          <img
            src={props.image}
            alt="feed"
            className="rounded-xl max-h-[22rem]"
          />
        )}
      </div>
      <div className=" px-4 flex justify-between bg-black bg-opacity-10 py-2 mt-10">
        <div className="flex items-center text-xs">
          <BiHeart className=" text-red-700" />
          <h5 className="text-slate-200 ml-1">{props.like}</h5>
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
      {/* section where like, comment, share, repost button are present */}
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
