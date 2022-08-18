import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
  const { logOut, isAuthorized } = useContext(AuthContext);
  const { t } = useTranslation();
  const clickButton = () => {
    logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('labels.hexletChatName')}</a>
        { isAuthorized() && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={clickButton}
        >
          {t('labels.toLogOut')}
        </button>
        ) }
      </div>
    </nav>
  );
}

export default Navbar;
