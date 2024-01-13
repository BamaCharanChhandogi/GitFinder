import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Message from "./pages/Message";
import { useEffect } from "react";

export default function App() {
  let githubUsername;
  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie) {
      navigate("/home");
    }
  });
  function authenticateUser() {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        githubUsername = userAuth.additionalUserInfo.username;
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
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}
