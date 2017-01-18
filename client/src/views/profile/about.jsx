import React, { Component } from 'react';
// Onsen UI
import { Page,  Icon }      from 'react-onsenui';
// Redux
import { connect }          from 'react-redux';
// Global Styles
import  TopBar              from './../../views/_global/topBar.jsx';
import  BottomNav           from './../../views/_global/bottomNav.jsx';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <TopBar title={'About LetUs'}/>
        <BottomNav router={this.props.router}/>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(About);
