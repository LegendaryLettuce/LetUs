import React            from 'react';
import { render }       from 'react-dom';
import { Router, Route, browserHistory }  from 'react-router';
import injectTapEventPlugin               from 'react-tap-event-plugin';
// Redux
import { createStore }  from 'redux';
import { Provider }     from 'react-redux';
import { reducer }      from './redux/reducer';
// CSS
import '../../node_modules/onsenui/css/onsen-css-components-dark-theme.css';
// Views
import Hello            from './views/hello.jsx';

injectTapEventPlugin();

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Hello}/>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
