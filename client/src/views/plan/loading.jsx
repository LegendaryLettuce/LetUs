import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
import { updateInviteFriends, updateYelpData, updateEventHash, updateConnectedPeers, updateTalliedVotes  }  from '../../redux/actions';


// Axios for requests
import axios            from 'axios';

// Styles
import { }   from '../../styles/styles';

// Import Sockets
import addSockets from './../../sockets/sockets';

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const hash = window.location.pathname.split('/')[2];
    this.props.updateEventHash(hash);
    axios.get(`/events/${hash}`)
        .then((data) => {
          this.props.updateInviteFriends(data.data.attendees);
          this.props.updateYelpData(JSON.parse(data.data.data));
        })
        .then(() => {
          console.log('After AJAX', this.props.yelpData);
          addSockets(hash, this.props.updateConnectedPeers, this.props.updateTalliedVotes);
          this.props.router.push('/collaborate');
        });
  }


  render() {
    return (
      <div />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
  updateInviteFriends: (friends) => {
    dispatch(updateInviteFriends(friends));
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
});

const mapStateToProps = state => ({
  yelpData: state.yelpData,
  eventHash: state.eventHash,
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
