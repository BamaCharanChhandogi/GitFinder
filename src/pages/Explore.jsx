import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaArrowDown } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import SearchProfile from "../Components/explore/SearchProfile";
import RepoInfo from "../Components/RepoInfo";
import Github from "../Components/Github";

function Explore() {
  const [searchIp, setSearchIp] = useState("");
  const [user, setUser] = useState(null);
  const [repo, setRepo] = useState([]);
  const [repoLoad, setRepoLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchIp.trim() === "") {
      alert("Please enter a username");
      return;
    }
    fetchData();
    fetchRepo();
    setSearchIp("");
  };

  const fetchData = async () => {
    try {
      const trimmed = searchIp.trim();
      const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
      const endpoint = `https://api.github.com/users/${trimmed}`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("User not found. Please check the username.");
      }

      const data = await response.json();
      setUser(data);
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.log(error);
      setUser(null); // Reset user state on error
      setErrorMessage(error.message); // Set error message
    }
  };

  const fetchRepo = async () => {
    setRepo([]);
    try {
      const trimmed = searchIp.trim();
      const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
      const endpoint = `https://api.github.com/users/${trimmed}/repos`;
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to fetch repositories.");
      }

      const data = await response.json();
      setRepo(data);
    } catch (error) {
    //  console.log(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div className="w-full font-manrope tracking-wide flex flex-row bg-[#1B2430] min-h-screen bg-cover md:justify-end">
        <Sidebar />
        <div className="w-full flex md:w-5/6 justify-center">
          <div className="md:w-4/6 w-full md:ml-20 mx-2 h-auto bg-black bg-opacity-20 backdrop-blur-lg rounded-2xl flex flex-col my-3 p-6">
            <form
              onSubmit={handleSearch}
              className="flex justify-center w-full md:mt-10"
            >
              <input
                className="h-12 w-full md:w-3/5 m-1 p-2 md:p-3 rounded-xl bg-blue-400 bg-opacity-10 text-slate-50"
                placeholder="Find your peers here..."
                value={searchIp}
                onChange={(e) => setSearchIp(e.target.value)}
              />
              <button type="submit">
                <BiSearchAlt className="m-3 w-8 h-8 text-white hover:text-blue-200" />
              </button>
            </form>
            {errorMessage && (
              <div className="text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}
            {!user && !errorMessage && (
              <div className="flex justify-center mt-5">
                <img
                  src="https://media.giphy.com/media/4Zd5CCT47enl32Sx3P/giphy.gif"
                  className="rounded-lg w-4/6"
                  alt=""
                />
              </div>
            )}
            {user && (
              <>
                <SearchProfile
                  avatar={user.avatar_url}
                  id={user.id}
                  name={user.name}
                  login={user.login}
                  blog={user.blog}
                  company={user.company}
                  email={user.email}
                  location={user.location}
                  bio={user.bio}
                  twitter_username={user.twitter_username}
                  public_repos={user.public_repos}
                  followers={user.followers}
                  following={user.following}
                />
                <div className="text-white py-2 mb-8">
                  <Github username={user.login} name={user.name} />
                </div>
              </>
            )}
            {user && (
              <>
                <div className="border-[1px] border-slate-500 w-[96%] mx-auto"></div>
                <div onClick={() => setRepoLoad(!repoLoad)}>
                  <FaArrowDown className="ml-auto text-2xl mt-[-3px] text-slate-500 cursor-pointer" />
                </div>
              </>
            )}
            {repo.map((repos) =>
              !repoLoad || repos.fork ? null : (
                <div key={repos.id} className="transition-transform">
                  <RepoInfo
                    name={repos.name}
                    desc={repos.description}
                    url={repos.html_url}
                    star_count={repos.stargazers_count}
                    forks_count={repos.forks_count}
                    language={repos.language}
                    clone_url={repos.clone_url}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
