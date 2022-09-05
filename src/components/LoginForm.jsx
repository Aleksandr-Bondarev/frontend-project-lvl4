/* eslint functional/no-let: [0] */

import React, { useContext, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { AuthContext } from '../context/AuthContext.jsx';

function LoginForm() {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const rollbar = useRollbar();
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const errorContainer = useRef(null);
  const [authState, setAuthState] = useState('initial');

  const validation = yup.object().shape({
    username: yup.string().required('errors.loginErrors'),
    password: yup.string().required('errors.loginErrors'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/v1/login', values);
        login(response.data);
      } catch (e) {
        if (e.response.data.statusCode === 401) {
          setAuthState(false);
          rollbar.error(e);
        } else {
          let status;

          setTimeout(() => {
            if (status !== 200) {
              toast.error(t('errors.connectionFailed'));
            }
          }, 2000);

          status = e.response.status;

          rollbar.error(e);
        }
      }
    },
  });

  return (
    <form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(formik.values);
      }}
    >
      <h1 className="text-center mb-4">{t('labels.toLogIn')}</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          ref={usernameInput}
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          className={classNames('form-control', { 'is-invalid': (!authState) })}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">{t('labels.yourNickname')}</label>
      </div>
      <div ref={errorContainer} className="form-floating mb-4">
        <input
          name="password"
          ref={passwordInput}
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          className={classNames('form-control', { 'is-invalid': (!authState) })}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label className="form-label" htmlFor="password">
          {t('labels.password')}
        </label>
        {!authState
        && <div className="invalid-tooltip">{t('errors.loginErrors')}</div>}
      </div>
      <button
        type="submit"
        className="w-100 mb-3 btn btn-outline-primary"
      >
        {t('labels.toLogIn')}
      </button>
    </form>
  );
}

export default LoginForm;
