import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';

// Onsen UI
import ons              from 'onsenui';
import { Button } from 'react-onsenui';
// Styles
import { }   from '../../../styles/styles';

const Collaborate = props => (
  <div>
    <Button modifier='large' onClick={props.route}>Collaborate</Button>
  </div>
);

const mapStateToProps = state => ({
  friends: state.friends,
});

export default connect(mapStateToProps)(Collaborate);

