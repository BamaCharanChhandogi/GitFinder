import logo from "../../assets/logo.png";
import { FiGithub } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

export default function Navbar(props) {
  let featureLink = "/" + "#features";
  let peopleLink = "/" + "#people";
  let Links = [
    { name: "Features", link: featureLink },
    { name: "Users", link: peopleLink },
    { name: "Support", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex px-2 items-center justify-between md:justify-around h-20 md:h-28 bg-slate-900 bg-opacity-30 backdrop-blur-lg drop-shadow-2xl md:mb-10 z-50 w-full">
      <div className="w-2/12 h-full md:w-4/6 flex justify-start font-manrope items-center">
        <div className="md:p-0 md:w-2/12 w-11/12 md:flex content-center items-center">
          <a href="/">
            <img
              className="md:w-20 md:h-20 md:p-4 p-1 h-16 w-16 bg-slate-200 rounded-2xl"
              src={logo}
              alt="Gitshow logo"
            ></img>
          </a>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-slate-100 md:hidden absolute right-4 top-4 cursor-pointer text-3xl"
        >
          {open ? <RxCross1 /> : <HiMenuAlt3 />}
        </div>
        <ul
          className={`md:flex md:justify-end md:bg-none text-slate-200 md:items-center md:text-lg text-xl md:pb-0 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 transition-all duration-1000 ease-in-out tracking-wider ${
            open ? "top-16 bg-[#141a23] h-auto" : "top-[-490px] bg-transparent"
          } md:opacity-100 rounded-lg`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="md:my-0 my-6 flex justify-center mt-10"
            >
              <a
                className="md:m-5 text-white hover:text-blue-300"
                href={link.link}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/12 hidden md:flex items-center justify-around w-4/12 mx-4 mr-6">
        <div className="text-blue-100 mx-2 py-1 md:py-2 px-2 md:px-4 border-2 rounded-full border-blue-50 hover:bg-black hover:text-white hover:border-black transition-all ease-out duration-150">
          <button
            onClick={props.authenticateUser}
            className="flex items-center justify-evenly w-20 m-auto"
          >
            Login <FiGithub />
          </button>
        </div>
      </div>
    </nav>
  );
}
