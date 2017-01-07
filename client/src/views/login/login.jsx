import React, { Component } from 'react';
// Redux
import { connect }          from 'react-redux';
// Onsen UI
import ons                  from 'onsenui';
import { Icon, Button, BottomToolbar }             from 'react-onsenui';
// Styles
import { login, splashText, fbLogin, bodyStyle, tint, tagline } from '../../styles/styles';
import TextCarousel from 'react-text-carousel';

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

const images = ["http://68.media.tumblr.com/233a17b2322253404dfc6ce97501613b/tumblr_oh350r0AtK1u9ooogo1_540.gif", ]

const timedBackground = () => {
  setTimeout(() => {
    console.log(x);
  });
};

const button = {
  'font-size': 'x-large',
};

const phrases = [' eat.', ' drink.', ' play.']; // Required
const interval = 2000; // The time to wait before rendering the next string
const typistProps = {} // Props that are passed to the react-typist component

const Login = () => (
  <div style={login}>
    <div style={tint}>
      <div style={splashText}>
        Let Us
        <TextCarousel phrases={phrases} interval={interval} typistProps={typistProps} />
      </div>
      <div style={tagline}>Collaborate event planning with your friends.</div>
      <BottomToolbar style={fbLogin}>
        <Button style={button}><Icon icon="fa-facebook-square"/> Login with Facebook</Button>
      </BottomToolbar>
    </div>
  </div>

);

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Login);
