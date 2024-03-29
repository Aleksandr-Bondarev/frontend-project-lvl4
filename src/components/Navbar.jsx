import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
  const { logOut, isAuthorized } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('labels.hexletChatName')}</a>
        { isAuthorized() && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={logOut}
        >
          {t('labels.toLogOut')}
        </button>
        ) }
      </div>
    </nav>
  );
}

export default Navbar;
