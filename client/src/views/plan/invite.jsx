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
import { listContainer, listStyle, listBottom }  from '../../styles/styles';
// Components
import  HashLink        from './invite/link.jsx';
import  Friends         from './invite/friends.jsx';
import  Collaborate     from './invite/collaborate.jsx';
import  BottomNav       from './../../views/_global/bottomNav.jsx';
// Sockets
import { initSocket }   from './../../sockets/sockets';


const header = {
  textAlign: 'center',
};

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
    this.props.updateInviteFriends([]);
  }

  routeToCollaborate() {
    axios.put('/events/', {
      attendees: JSON.stringify(this.props.friends),
      linkHash: this.props.eventHash,
      topEvent: "[{\"displayTitle\":\"Mission Cliffs Climbing & Fitness\",\"imageUrl\":\"https://s3-media4.fl.yelpcdn.com/bphoto/oE-6GORUuM2rUhgIW-VqTA/ms.jpg\",\"rating\":4,\"categories\":[[\"Gyms\",\"gyms\"],[\"Yoga\",\"yoga\"],[\"Rock Climbing\",\"rock_climbing\"]],\"displayAddress\":[\"2295 Harrison St\",\"Mission\",\"San Francisco, CA 94110\"],\"displayPhone\":\"+1-415-550-0515\",\"snippetText\":\"Found my new gym!  This place is great with a combo of (mostly) climbing, basic gym equipment, weights, yoga classes, and cardio classes.  For $77/mth, it's...\",\"mobileUrl\":\"https://m.yelp.com/biz/mission-cliffs-climbing-and-fitness-san-francisco?adjust_creative=e6iE0U7lMHSSLdMk1-vrXw&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=e6iE0U7lMHSSLdMk1-vrXw\",\"votes\":1,\"preference\":1,\"intensity\":100}]",
    })
    .then((res) => {
      // console.log('Saved invited friends', res);
      // console.log('CLIENT: init socket connection');
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
    return (
      <Page renderToolbar={() => this.renderToolbar('Invite')}>
        <div style={listContainer}>
          <h1 style={header}>Invite Friends</h1>
          <HashLink />
          <div style={listStyle}>
            <Friends />
          </div>
          <div style={listBottom}/>
        </div>
        <Collaborate route={this.routeToCollaborate}/>
        <BottomNav />
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
