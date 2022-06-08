// @ts-check
import { io } from 'socket.io-client';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import app from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const body = document.querySelector('body');
body.classList.add('bg-light');

document.body.children[0].classList.remove('p-3');
document.body.children[0].classList.remove('container-lg');

const initApp = () => {
  const socket = io();
  console.log(socket);
  app(socket);
};

initApp();

console.log('it works!');
