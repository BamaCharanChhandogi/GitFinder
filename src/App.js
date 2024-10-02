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

export default function App() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       navigate("/home");
  //     }
  //   });

  //   // Clean up the subscription when the component unmounts
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
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
