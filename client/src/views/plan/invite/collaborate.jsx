import React            from 'react';
// Redux
import { connect }      from 'react-redux';

// Onsen UI
import ons              from 'onsenui';
import { Button } from 'react-onsenui';
// Styles
import { }   from '../../../styles/styles';

const buttonStyle = {
  padding: '0px 20px 0px 20px',
  position: 'fixed',
  bottom: '0',
  height: '5%',
  marginBottom: '15%',
  zIndex: '5',
  marginLeft: '25%',
  width: '50%',
  textAlign: 'center',
  fontWeight: 'bold',
};

const Collaborate = props => (
  <div>
    <Button style={buttonStyle} modifier='large' onClick={props.route}>Collaborate</Button>
  </div>
);

const mapStateToProps = state => ({
  friends: state.friends,
});

export default connect(mapStateToProps)(Collaborate);

