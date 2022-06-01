/* eslint no-unused-vars: [0] */
/* eslint jsx-a11y/label-has-associated-control: [0] */

import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

function LoginForm() {
  const validation = yup.object().shape({
    username: yup.number().required('Required'),
    password: yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validateOnBlur
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={validation}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <form className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <input
              name="username"
              autoComplete="username"
              required=""
              placeholder="Ваш ник"
              id="username"
              className="form-control"
              defaultValue=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
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
              defaultValue=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            {!isValid && (
              <div className="invalid-tooltip">
                Неверные имя пользователя или пароль
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-100 mb-3 btn btn-outline-primary"
            onClick={handleSubmit}
          >
            Войти
          </button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
