import * as React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './MyReads/Home/Home';
import SearchPage from './MyReads/Search/Search';

ReactDOM.render((
    <div>
      <BrowserRouter >
        <Switch>
          <Route path={'/'} exact component={HomePage} />
          <Route path={'/search'}  component={SearchPage} />
        </Switch>
      </BrowserRouter>
    </div>
  ), document.getElementById('root'))

