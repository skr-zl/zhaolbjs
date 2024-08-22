import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
	const { mocker } = require('./mocks/browser')
	mocker.start({
	  // 对于没有 mock 的接口直接通过，避免异常
	  onUnhandledRequest: 'bypass',
	})
  }

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
