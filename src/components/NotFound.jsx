// import { Link } from "react-router-dom";
import React from 'react';
import { useTranslation } from 'react-i18next';
import notFound from '../images/notFound.svg';

const imgStyle = {
  width: '250px',
  height: '250px',
};

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" style={imgStyle} className="img-fluid" src={notFound} />
      <h1 className="h4 text-muted">{t('labels.pageNotFound')}</h1>
      <p className="text-muted">
        {t('labels.butYouCanGo')}
        {' '}
        <a href="/">{t('labels.onTheMainPage')}</a>
      </p>
    </div>
  );
}

export default NotFound;
