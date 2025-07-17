import React from 'react';

const Navbar = ({ registerHandler, loginHandler, logoutHandler, loggedIn }) => {
  return (
    <div className="navbar-section">
      <div className="company">
        Swiggy
      </div>
      <div className="userauth">
        {loggedIn ? (
          <button onClick={logoutHandler} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <button onClick={registerHandler} className="auth-button">
              Register
            </button>
            <button onClick={loginHandler} className="auth-button">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
