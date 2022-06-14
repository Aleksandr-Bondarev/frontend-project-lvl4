/* eslint jsx-a11y/label-has-associated-control: [0] */
/* eslint jsx-a11y/no-autofocus: [0] */

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import signUp from '../images/signUp.jpeg';
import { AuthContext } from '../context/AuthContext.jsx';

const handleConflict = () => {
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const confirmInput = document.querySelector('#confirmPassword');

  usernameInput.classList.add('is-invalid');
  passwordInput.classList.add('is-invalid');
  confirmInput.classList.add('is-invalid');

  const container = document.getElementById('confirmPassword').parentNode;

  const tooltipConfirm = document.createElement('div');
  tooltipConfirm.classList.add('invalid-tooltip');
  tooltipConfirm.textContent = 'Такой пользователь уже существует';

  container.appendChild(tooltipConfirm);
};

function SignUp() {
  const { toLogIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: yup.object({
      username: yup.string()
        .required(t('errors.isRequired'))
        .min(3, t('errors.lengthFromThreeToTwenty'))
        .max(20, t('errors.lengthFromThreeToTwenty')),
      password: yup.string()
        .required(t('errors.isRequired'))
        .min(6, t('errors.lessThanSixSymbols')),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], t('errors.passwordsDoNotMatch'))
        .required(t('errors.isRequired')),
    }),

    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post('api/v1/signup', {
          username,
          password,
        });
        toLogIn(response.data);
        navigate('/');
      } catch (e) {
        if (e.response.data.message === 'Conflict') {
          handleConflict();
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signUp} className="rounded-circle" alt="Регистрация" />
              </div>
              <form
                className="w-50"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(formik.values);
                }}
              >
                <h1 className="text-center mb-4">{t('labels.registration')}</h1>
                <div className="form-floating mb-3">
                  <input
                    autoFocus
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className={classNames('form-control', { 'is-invalid': (formik.errors.username && formik.touched.username) })}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <div className="invalid-tooltip" id="tooltipUsername">{formik.errors.username}</div>
                  ) : null}
                  <label className="form-label" htmlFor="username">{t('labels.userName')}</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className={classNames('form-control', { 'is-invalid': (formik.errors.password && formik.touched.password) })}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="invalid-tooltip" id="tooltipPassword">{formik.errors.password}</div>
                  ) : null}
                  <label className="form-label" htmlFor="password">{t('labels.password')}</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    name="confirmPassword"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className={classNames('form-control', { 'is-invalid': (formik.errors.confirmPassword && formik.touched.confirmPassword) })}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                    <div className="invalid-tooltip" id="tooltipConfirmPassword">{formik.errors.confirmPassword}</div>
                  ) : null}
                  <label className="form-label" htmlFor="confirmPassword">{t('labels.confirmPassword')}</label>
                </div>
                <button type="submit" className="w-100 btn btn-outline-primary">{t('labels.toSignUp')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
