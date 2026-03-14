import { Link } from "react-router-dom";
import formattedDate from "../lib/formattedDate";



const Navbar = () => {
  const today = formattedDate();
  return (
    <nav className="nav-container">
        {/* <h1 className="date">14/03/2026</h1> */}
        <h1 className="date">{today}</h1>
        <Link to="/" className="nav-items">Home</Link>
        <Link to="/" className="nav-items">Jump to a day...</Link>
        <Link to="/add-word" className="nav-items">Add Word</Link>
    </nav>
  );
}

export default Navbar;