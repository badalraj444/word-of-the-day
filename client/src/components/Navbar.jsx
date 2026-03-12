import { Link } from "react-router-dom";

import React from 'react'



const Navbar = () => {
  return (
    <nav className="nav-container">
        <Link to="/" className="nav-items">Home</Link>
        <Link to="/add-word" className="nav-items">Add Word</Link>
    </nav>
  );
}

export default Navbar;