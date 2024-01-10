import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Blog from "./pages/Blog";
import Navbar from "./Components/Landing/Navbar";

export default function App() {
  let githubUsername;

  function authenticateUser() {
    auth
      .signInWithPopup(provider)
      .then((userAuth) => {
        githubUsername = userAuth.additionalUserInfo.username;
        document.cookie = githubUsername;
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  }

  return (
   <div>
     <Router>
      <Routes>
        <Route
          path="/"
          element={<Navbar authenticateUser={authenticateUser} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
   </div>
  );
}
