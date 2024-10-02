import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Example state for authentication

  function authenticateUser() {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        const githubUsername = userAuth.additionalUserInfo.username;
        document.cookie = githubUsername;
        setIsAuthenticated(true); // Set authenticated state
        navigate("/home");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  }

  const Explore = () => {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = () => {
      if (!/^[a-zA-Z0-9-]+$/.test(username)) {
        setErrorMessage("No user found. Please check the username.");
        return;
      }
      setErrorMessage(''); // Clear previous errors
      // Execute search...
    };

    return (
      <div>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Search for a user" 
        />
        <button onClick={handleSearch}>Search</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing authenticateUser={authenticateUser} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/blog" element={<BlogPost />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/chat" element={<UserList />} />
        <Route path="/chat/:conversationId" element={<Chat />} />
      </Routes>
    </div>
  );
}
