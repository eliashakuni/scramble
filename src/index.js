import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Scramble from './Scramble.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Scramble />, document.getElementById('root'));
serviceWorker.register();