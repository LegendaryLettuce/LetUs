import React, { Component } from 'react';
// Onsen UI
// import ons              from 'onsenui';
import { Page, Toolbar, BackButton } from 'react-onsenui';
// Axios for requests
import axios            from 'axios';
// Redux
import { connect }      from 'react-redux';
import {
  updateInviteFriends,
  updateLiveData,
  updateYelpData,
  updateEventHash,
  updateConnectedPeers,
  updateTalliedVotes,
  load,
}                       from '../../redux/actions';
// Utils
import { getStore }     from '../../utils/utils';
// Styles
// import { }              from '../../styles/styles';
// Components
import  HashLink        from './invite/link.jsx';
import  Friends         from './invite/friends.jsx';
import  Collaborate     from './invite/collaborate.jsx';
import  BottomNav       from './../../views/_global/bottomNav.jsx';
// Sockets
import { initSocket }   from './../../sockets/sockets';

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
    this.routeToCollaborate = this.routeToCollaborate.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    // Load cached redux from Session Store
    if (!this.props.loaded) this.props.load(getStore());
    this.props.updateLiveData(this.props.yelpData);
  }

  routeToCollaborate() {
    axios.put('/events/', {
      attendees: JSON.stringify(this.props.friends),
      linkHash: this.props.eventHash,
    })
    .then((res) => {
      console.log('Saved invited friends', res);
      console.log('CLIENT: init socket connection');
      const eventOwnerUpdaters = {
        connectedPeers: this.props.updateConnectedPeers,
        talliedVotes: this.props.updateTalliedVotes,
        liveData: this.props.updateLiveData,
        inviteFriends: this.props.updateInviteFriends,
      };
      // console.log('liveData', this.props.liveData);
      const eventOwnerStates = {
        liveData: this.props.liveData,
        talliedVotes: this.props.talliedVotes,
        yelpData: this.props.yelpData,
      };
      initSocket(this.props.eventHash, eventOwnerUpdaters, eventOwnerStates);
      this.props.router.push('/collaborate');
    })
    .catch((error) => {
      console.log('Inviting friends error', error);
    });
  }

  // facebookNotification() {
    // axios.post(`/${user_id}/notifications`)
  // }

  handleBack() {
    this.props.router.push('/create');
  }

  renderToolbar(toolbarTitle) {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={this.handleBack}></BackButton>
        </div>
        <div className='center' style={{ fontWeight: 'bolder' }}>{toolbarTitle}</div>
      </Toolbar>
    );
  }

  render() {
    const listStyle = {
      height: '50%',
      overflowY: 'scroll',
    };
    const header = {
      textAlign: 'center',
    };
    return (
      <Page renderToolbar={() => this.renderToolbar('Invite')}>

        <h1 style={header}>Invite Friends</h1>
        <HashLink />

        <div style={listStyle}>

          <Friends />

        </div>

        <Collaborate route={this.routeToCollaborate}/>

        <BottomNav></BottomNav>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  load: (state) => {
    dispatch(load(state));
  },
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
  updateEventHash: (eventHash) => {
    dispatch(updateEventHash(eventHash));
  },
  updateConnectedPeers: (connectedPeers) => {
    dispatch(updateConnectedPeers(connectedPeers));
  },
  updateTalliedVotes: (talliedVotes) => {
    dispatch(updateTalliedVotes(talliedVotes));
  },
  updateLiveData: (liveData) => {
    dispatch(updateLiveData(liveData));
  },
  updateInviteFriends: (friends) => {
    dispatch(updateInviteFriends(friends));
  },
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  friends: state.friends,
  yelpData: state.yelpData,
  eventHash: state.eventHash,
  liveData: state.liveData,
  talliedVotes: state.talliedVotes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
