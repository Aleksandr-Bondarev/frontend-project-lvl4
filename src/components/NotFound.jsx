// import { Link } from "react-router-dom";
import React from 'react';
import notFound from '../images/notFound.svg';

const imgStyle = {
  width: '250px',
  height: '250px',
};

function NotFound() {
  return (
    <div className="text-center">
      <img alt="Страница не найдена" style={imgStyle} className="img-fluid" src={notFound} />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        <a href="/">на главную страницу</a>
      </p>
    </div>
  );
}

export default NotFound;
