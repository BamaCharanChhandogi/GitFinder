import Navbar from "../Components/Landing/Navbar";
import "../App.css";
import Footer from "../Components/Landing/Footer";
import Hero from "../Components/Landing/Hero";
import { useEffect } from "react";

export default function Landing(props) {
  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);
  return (
    <>
      <div className="bg-[#1B2430] font-inter min-h-screen bg-cover">
        <Navbar authenticateUser={props.authenticateUser} />
        <Hero authenticateUser={props.authenticateUser} />
        <Footer />
      </div>
    </>
  );
}
