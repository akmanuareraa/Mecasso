import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MoralisProvider } from "react-moralis";
import App from './App';
import './index.css';
import './App.css';
import 'bulma/css/bulma.min.css';

ReactDOM.render(
  <BrowserRouter>
    <MoralisProvider appId="xWMMw7O10ad5vcQ20IyXdznO5ScjxbhSWLyC8g4l" serverUrl="https://wmxprjztwjxf.usemoralis.com:2053/server">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);

