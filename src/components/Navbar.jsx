import React from 'react';
// <button type="button" className="btn btn-primary">Выйти</button>
function Navbar() {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
      </div>
    </nav>
  );
}

export default Navbar;
