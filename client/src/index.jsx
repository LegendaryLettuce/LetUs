import React          from 'react';
import { render }     from 'react-dom';
import styles         from './styles/styles.jsx';

const App = () => (
  <div style={styles.title}>Hello World!</div>
);

render(<App/>, document.getElementById('app'));
