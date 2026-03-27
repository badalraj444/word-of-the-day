import { Link } from "react-router-dom";
import formattedDate from "../lib/formattedDate";



const Navbar = () => {
  const today = formattedDate();
  return (
    <nav className="nav-container">
      <h1 className="date">{today}</h1>

      <div style={{ display: 'flex', gap: '20px' }}> {/* Groups the links together */}
        <Link to="/">
          <div className="nav-items">
            <img className="icon" src="/home.png" alt="home" />
            <span>Home</span>
          </div>
        </Link>

        <Link to="/jump" onClick={(e) => { e.preventDefault() }} style={{ cursor: 'not-allowed' }}>
          <div className="nav-items disabled-link">
            <img className="icon" src="./back.png" alt="back" />
            <span>Jump to</span>
          </div>
        </Link>

        <Link to="/add-word">
          <div className="nav-items">
            <img className="icon" src="./plus.png" alt="plus" />
            <span>Add</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;