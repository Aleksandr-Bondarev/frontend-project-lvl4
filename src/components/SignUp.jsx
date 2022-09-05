/* eslint jsx-a11y/label-has-associated-control: [0] */
/* eslint jsx-a11y/no-autofocus: [0] */
/* eslint functional/no-let: [0] */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import signUp from '../images/signUp.jpeg';
import { AuthContext } from '../context/AuthContext.jsx';

function SignUp() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [registrationState, setRegistrationState] = useState('initial');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: yup.object({
      username: yup.string()
        .required('errors.isRequired')
        .min(3, 'errors.lengthFromThreeToTwenty')
        .max(20, 'errors.lengthFromThreeToTwenty'),
      password: yup.string()
        .required('errors.isRequired')
        .min(6, 'errors.lessThanSixSymbols'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'errors.passwordsDoNotMatch')
        .required('errors.isRequired'),
    }),

    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post('api/v1/signup', {
          username,
          password,
        });
        login(response.data);
        navigate('/');
      } catch (e) {
        if (e.response.data.statusCode === 409) {
          setRegistrationState(false);
        } else {
          let status;

          setTimeout(() => {
            if (status !== 200) {
              toast.error(t('errors.connectionFailed'));
            }
          }, 2000);

          status = e.response.status;
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
                    className={classNames('form-control', { 'is-invalid': ((formik.errors.username && formik.touched.username) || !registrationState) })}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <div className="invalid-tooltip" id="tooltipUsername">{t(formik.errors.username)}</div>
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
                    className={classNames('form-control', { 'is-invalid': ((formik.errors.password && formik.touched.password) || !registrationState) })}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="invalid-tooltip" id="tooltipPassword">{t(formik.errors.password)}</div>
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
                    className={classNames('form-control', { 'is-invalid': ((formik.errors.confirmPassword && formik.touched.confirmPassword) || !registrationState) })}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                    <div className="invalid-tooltip" id="tooltipConfirmPassword">{t(formik.errors.confirmPassword)}</div>
                  ) : null}
                  <label className="form-label" htmlFor="confirmPassword">{t('labels.confirmPassword')}</label>
                  {!registrationState
                  && <div className="invalid-tooltip">{t('errors.userAlreadyExists')}</div>}
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
