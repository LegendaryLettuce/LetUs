import React      from 'react';
import { render } from 'react-dom';

const style = {
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '24px',
  padding: '50px',
};

const App = () => (
  <p style={style}>Hello World!</p>
);

render(<App/>, document.getElementById('app'));
