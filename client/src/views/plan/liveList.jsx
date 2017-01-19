import React, { Component } from 'react';
// Onsen UI
import { Page, Button } from 'react-onsenui';
// Axios
import axios             from 'axios';
// Redux

import { connect }      from 'react-redux';
import { updateYelpData, updateEventPage, updateParentPage, load } from '../../redux/actions';
// Utils
import { getStore }     from '../../utils/utils';
// Subcomponents
import TopBar           from './../_global/topBar.jsx';
import GenericList      from './../_global/genericList.jsx';
import VotesProgress    from './collaborate/progressBar.jsx';
// Styles
import { buttonStyle }  from '../../styles/styles';
// Global Styles
import  BottomNav        from './../../views/_global/bottomNav.jsx';

const padStyle = {
  height: '12%',
};

class LiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.props.updateParentPage('/live');
    this.handleTouch = this.handleTouch.bind(this);
    this.goEvent = this.goEvent.bind(this);
  }

  componentWillMount() {
    // Load cached redux from Session Store
    if (!this.props.loaded) this.props.load(getStore());
  }

  componentWillReceiveProps(nextProps) {
    axios.put('/home/', {
      topEvent: JSON.stringify([this.props.liveData[0]]),
      linkHash: this.props.eventHash,
    })
      .then((res) => {
        // console.log('Saved top event', res);
      })
      .catch((error) => {
        console.log('Saving top events error', error);
      });
  }

  handleTouch(selected) {
    this.props.updateEventPage(selected);
    this.props.router.push('/event');
  }

  goEvent() {
    this.props.updateEventPage(this.props.liveData[0]);
    this.props.router.push('/event');
  }

  render() {
    return (
      <Page renderToolbar={TopBar.bind(this, { title: 'Live List' })}>
        <VotesProgress
          expectedVotes={((this.props.friends.length + 1) * this.props.liveData.length)}
          talliedVotes={this.props.talliedVotes}
          connectedPeers={(this.props.connectedPeers * this.props.liveData.length)}
        />
        <GenericList
            data={this.props.liveData}
            handleTouch={this.handleTouch}
          />
        <div style={padStyle}/>
        <Button
          className='center'
          style={buttonStyle}
          onClick={this.goEvent}
        >
        Top Event
        </Button>
        <BottomNav router={this.props.router} />
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
  updateEventPage: (eventPageData) => {
    dispatch(updateEventPage(eventPageData));
  },
  updateParentPage: (parentPage) => {
    dispatch(updateParentPage(parentPage));
  },
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  eventHash: state.eventHash,
  liveData: state.liveData,
  friends: state.friends,
  connectedPeers: state.connectedPeers,
  talliedVotes: state.talliedVotes,
  eventPageData: state.eventPageData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
