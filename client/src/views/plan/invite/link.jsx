import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { Icon } from 'react-onsenui';
// Styles
import { }   from '../../../styles/styles';

const linkStyle = {
  border: '2px solid white',
  borderRadius: '10px',
  width: '50%',
  margin: 'auto',
  padding: '10px',
};
const copyStyle = {
  textAlign: 'right',
};
const link = {
  display: 'inline',
};

const Link = () => (

  <div style={linkStyle}>
    <p style={link}>Shortened link</p>

    <Icon style={copyStyle} icon='fa-clone' />

  </div>

);

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Link);

