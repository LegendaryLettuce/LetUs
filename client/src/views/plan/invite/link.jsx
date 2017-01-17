import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Copy Button
import CopyToClipboard from 'react-copy-to-clipboard';
// Onsen UI
// import ons              from 'onsenui';
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
  float: 'right',
};
const link = {
  display: 'inline',
};

const hostUrl = 'localhost:3000/c/';

const Link = props => (
  <div style={linkStyle}>
    <CopyToClipboard text={`${hostUrl}${props.eventHash}`}>
      <Icon icon='fa-clone' />
      <button>Copy to clipboard with button</button>
    </CopyToClipboard>&nbsp;
  </div>

);

const mapStateToProps = state => ({
  eventHash: state.eventHash,
});

export default connect(mapStateToProps)(Link);
