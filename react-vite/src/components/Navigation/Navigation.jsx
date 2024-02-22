import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
      <>
      <div id='nav-container'>
      <div id='fumblr-logo'>
        <NavLink className='title'to="/">fumblr</NavLink>
      </div>
      <div>
        <ProfileButton />
      </div>

      </div>
      <div>
      <NavLink to="https://github.com/vknguyenn/fumblr" target="_blank" className='fa-brands fa-github'></NavLink>
      </div>
      </>
      
 
  );
}

export default Navigation;
