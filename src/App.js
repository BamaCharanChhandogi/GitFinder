import React, { useEffect } from "react";
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

// Import the ScrollToTopButton component
import ScrollToTopButton from './ScrollToTopButton'; // adjust the path if needed

export default function App() {
  const navigate = useNavigate();

  function authenticateUser() {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        const githubUsername = userAuth.additionalUserInfo.username;
        document.cookie = githubUsername;
        navigate("/home");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  }

  return (
    <div>
      {/* Include the Routes */}
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
      </Routes>

      {/* ScrollToTopButton component is added here */}
      <ScrollToTopButton />
    </div>
  );
}
