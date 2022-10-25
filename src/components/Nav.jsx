import { useState, useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
function Nav() {
  const [show, setShow] = useState(false);
  const history = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history("/")}
          className="nav__logo"
          src="./netflix_logo_transparent.png"
          alt="netflix logo"
        />
        <img
          onClick={() => history("/profile")}
          className="nav__avatar"
          src="./netflix_avatar_logo.png"
          alt="profile avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
