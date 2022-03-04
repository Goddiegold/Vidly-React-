import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const NavBar = ({user}) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <b>Vidly</b>
        </Link>

        {user?.name ? (
          <>
            <br />
            <Link to="/customers" className='navbar-brand'> Welcome, {user.name} 🙂.</Link>
          </>
        ) : (
          ""
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/rentals" className=" nav-link">
                Rentals
              </NavLink>
            </li>
            {!user?.name ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/customers" className="nav-link">
                    Customers
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
}
 
export default NavBar;