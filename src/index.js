import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainPage from './Components/MainPage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<MainPage />, document.getElementById('root'));

serviceWorker.unregister();
