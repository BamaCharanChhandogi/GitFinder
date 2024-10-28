import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { MdGridOn } from "react-icons/md";
import { BsFolder2Open } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import RepoInfo from "../Components/RepoInfo";
import Post from "../Components/post/Post";
import db from "../firebase"; // Ensure you have the correct import for your Firebase configuration
import { FiLink } from "react-icons/fi";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [repo, setRepo] = useState([]);
  const [content, setContent] = useState("repo");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  const cookie = document.cookie.split("=")[1]; // Extracting the GitHub username from cookies

  // Function to sign out from GitHub
  const githubSignout = async () => {
    document.cookie = "";
    try {
      await firebase.auth().signOut();
      console.log("Signout successful!");
      navigate("/");
    } catch (error) {
      console.error("Signout failed", error);
    }
  };

  // Function to handle GitHub sign-in
  const githubSignIn = async () => {
    const provider = new firebase.auth.GithubAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;

      console.log("GitHub sign-in successful:", user);
      document.cookie = `username=${user.displayName}`; // Set the GitHub username in cookies
      await fetchData();
      await fetchDataRepo();
    } catch (error) {
      console.error("Error signing in with GitHub:", error.message);
    }
  };

  // Function to fetch user data from GitHub
  const fetchData = async () => {
    try {
      const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
      const endpoint = `https://api.github.com/users/${cookie}`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  // Function to fetch user repositories from GitHub
  const fetchDataRepo = async () => {
    try {
      const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
      const endpoint = `https://api.github.com/users/${cookie}/repos`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      // Ensure that data is an array before setting it
      if (Array.isArray(data)) {
        setRepo(data);
      } else {
        console.error("Expected an array, but got:", data);
        setRepo([]); // Reset repo to an empty array if data is not valid
      }
    } catch (error) {
      console.error("Error fetching repositories:", error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchDataRepo();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .where("usernames", "==", cookie)
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          setPost(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );

    return () => unsubscribe();
  }, [cookie]);

  const onDeletePost = (postId) => {
    console.log("Deleting post with id:", postId);
    setPost((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  let link = userData.blog || "";
  if (link && link.substring(0, 8) !== "https://") {
    link = "https://" + link;
  }

  return (
    <div className="flex flex-col md:justify-center md:flex-row bg-[#1B2430] font-inter h-auto min-h-screen bg-cover md:px-40">
      <Sidebar />
      <div className="bg-black font-manrope tracking-wide bg-opacity-20 w-full h-full min-h-screen md:w-4/6 md:rounded-2xl p-5 md:mt-3 mx-auto md:mx-0 md:ml-56 text-slate-100">
        <h1 className="text-2xl font-semibold w-3/12 flex justify-center">
          Profile
        </h1>
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
                    onClick={githubSignout}
                    className="bg-red-600 bg-opacity-80 text-white-400 hover:bg-opacity-100 hover:text-purple-500 p-3 rounded-lg w-4/6 m-auto hidden md:block"
                  >
                    Log Out
                  </button>
                  <button
                    onClick={githubSignIn}
                    className="bg-blue-600 bg-opacity-80 text-white-400 hover:bg-opacity-100 hover:text-purple-500 p-3 rounded-lg w-4/6 m-auto mt-3"
                  >
                    Change GitHub Account
                  </button>
                </div>
                <div className="flex flex-col ml-8 md:ml-20 w-4/6">
                  <div className="flex flex-col w-4/5 justify-between mt-7">
                    <div className="tracking-wider text-2xl font-semibold ">
                      {userData.name}
                    </div>
                    <div className="italic tracking-wide flex mt-1">
                      (@
                      <a href={`https://github.com/${userData.login}`}>
                        {userData.login}
                      </a>
                      )
                    </div>
                    <button
                      onClick={githubSignout}
                      className="bg-black bg-opacity-50 hover:bg-opacity-100 text-purple-500 p-2 mt-4 rounded-lg w-3/5 block md:hidden"
                    >
                      Log Out
                    </button>
                  </div>
                  <div className="md:flex flex-wrap items-center mt-6 hidden">
                    <div>Repositories: {userData.public_repos}</div>
                    <div className="m-1.5">
                      <span className="mx-2">
                        Followers: {userData.followers}
                      </span>
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
                          rel="noopener noreferrer"
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
                      rel="noopener noreferrer"
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
            <div className="flex mt-6">
              <button
                onClick={() => setContent("repo")}
                className={`w-1/2 text-xl font-semibold ${
                  content === "repo" ? "bg-gray-800" : "bg-gray-600"
                } p-3 rounded-l-lg`}
              >
                Repositories
              </button>
              <button
                onClick={() => setContent("post")}
                className={`w-1/2 text-xl font-semibold ${
                  content === "post" ? "bg-gray-800" : "bg-gray-600"
                } p-3 rounded-r-lg`}
              >
                Posts
              </button>
            </div>
            <div className="mt-4 mb-6">
              {content === "repo" ? (
                repo.length ? (
                  <div className="grid md:grid-cols-2 gap-5">
                    {repo.map((item) => (
                      <RepoInfo key={item.id} repoData={item} />
                    ))}
                  </div>
                ) : (
                  <p>No repositories found.</p>
                )
              ) : post.length ? (
                <div>
                  {post.map(({ id, data }) => (
                    <Post
                      key={id}
                      postData={data}
                      onDeletePost={onDeletePost}
                    />
                  ))}
                </div>
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
