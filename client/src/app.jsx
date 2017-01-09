// import { AppContainer } from 'react-hot-loader';
import React            from 'react';
import { render }       from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
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
import Login            from './views/login/login.jsx';
import LiveList         from './views/plan/liveList.jsx';
import Event            from './views/event/event.jsx';
import Profile          from './views/profile/profile.jsx';

const store = createStore(reducer);

// const routes = {
//   path: '/',
//   component: Create,
//   childRoutes: [
//     { path: '/plan/create',       component: Create },
//     { path: '/plan/collaborate',  component: Collaborate },
//     { path: '/plan/invite',       component: Invite },
//   //   { path: '/about', component: About },
//   //   {
//   //       path: '/posts',
//   //       component: Posts,
//   //       childRoutes: [ { path: '/post/:nr', component: Post } ]
//   //   },
//     // { path: '*', component: NoMatch}
//   ],
// };

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Login}>
        <IndexRoute component={Login} />
      </Route>
      <Route>
        <Route path='invite' component={Invite} />
        <Route path='create' component={Create} />
        <Route path='collaborate' component={Collaborate} />
        <Route path='live' component={LiveList} />
        <Route path='event' component={Event} />
        <Route path='profile' component={Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'),
);


// if (module.hot) {
//   module.hot.accept(
//     () => {
//       render(
//         <AppContainer>
//           <Provider store={store}>
//             <Router history={browserHistory} routes={routes} />
//           </Provider>
//         </AppContainer>,
//         document.getElementById('app'),
//       );
//     },
//   );
// }
