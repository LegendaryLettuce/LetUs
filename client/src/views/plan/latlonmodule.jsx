import React, { Component }     from 'react';
// Redux
import { connect }              from 'react-redux';
import { Page, Modal, Button, Input } from 'react-onsenui';
// Styles
import { bodyStyle }            from '../../styles/styles';
// Pages
import  BottomNav        from './../../views/_global/bottomNav.jsx';

class LatLonModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
    this.getInput = (e) => {
      this.setState({ input: e.target.value });
    };
  }

  render() {
    return (
      <Page>
        <p>Where do you wanna go?</p>
        <Input
          value={this.state.input}
          onChange={this.getInput}
          placeHolder='Search for a location...'/>
        <Button onClick={console.log(this.state.input)}>Submit</Button>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(LatLonModule);
