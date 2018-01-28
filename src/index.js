import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Route, Link} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={()=>'please go to /app'}/>
      <Route path="/app" component={App}/>
    </div>
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
