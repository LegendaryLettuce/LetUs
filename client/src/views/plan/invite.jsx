import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { Page } from 'react-onsenui';
// Styles
import { titleStyle }   from '../../styles/styles';

import  Link            from './invite/link.jsx';
import  Friends         from './invite/friends.jsx';
import  Collaborate      from './invite/collaborate.jsx';

class Invite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      test: '',
    };
    // ons.notification.alert(this.props.hello);
  }

  componentDidMount() {
    this.setState({
      friends: ['Wilson', 'Autumn', 'Joe', 'David'],
      test: 'sup',
    });
  }
  // componentDidMount() {
  //   // query database for friends of user
  //   this.setState({
  //     friends: ['Wilson', 'Autumn', 'Joe', 'David'],
  //   });
  // }

  render() {
    return (
      <Page>

        <h1>Link</h1>
        <Link />

        <h1>Invite Friends</h1>

        <div>

          <Friends friends={this.state.friends}/>

        </div>


        <h1>Collaborate</h1>
        <Collaborate />

      </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Invite);
