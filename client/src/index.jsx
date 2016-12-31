import React          from 'react';
import { render }     from 'react-dom';
import { titleStyle } from './styles/styles.jsx';

const App = () => (
  <div style={titleStyle}>Hello World!</div>
);

render(<App/>, document.getElementById('app'));
