import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import BlogPost from "./pages/BlogPage";
import Message from "./pages/Chat";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage";
import Chat from "./pages/Chat";
import UserList from "./pages/UserList";

export default function App() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigate("/home");
      }
    });

  // Clean up the subscription when the component unmounts
  return () => {
    unsubscribe();
  };
  }, [navigate]); //Included navigate as a dependency
  
  function authenticateUser() {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        const githubUsername = userAuth.additionalUserInfo.dispayname;
        document.cookie = `githubUsername=${githubUsername}`;
        navigate("/home");
      })
      .catch((error) => {
        setError("Error signing in: " + error.message); // Update error message
        console.log(error.code + error.message);
      });
  }

  const isValidGithubUsername = (username) => {
    // GitHub username validation: 
    const regex = /^(?!.*\.\.)(?!.*\.$)(?!.*__)(?!.*_-)[A-Za-z0-9._-]{1,39}$/;
    return regex.test(username);
  };

  const handleSearch = (username) => {
    // Check for invalid usernames based on GitHub rules
    if (!isValidGithubUsername(username.trim())) {
      setError("No such user, please provide a correct username.");
      return; // Exit the function if the username is invalid
    }
    const encodedUsername = encodeURIComponent(username.trim());
    navigate(`/profile/${encodedUsername}`);
  };
  
  return (
    <div>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <Routes>
        <Route
          path="/"
          element={<Landing authenticateUser={authenticateUser} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/blog" element={<BlogPost />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/chat" element={<UserList />} />
        <Route path="/chat/:conversationId" element={<Chat />} />
        {/* <Route
          path="/home"
          element={auth.currentUser ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={auth.currentUser ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/messages"
          element={auth.currentUser ? <Message /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={auth.currentUser ? <Notifications /> : <Navigate to="/" />}
        />
        <Route
          path="/explore"
          element={auth.currentUser ? <Explore /> : <Navigate to="/" />}
        />
        <Route
          path="/contact"
          element={auth.currentUser ? <Contact /> : <Navigate to="/" />}
        />
        <Route
          path="/about"
          element={auth.currentUser ? <About /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:username"
          element={auth.currentUser ? <ProfilePage /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </div>
  );
}
