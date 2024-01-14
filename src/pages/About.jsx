import React, { useState } from "react";
import Navbar from "../Components/Landing/Navbar";
import { FaReact } from "react-icons/fa";
import { SiFirebase, SiTailwindcss } from "react-icons/si";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

export default function Blog() {
  const [content, setContent] = useState("whatsGitFinder");
  return (
    <>
      <div className="flex flex-col bg-[#1B2430] font-inter h-auto min-h-screen bg-cover">
        <Navbar />
        <div className="flex md:mt-0 mt-20">
          <div className="flex flex-col items-center text-4xl tracking-wide overflow-y-hidden p-4 border-r border-slate-500">
            {content === "whatsGitFinder" ? (
              <>
                <div className="flex flex-col md:mt-36 mt-10">
                  <span className="text-4xl md:text-4xl font-bold text-white font-inter">
                    😀 What's{" "}
                    <span className="bg-gradient-to-br from-blue-400 to-orange-500 text-transparent bg-clip-text main-animation">
                      GitFinder?
                    </span>
                  </span>
                </div>
                <div className="text-lg text-slate-400 md:w-8/12 w-11/12 my-10">
                  GitFinder is an outright social-media platform for programmers,
                  where you can showcase your projects hosted on GitHub in a
                  beautiful way. GitFinder facilitates connecting with fellow
                  coders, making posts about your project or repository, sharing
                  projects ideas, checking what fellow coders are creating, and
                  much more!
                  <div
                    className={`md:hidden block w-full h-auto text-blue-800 hover:text-blue-400 text-lg font-semibold bg-blue-100
                       bg-opacity-90 hover:bg-black transition-all duration-700 ease-out rounded-xl my-10 p-3 hover:cursor-pointer`}
                    onClick={() => setContent("whatGitFinderdoes")}
                  >
                    <p>Check What GitFinder does..</p>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {content === "whatGitFinderdoes" ? (
              <>
                <div className="flex flex-col md:mt-36 mt-10">
                  <span className="bg-gradient-to-br text-4xl md:text-4xl font-bold text-white font-inter">
                    🤔 What{" "}
                    <span className="bg-gradient-to-br from-blue-400 to-orange-500 text-transparent bg-clip-text main-animation">
                      GitFinder
                    </span>{" "}
                    does?
                  </span>
                </div>
                <div className="text-xl text-left text-slate-400 my-10 md:w-8/12 w-11/12">
                  <span className="font-semibold">
                    GitFinder does a lot of stuff that you might like:
                  </span>
                  <br />
                  <div className="flex flex-col text-lg tracking-normal mt-3">
                    <div className="flex mt-4">
                      ✏️ Create Posts - You can showcase your projects by
                      creating post about the project you are currently working
                      on and share them.
                    </div>
                    <br />
                    <div className="flex">
                      🔗 Add links to posts - You can also add the GitHub
                      repository link and the live link of the project you made
                      or currently working on.
                    </div>
                    <br />
                    <div className="flex">
                      💡 Share your ideas - If you have cool ideas to build
                      projects but looking for a peer or suggestion, then you
                      can share those ideas by posting them on GitFinder.
                    </div>
                    <br />
                    <div className="flex">
                      👀 Check what others building - You can check what other
                      coders are building and can learn from them, get ideas
                      from them.
                    </div>
                    <br />
                    <div className="flex">
                      💌 Like & Comment - If you like someone's idea or project,
                      you can like their posts and also can give feedback via
                      comments.
                    </div>
                    <br />
                    <div className="flex">
                      🔔 Get notifications - You can get notified everytime when
                      someone likes your post or comment on your post.
                    </div>
                    <br />
                    <div className="flex">
                      🔍 Search fellow coders - You can search about other
                      coders' GitHub profile and explore about them.
                    </div>
                    <br />
                    <div className="flex">
                      🧑🏻‍💻 Active Users - You can find the most active GitHub
                      users listed by GitHub, see their projects and learn from
                      them.
                    </div>
                    <br />
                    <div className="flex">
                      💻 Top projects - You can also find the top open source
                      projects of GitHub and read about them.
                    </div>
                    <div
                      className={`md:hidden block w-full h-auto text-blue-800 hover:text-blue-400 text-lg font-semibold bg-blue-100 bg-opacity-90 hover:bg-black transition-all duration-700 ease-out rounded-xl my-10 p-3 hover:cursor-pointer`}
                      onClick={() => setContent("whatGitFindermadeof")}
                    >
                      <p>Check What GitFinder is made of..</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {content === "whatGitFindermadeof" ? (
              <>
                <div className="flex flex-col md:mt-36 mt-10">
                  <span className="m-4 bg-gradient-to-br text-4xl md:text-4xl font-bold text-white font-inter">
                    🤓 What's{" "}
                    <span className="bg-gradient-to-br from-blue-400 to-orange-500 text-transparent bg-clip-text main-animation">
                      GitFinder
                    </span>{" "}
                    made of?
                  </span>
                </div>
                <div className="text-xl text-left text-slate-400 my-10 md:w-8/12 w-11/12">
                  <span className="font-semibold">
                    {" "}
                    GitFinder uses a number of open source projects to work
                    properly:
                  </span>
                  <br />
                  <div className="flex flex-col text-lg tracking-normal  mt-3">
                    <div className="flex mt-4">
                      <FaReact className="md:text-xl text-5xl mr-2 md:my-1  my-[-10px]" />
                      ReactJS - A declarative, efficient, and flexible JS
                      library for building user interfaces.
                    </div>
                    <br />
                    <div className="flex">
                      <SiTailwindcss className="md:text-2xl text-6xl mr-2 md:my-0.5 my-[-16px]" />
                      Tailwind CSS - A utility-first CSS framework packed with
                      classes to build any design, directly in your markup.
                    </div>
                    <br />
                    <div className="flex">
                      <SiFirebase className="md:text-4xl text-8xl mr-2 md:my-[-5px] my-[-34px]" />
                      Firebase - A Backend-as-a-Service solution both for mobile
                      and web-based applications that includes services for
                      building, testing, and managing apps.
                    </div>
                    <br />
                    <div className="flex">
                      <BsGithub className="md:text-2xl text-6xl mr-2 md:my-0.5  my-[-15px]" />
                      Github API - API to create integrations, retrieve data,
                      and automate your workflows through Github.
                    </div>
                    <div
                      className={`md:hidden block w-full h-auto text-blue-800 hover:text-blue-400 text-lg font-semibold bg-blue-100 bg-opacity-90 hover:bg-black transition-all duration-700 ease-out rounded-xl my-10 p-3 hover:cursor-pointer`}
                      onClick={() => setContent("whoweare")}
                    >
                      <p>Check Who we are..</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {content === "whoweare" ? (
              <>
                <div className="flex flex-col md:mt-36 mt-10">
                  <span className="bg-gradient-to-br text-4xl md:text-4xl font-bold text-white font-inter">
                    😉 Who{" "}
                    <span className="bg-gradient-to-br from-blue-400 to-orange-500 text-transparent bg-clip-text main-animation">
                      We
                    </span>{" "}
                    are?
                  </span>
                </div>
                <div className="text-lg text-slate-400 md:w-8/12 w-11/12 my-10">
                  We, Sujal Samai and Madhavi Gupta are the builders of GitFinder.
                  As future developers, we wanted to create a platform that can
                  help to connect programmers all over the world like other
                  social media applications do, to build an application where
                  people can find their peer programmers, share their ideas,
                  review their projects. And that's how GitFinder came into
                  action.
                  <br />
                  <div className="text-xl mt-6">
                    Find our social media profiles:
                    <div className="flex text-lg mt-2 text-slate-300">
                      Sujal Samai -
                      <a
                        href="https://www.github.com/SujalSamai"
                        className="hover:text-blue-300"
                      >
                        <BsGithub className="mx-2 my-1" />
                      </a>
                      <a
                        href="https://twitter.com/SujalSamai"
                        className="hover:text-blue-300"
                      >
                        <BsTwitter className="mx-2 my-1" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sujal-samai/"
                        className="hover:text-blue-300"
                      >
                        <BsLinkedin className="mx-2 my-1" />
                      </a>
                    </div>
                    <div className="flex text-lg mt-1 text-slate-300">
                      Madhavi Gupta -
                      <a
                        href="https://www.github.com/MadhaviGupta"
                        className="hover:text-blue-300"
                      >
                        <BsGithub className="mx-2 my-1" />{" "}
                      </a>
                      <a
                        href="https://twitter.com/Madhaviig1"
                        className="hover:text-blue-300"
                      >
                        <BsTwitter className="mx-2 my-1" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/madhavi-gupta-6b9358219/"
                        className="hover:text-blue-300"
                      >
                        <BsLinkedin className="mx-2 my-1" />
                      </a>
                    </div>
                  </div>
                  <div
                    className={`md:hidden block w-full h-auto text-blue-800 hover:text-blue-400 text-lg font-semibold bg-blue-100 bg-opacity-90 hover:bg-black transition-all duration-700 ease-out rounded-xl my-10 p-3 hover:cursor-pointer`}
                    onClick={() => setContent("whatsGitFinder")}
                  >
                    <p>Check What is GitFinder..</p>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="md:block hidden">
            <div
              className={`w-96 h-auto text-blue-800 hover:text-blue-400 cursor-default ${
                content === "whatsGitFinder"
                  ? "bg-black text-2xl"
                  : "bg-blue-100 text-xl"
              } bg-opacity-90 hover:bg-black transition-all duration-600 ease-out rounded-xl my-4 mx-6 p-5 mt-40 hover:cursor-pointer`}
              onClick={() => setContent("whatsGitFinder")}
            >
              <span className={`font-semibold text-blue-500 font-inter`}>
                🪄 What's GitFinder?
              </span>
            </div>
            <div
              className={`w-96 h-auto text-blue-800 hover:text-blue-400 cursor-default ${
                content === "whatGitFinderdoes"
                  ? "bg-black text-2xl"
                  : "bg-blue-100 text-xl"
              } bg-opacity-90 hover:bg-black transition-all duration-600 ease-out rounded-xl my-4 mx-6 p-5 hover:cursor-pointer`}
              onClick={() => setContent("whatGitFinderdoes")}
            >
              <span className="font-semibold text-blue-500 font-inter">
                🪄 What GitFinder does?
              </span>
            </div>
            <div
              className={`w-96 h-auto text-blue-800 hover:text-blue-400 cursor-default ${
                content === "whatGitFindermadeof"
                  ? "bg-black text-2xl"
                  : "bg-blue-100 text-xl"
              } bg-opacity-90 hover:bg-black transition-all duration-600 ease-out rounded-xl my-4 mx-6 p-5 hover:cursor-pointer`}
              onClick={() => setContent("whatGitFindermadeof")}
            >
              <span className="font-semibold text-blue-500 font-inter">
                🪄 What's GitFinder made of?
              </span>
            </div>
            <div
              className={`w-96 h-auto text-blue-800 hover:text-blue-400 cursor-default ${
                content === "whoweare"
                  ? "bg-black text-2xl"
                  : "bg-blue-100 text-xl"
              } bg-opacity-90 hover:bg-black transition-all duration-600 ease-out rounded-xl my-4 mx-6 p-5 hover:cursor-pointer`}
              onClick={() => setContent("whoweare")}
            >
              <span className="font-semibold text-blue-500 font-inter">
                🪄 Who we are?
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}