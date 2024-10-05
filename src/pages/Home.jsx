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
                snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
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

          {/* GitHub Follow Button */}
          <div className="mt-5 flex justify-center">
            <a
              href="https://github.com/BamaCharanChhandogi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full flex items-center transition duration-300"
              style={{ boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.173c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.774.419-1.305.762-1.605-2.665-.306-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.305-.536-1.53.117-3.183 0 0 1.008-.322 3.301 1.23a11.47 11.47 0 0 1 3.003-.404c1.018.005 2.043.137 3.002.404 2.293-1.552 3.299-1.23 3.299-1.23.654 1.653.242 2.878.118 3.183.769.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.62-5.475 5.921.43.37.814 1.102.814 2.222v3.293c0 .322.218.694.824.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Follow on GitHub
            </a>
          </div>

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
        </div>
      </div>
    </>
  );
}
