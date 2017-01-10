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
  textAlign: 'center',
  marginBottom: '5%',
};
const copyStyle = {
  textAlign: 'right',
};
const link = {
  display: 'inline',
};

const hostUrl = 'let.us/';

const Link = props => (
  <div style={linkStyle}>
    <p style={link}>{hostUrl.concat(props.eventHash)}</p>

    <Icon style={copyStyle} icon='fa-clone' />

  </div>

);

const mapStateToProps = state => ({
  eventHash: state.eventHash,
});

export default connect(mapStateToProps)(Link);

