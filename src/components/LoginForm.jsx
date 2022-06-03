/* eslint no-unused-vars: [0] */
/* eslint jsx-a11y/label-has-associated-control: [0] */

import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import AuthContext from '../context/AuthContext.jsx';

function LoginForm() {
  const validation = yup.object().shape({
    username: yup.string().required('Required'),
    password: yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post('http://localhost:5000/api/v1/login', values);
        console.log('response', response);
      } catch {
        const usernameInput = document.querySelector('#username');
        const passwordInput = document.querySelector('#password');
        usernameInput.classList.add('is-invalid');
        passwordInput.classList.add('is-invalid');

        const errorMessage = document.createElement('div');
        errorMessage.classList.add('invalid-tooltip');
        errorMessage.textContent = 'Неверные имя пользователя или пароль';

        const errorContainer = document.querySelector('.form-floating.mb-4');
        errorContainer.append(errorMessage);
      }
    },
  });

  // console.log(AuthContext);

  return (
    <form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(formik.values);
      }}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label className="form-label" htmlFor="password">
          Пароль
        </label>
        {!formik.isValid && (
        <div className="invalid-tooltip">
          Неверные имя пользователя или пароль
        </div>
        )}
      </div>
      <button
        type="submit"
        className="w-100 mb-3 btn btn-outline-primary"
      >
        Войти
      </button>
    </form>
  );
}

export default LoginForm;
