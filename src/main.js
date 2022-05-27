import '@styles/style.css';
import '@styles/stylus.styl';
import '@styles/saas.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);