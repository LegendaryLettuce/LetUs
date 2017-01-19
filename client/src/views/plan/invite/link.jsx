import React            from 'react';
// Redux
import { connect }      from 'react-redux';
// Copy Button
import CopyToClipboard  from 'react-copy-to-clipboard';
// Onsen UI
import { Icon }         from 'react-onsenui';
// Styles
// import { }   from '../../../styles/styles';

const linkStyle = {
  border: '2px solid white',
  borderRadius: '10px',
  width: '80%',
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

const hostUrl = `${window.location.href}`;

const concatHostUrl = hostUrl.split('/')[2];

const Link = props => (
  <div style={linkStyle}>
    <div style={{ float: 'left' }}>
      <p style={link}>{`${concatHostUrl}/c/${props.eventHash}`}</p>
    </div>
    <CopyToClipboard
      text={`${hostUrl}c/${props.eventHash}`}
      onCopy={() => {
        console.log('COPIED:', `${hostUrl}c/${props.eventHash}`);
      }}
    >
      <Icon icon='fa-clone' style={copyStyle}/>
    </CopyToClipboard>&nbsp;
  </div>

);

const mapStateToProps = state => ({
  eventHash: state.eventHash,
});

export default connect(mapStateToProps)(Link);
