
// import AOS from "aos";
// import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Hero(props) {
  // useEffect(() => {
  //   AOS.init({ duration: 2000 });
  // }, []);

  return (
    <div className="md:w-full flex flex-col md:flex-row m-auto rounded-xl">
      <img
        className="w-full m-auto rounded-md h-screen opacity-20 md:opacity-25 pt-20 md:pt-10"
        src="https://cdn.pixabay.com/photo/2018/06/15/11/16/hogwarts-3476786_960_720.png"
        alt="hero-img"
      ></img>
      <div className="w-11/12 md:w-6/12 md:px-10 py-6 absolute top-48 left-[5%] md:top-36 md:left-64 md:pl-6 text-center md:text-left">
        <h1 className="text-6xl md:text-7xl text-slate-50 font-bold my-12 md:my-16">
          Welcome to{" "}
          <span className="bg-gradient-to-br from-blue-400 to-orange-500 text-transparent bg-clip-text main-animation">
            GitFinder
          </span>
          🪄
        </h1>
        <h4 className="text-blue-100 text-xl font-manrope tracking-wide">
          Show <span className="font-milonga tracking-wide text-2xl">what</span>{" "}
          you are,{" "}
          <span className="font-milonga tracking-wide text-2xl">where</span> it
          is needed.
        </h4>
        <div className="md:mt-10 mt-10 flex flex-col md:w-3/6 md:static">
          <h3 className="text-2xl text-blue-200 mb-5 font-manrope font-bold">
            Feeling Excited?
          </h3>
          <div>
            <button
              onClick={props.authenticateUser}
              className="w-7/12 mt-5 md:mt-2 p-3 md:p-4 text-white font-medium text-xl border-4  border-pink-500 rounded-full hover:bg-pink-500 shadow-pink-500 shadow font-manrope button-85"
            >
              Let's go! 🚂
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}