import React, { Component } from 'react';
// Redux
import { connect }          from 'react-redux';
// Onsen UI
import ons                  from 'onsenui';
import { Icon, Button, BottomToolbar }             from 'react-onsenui';
// Styles
import { login, splashText, fbLogin, bodyStyle } from '../../styles/styles';

// const linkStyle = {
//   border: '2px solid white',
//   borderRadius: '10px',
//   width: '50%',
//   margin: 'auto',
//   padding: '10px',
// };
// const copyStyle = {
//   textAlign: 'right',
// };
const button = {
  'font-size': 'x-large',
};

const Login = () => (
  <div style={login}>
    <div style={splashText}>Let Us <span>eat.</span></div>
    <div style={bodyStyle}>Collaborate event planning with friends.</div>
    <BottomToolbar style={fbLogin}>
      <Button style={button}><Icon icon="fa-facebook-square"/> Login with Facebook</Button>
    </BottomToolbar>
  </div>

);

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Login);
