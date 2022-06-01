// @ts-check

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

app();

console.log('it works!');
