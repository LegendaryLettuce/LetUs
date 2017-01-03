import { AppContainer } from 'react-hot-loader';
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

const routes = {
  path: '/',
  component: Hello,
  // childRoutes: [
  //   { path: '/about', component: About },
  //   {
  //       path: '/posts',
  //       component: Posts,
  //       childRoutes: [ { path: '/post/:nr', component: Post } ]
  //   },
    // { path: '*', component: NoMatch}
  // ]
};

render(
  <AppContainer>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept(
    () => {
      render(
        <AppContainer>
          <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
          </Provider>
        </AppContainer>,
        document.getElementById('app'),
      );
    },
  );
}
