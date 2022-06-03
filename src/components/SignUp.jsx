/* eslint jsx-a11y/label-has-associated-control: [0] */

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import signUp from '../images/signUp.jpeg';
import { AuthContext } from '../context/AuthContext.jsx';

function SignUp() {
  const { toLogIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: yup.object({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    }),

    onSubmit: async ({ username, password }) => {
      // console.log({ username, password });
      // console.log('first logging');
      try {
        console.log('pre post logging');
        const response = await axios.post('api/v1/signup', {
          username,
          password,
        });
        toLogIn(response.data);
        // console.log(response);
        // console.log('log in try');
        // console.log(response.data.token)
        navigate('/');
      } catch (e) {
        // console.log(e);
        // console.log(e.response.data.message)
        if (e.response.data.message === 'Conflict') {
          const usernameInput = document.querySelector('#username');
          const passwordInput = document.querySelector('#password');
          const confirmInput = document.querySelector('#confirmPassword');

          usernameInput.classList.add('is-invalid');
          passwordInput.classList.add('is-invalid');
          confirmInput.classList.add('is-invalid');

          const tooltipConfirm = document.querySelector('#tooltipConfirmPassword');

          tooltipConfirm.textContent = 'Такой пользователь уже существует';
        }
        // navigate('/login');
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
                <h1 className="text-center mb-4">Регистрация</h1>
                <div className="form-floating mb-3">
                  <input
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className="form-control"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <div className="invalid-tooltip" id="tooltipUsername" />
                  <label className="form-label" htmlFor="username">Имя пользователя</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className="form-control"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <div className="invalid-tooltip" id="tooltipPassword" />
                  <label className="form-label" htmlFor="password">Пароль</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <div className="invalid-tooltip" id="tooltipConfirmPassword" />
                  <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                </div>
                <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
