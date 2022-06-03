import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
  const { toLogOut, isAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();
  const clickButton = () => {
    toLogOut();
    navigate('/');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        { isAuthorized() && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={clickButton}
        >
          Выйти
        </button>
        ) }
      </div>
    </nav>
  );
}

export default Navbar;
