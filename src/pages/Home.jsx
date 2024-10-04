import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import db, { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import CreatePost from "../Components/post/CreatePost";
import Post from "../Components/post/Post";

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cookie = document.cookie;
  const fetchData = async () => {
    const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
    const endpoint = `https://api.github.com/users/${cookie}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return setUserData(data);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData();
        db.collection("posts")
          .orderBy("timestamp", "desc")
          .onSnapshot(
            (snapshot) => {
              setPost(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              );
            },
            (error) => {
              console.error("Error fetching posts:", error);
            }
          );
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!cookie) {
      navigate("/login");
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex gap-64 flex-col justify-center md:flex-row bg-[#1B2430] h-auto min-h-screen md:px-40">
        <div>
          <Sidebar />
        </div>
        <div className="md:w-7/12 m-3 ml-0 md:m-3 text-white px-4 py-1 rounded-2xl md:ml-14">
          <CreatePost
            avatar={userData.avatar_url}
            login={userData.login}
            name={userData.name}
            bio={userData.bio}
          />
          {loading ? (
            <div className="w-full flex justify-center items-center animate-spin h-96">
              <VscLoading className="w-8 h-8" />
            </div>
          ) : (
            post.map(
              ({
                id,
                data: {
                  logo,
                  name,
                  usernames,
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
                    id={id}
                    logo={logo}
                    name={name}
                    username={usernames}
                    like={like}
                    likedBy={likedBy}
                    commentCnt={commentCnt}
                    commentObj={commentObj}
                    bio={bio}
                    description={description}
                    width={"full"}
                  />
                );
              }
            )
          )}

          {/* Add Follow on GitHub button below the posts */}
          <a
            href="https://github.com/BamaCharanChhandogi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-lg mt-6 shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Follow on GitHub
          </a>
        </div>
      </div>
    </>
  );
}
