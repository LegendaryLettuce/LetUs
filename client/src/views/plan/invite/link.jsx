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
  height: '3.5%',
  margin: 'auto',
  padding: '10px',
  paddingBottom: '10px',
  textAlign: 'center',
  marginBottom: '5%',
};
const copyStyle = {
  right: '0',
  margin: '0',
  padding: '0',
  float: 'right'
};
const link = {
  display: 'inline',
};

const hostUrl = 'let.us/';

const Link = props => (
  <div style={linkStyle}>
    <div style={{ float: 'left' }}>
      <p style={link}>{hostUrl.concat(props.eventHash)}</p>
    </div>
    <div style={copyStyle}>
      <Icon icon='fa-clone' />
    </div>
  </div>

);

const mapStateToProps = state => ({
  eventHash: state.eventHash,
});

export default connect(mapStateToProps)(Link);

