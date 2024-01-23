import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { MdGridOn } from "react-icons/md";
import { BsFolder2Open } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import RepoInfo from "../Components/RepoInfo";
import Post from "../Components/post/Post";
import db from "../firebase";
import { FiLink } from "react-icons/fi";
import Github from "../Components/Github";

export default function ProfilePage() {
  const [userData, setUserData] = useState([]);
  const [repo, setRepo] = useState([]);
  const [content, setContent] = useState("repo");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const { username } = useParams();

  const fetchData = async () => {
    try {
      const accessToken = "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";
      const endpoint = `https://api.github.com/users/${username}`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return setUserData(data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const resetTime = parseInt(
          error.response.headers["x-ratelimit-reset"],
          10
        );
        const currentTime = Math.floor(Date.now() / 1000);
        const sleepTime = resetTime - currentTime;
        console.log(`Rate limit exceeded. Sleeping for ${sleepTime} seconds.`);
        await new Promise((resolve) => setTimeout(resolve, sleepTime * 1000));
        await fetchData();
      } else {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataRepo();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const snapshot = await db.collection('posts').where('usernames', '==', username).onSnapshot(snapshot => {
    //         // console.log(snapshot.docs.map(doc => doc.data()))
    //         setPost(snapshot.docs.map((doc)=>{
    //             return {id: doc.id, data: doc.data()}
    //         }));
    //     });

    //     if (snapshot.empty) {
    //       console.log('No matching documents.');
    //       return;
    //     }

    //     // Assuming username is unique, so there should be only one document
    //     // const user = snapshot.docs[0].data();
    //     // console.log(user);
    //     // setPost(user);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };

    // fetchData();
    db.collection("posts")
      .where("usernames", "==", username)
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map(doc => doc.data()))
        setPost(
          snapshot.docs.map((doc) => {
            return { id: doc.id, data: doc.data() };
          })
        );
      });
  }, [username]);

  const fetchDataRepo = async () => {
    try {
      const accessToken = "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";
      const endpoint = `https://api.github.com/users/${username}/repos`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return setRepo(data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const resetTime = parseInt(
          error.response.headers["x-ratelimit-reset"],
          10
        );
        const currentTime = Math.floor(Date.now() / 1000);
        const sleepTime = resetTime - currentTime;
        console.log(`Rate limit exceeded. Sleeping for ${sleepTime} seconds.`);
        await new Promise((resolve) => setTimeout(resolve, sleepTime * 1000));
        await fetchDataRepo();
      } else {
        console.log(error.message);
      }
    }
  };
  let link = `${userData.blog}`;
  if (link.substring(0, 8) !== "https://") {
    link = "https://" + link;
  }
  return (
    <>
      <div className="flex flex-col md:justify-center md:flex-row bg-[#1B2430] font-inter h-auto min-h-screen bg-cover md:px-40">
        <Sidebar />
        <div className="bg-black font-manrope tracking-wide bg-opacity-20 w-full h-full min-h-screen md:w-4/6 md:rounded-2xl p-5 md:mt-3 mx-auto md:mx-0 md:ml-56 text-slate-100">
          {userData.name ? (
            <h1 className="text-2xl font-semibold border-b-2 rounded border-pink-500 w-6/12 flex justify-center">
              {`Profile of ${userData.name}`}
            </h1>
          ) : (
            ""
          )}
          {loading ? (
            <div className="w-full flex justify-center items-center animate-spin h-screen">
              <VscLoading className="w-8 h-8" />
            </div>
          ) : (
            <>
              <div className="flex flex-col mt-8">
                <div className="flex items-start justify-around">
                  <div className="w-3/6 md:w-2/6 flex flex-col justify-center items-center">
                    <img
                      src={userData.avatar_url}
                      alt="Avatar not available."
                      className="w-40 h-40 rounded-full m-6"
                    />
                    <button
                      //   onClick={githubSignout}
                      className="bg-pink-700 bg-opacity-80 text-white-400 hover:bg-opacity-100 p-3 rounded-lg w-3/6 m-auto hidden md:block"
                    >
                      Follow{" "}
                    </button>
                  </div>
                  <div className="flex flex-col ml-8 md:ml-20 w-4/6">
                    <div className="flex flex-col w-4/5 justify-between mt-7">
                      <div
                        key={userData.id}
                        className="tracking-wider text-2xl font-semibold "
                      >
                        {userData.name}
                      </div>

                      <div className="italic tracking-wide flex mt-1">
                        (@
                        <a
                          href={`https://github.com/${userData.login}`}
                          className=""
                        >
                          {userData.login}
                        </a>
                        )
                      </div>
                      <button
                        // onClick={githubSignout}
                        className="bg-black bg-opacity-50 hover:bg-opacity-100 text-purple-500 p-2  mt-4 rounded-lg w-3/5 block md:hidden"
                      >
                        Log Out{" "}
                      </button>
                    </div>
                    <div className="md:flex flex-wrap items-center mt-6 hidden">
                      <div className="">
                        Repositories: {userData.public_repos}
                      </div>
                      <div className="m-1.5">
                        <span className="mx-2">
                          Followers: {userData.followers}
                        </span>{" "}
                      </div>
                      <div className="m-1.5">
                        <span className="mx-2">
                          Following: {userData.following}
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      {userData.blog && (
                        <div className="flex">
                          Website:{" "}
                          <a
                            href={link}
                            className="ml-1 text-blue-400"
                            target="_blank"
                          >
                            {userData.blog}
                          </a>
                        </div>
                      )}
                      {userData.company && (
                        <div className="flex">Company: {userData.company}</div>
                      )}
                      {userData.bio && (
                        <div className="flex mt-1">Bio: {userData.bio}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-4 md:hidden md:text-lg">
                  {userData.blog && (
                    <div className="flex">
                      <FiLink className="m-1" />
                      <a
                        href={link}
                        className="ml-1 text-blue-400"
                        target="_blank"
                      >
                        {userData.blog}
                      </a>
                    </div>
                  )}
                  {userData.company && (
                    <div className="flex">Company: {userData.company}</div>
                  )}
                  {userData.bio && (
                    <div className="flex mt-2">{userData.bio}</div>
                  )}
                </div>
              </div>
              <div className="flex mt-6 text-center md:hidden">
                <div className="w-1/3 px-3 py-4 bg-black bg-opacity-50 rounded-l-lg">
                  Repos: {userData.public_repos}
                </div>
                <span className="w-1/3 px-3 py-4 border-x-[1px] border-slate-600 bg-black bg-opacity-50">
                  Followers: {userData.followers}
                </span>{" "}
                <span className="w-1/3 px-3 py-4 bg-black bg-opacity-50 rounded-r-lg">
                  Following: {userData.following}
                </span>
              </div>
              <div className="mt-4 md:mt-20 mb-6 h-[1px] bg-slate-600 md:w-5/6 mx-auto"></div>
              <Github username={username} />
              <div className="mt-4 md:mt-10 h-[1px] bg-slate-600 md:w-5/6 mx-auto"></div>
              <div className="flex w-full md:w-4/5 mx-auto justify-around md:mt-3">
                <div
                  className={`flex items-center p-2 cursor-pointer hover:text-slate-300 ${
                    content === "post" && "border-b-[1px] border-white"
                  }`}
                  onClick={() => setContent("post")}
                >
                  <MdGridOn className="text-2xl md:text-lg md:mx-2 md:mt-0 mt-2.5" />
                  <span className="hidden md:block">Posts</span>
                </div>
                <div
                  className={`flex items-center p-2 cursor-pointer hover:text-slate-300 ${
                    content === "repo" && "border-b-[1px] border-white"
                  }`}
                  onClick={() => setContent("repo")}
                >
                  <BsFolder2Open className="text-2xl md:text-lg md:mx-2 md:mt-0 mt-2.5" />
                  <span className="hidden md:block">Repositories </span>
                </div>
              </div>
              {(content === "post" && post.length) !== 0 ? (
                ""
              ) : (
                <>
                  <div className="mt-10 text-center text-2xl text-bold text-pink-500">
                    You have not created any post yet.
                  </div>
                </>
              )}
              {content === "post"
                ? post.map(
                    ({
                      id,
                      data: {
                        logo,
                        name,
                        username,
                        bio,
                        like,
                        likedBy,
                        commentCnt,
                        commentObj,
                        description,
                      },
                    }) => {
                      return (
                        <Post
                          key={id}
                          logo={logo}
                          name={name}
                          username={username}
                          like={like}
                          likedBy={likedBy}
                          commentCnt={commentCnt}
                          commentObj={commentObj}
                          bio={bio}
                          description={description}
                        />
                      );
                    }
                  )
                : repo.map((repos) =>
                    repos.fork ? (
                      ""
                    ) : (
                      <RepoInfo
                        key={repos.id}
                        name={repos.name}
                        desc={repos.description}
                        url={repos.html_url}
                        star_count={repos.stargazers_count}
                        forks_count={repos.forks_count}
                        language={repos.language}
                        clone_url={repos.clone_url}
                      />
                    )
                  )}
              <div className="mt-10"></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
