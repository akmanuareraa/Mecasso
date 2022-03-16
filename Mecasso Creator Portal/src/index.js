import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '.././node_modules/bulma-start/css/main.css';
import './App.css';
import { MoralisProvider } from "react-moralis";
//import { initFacebookSdk} from './FBhelper.js';

// wait for facebook sdk before startup
//initFacebookSdk().then(startApp);


//console.log("Reached here FB")    
//ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render( 
    <MoralisProvider appId="xWMMw7O10ad5vcQ20IyXdznO5ScjxbhSWLyC8g4l" serverUrl="https://wmxprjztwjxf.usemoralis.co
m:2053/server">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MoralisProvider>,
  document.getElementById("root"),
);

