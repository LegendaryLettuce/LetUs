import { AppContainer } from 'react-hot-loader';
import React            from 'react';
import { render }       from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';
import injectTapEventPlugin       from 'react-tap-event-plugin';
// Redux
import { createStore }  from 'redux';
import { Provider }     from 'react-redux';
import { reducer }      from './redux/reducer';
// CSS
import '../../node_modules/onsenui/css/onsenui.css';
import '../../node_modules/onsenui/css/onsen-css-components-dark-theme.css';
// Views
import Create           from './views/plan/create.jsx';
import Collaborate      from './views/plan/collaborate.jsx';
import Invite           from './views/plan/invite.jsx';

injectTapEventPlugin();

const store = createStore(reducer);

const routes = {
  path: '/',
  component: Create,
  childRoutes: [
    { path: '/plan/create',       component: Create },
    { path: '/plan/collaborate',  component: Collaborate },
    { path: '/plan/invite',       component: Invite },
  //   { path: '/about', component: About },
  //   {
  //       path: '/posts',
  //       component: Posts,
  //       childRoutes: [ { path: '/post/:nr', component: Post } ]
  //   },
    // { path: '*', component: NoMatch}
  ],
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Create} />
      <Route path='/plan/invite' component={Invite} />
      <Route path='/plan/create' component={Create} />
      <Route path='/plan/collaborate' component={Collaborate} />
    </Router>
  </Provider>,
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
