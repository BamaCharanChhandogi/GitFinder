import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Message from "./pages/Message";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  let githubUsername;
  const navigate = useNavigate();
  //delete document.cookie
  function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  if (document.cookie.length > 19) {
    delete_cookie("_xsrf");
  }
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
