import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";  // Import Notification Icon
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrBlog } from "react-icons/gr";

export default function Sidebar() {
  const [active, setActive] = useState("");
  const path = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (path === "/home") {
      setActive("home");
    }
    if (path === "/explore") {
      setActive("explore");
    }
    if (path === "/notifications") {  // Handle notifications route
      setActive("notifications");
    }
    if (path === "/messages") {
      setActive("messages");
    }
    if (path === "/profile") {
      setActive("profile");
    }
  }, []); 

  return (
    <div className="w-full font-manrope tracking-wide z-50 fixed bottom-0 mt-10 md:top-0 md:left-20 md:w-1/6 md:h-auto bg-slate-600 bg-opacity-10 backdrop-blur-lg rounded-2xl md:m-3 md:p-3 flex flex-row md:flex-col md:items-center text-white text-xl">
      <ul className="w-full flex justify-around items-center md:items-start md:flex-col p-2 md:p-0">
        <li className="md:flex hidden">
          <div className="flex items-center">
            <img
              className="w-1/6 md:w-3/6 md:ml-5 mt-4 bg-slate-600 cursor-pointer rounded-full border-[2px] border-pink-500"
              src={logo}
              alt="Gitshow logo"
              onClick={() => navigate("/home")}
            ></img>
          </div>
        </li>

        {/* Home */}
        <li className="w-full md:mt-10 md:mb-2 mx-2 md:mx-0">
          <Link to={"/home"}>
            <div
              className={`flex ${
                active === "home"
                  ? "text-pink-500 bg-black rounded-lg"
                  : "hover:text-pink-400 hover:bg-black hover:rounded-lg"
              } p-2`}
            >
              <TiHomeOutline className="md:m-2 m-auto" />
              <span className="m-1 hidden md:block">Home</span>
            </div>
          </Link>
        </li>

        {/* Explore */}
        <li className="w-full md:mb-2 mx-2 md:mx-0">
          <Link to={"/explore"}>
            <div
              className={`flex ${
                active === "explore"
                  ? "text-pink-500 bg-black rounded-lg"
                  : "hover:text-pink-400 hover:bg-black hover:rounded-lg"
              } p-2`}
            >
              <BiSearchAlt className="md:m-2 m-auto" />
              <span className="m-1 hidden md:block">Explore</span>
            </div>
          </Link>
        </li>

        {/* Blogs */}
        <li className="w-full md:mb-2 mx-2 md:mx-0">
          <Link to={"/blog"}>
            <div
              className={`flex ${
                active === "notifications"
                  ? "text-pink-500 bg-black rounded-lg"
                  : "hover:text-pink-400 hover:bg-black hover:rounded-lg"
              } p-2`}
            >
              <GrBlog className="m-auto md:m-2" />
              <span className="m-1 hidden md:block">Blogs</span>
            </div>
          </Link>
        </li>

        {/* Messages */}
        <li className="w-full md:mb-2 mx-2 md:mx-0">
          <Link to={"/chat"}>
            <div
              className={`flex ${
                active === "messages"
                  ? "text-pink-500 bg-black rounded-lg"
                  : "hover:text-pink-400 hover:bg-black hover:rounded-lg"
              } p-2`}
            >
              <FiMessageSquare className="m-auto md:m-2" />
              <span className="m-1 hidden md:block">Messages</span>
            </div>
          </Link>
        </li>

        {/* Notifications */}
        <li className="w-full md:mb-2 mx-2 md:mx-0">
          <Link to={"/notifications"}>
            <div
              className={`flex ${
                active === "notifications"
                  ? "text-pink-500 bg-black rounded-lg"
                  : "hover:text-pink-400 hover:bg-black hover:rounded-lg"
              } p-2`}
            >
              <IoIosNotificationsOutline className="m-auto md:m-2" />  {/* Notification Icon */}
              <span className="m-1 hidden md:block">Notifications</span>
            </div>
          </Link>
        </li>

        {/* Profile */}
        <li className="w-full md:mb-2 mx-2 md:mx-0">
          <Link to={"/profile"}>
            <div
              className={`flex ${
                active === "profile"
                  ? "text-pink-500 bg-black rounded-lg"
                  : "hover:text-pink-400 hover:bg-black hover:rounded-lg"
              } p-2`}
            >
              <FiUser className="m-auto md:m-2" />
              <span className="m-1 hidden md:block">Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
