import React, { Component }       from 'react';
// Onsen UI
import ons              from 'onsenui';
import { Page, Toolbar, List, ListItem, Button, BackButton } from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { updateYelpData } from '../../redux/actions';
// Subcomponents
import GenericList from './../_global/genericList.jsx';
import VotesProgress from './collaborate/progressBar.jsx';

class LiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: {
        expectedVotes: 10,
        connectedPeers: 8,
        talliedVotes: 4,
      },
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleBack() {
    console.log('HANDLING BACK');
  }

  handleTouch() {
    console.log('HANDLING TOUCH');
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <BackButton onClick={this.handleBack}></BackButton>
        </div>
        <div className='center' style={{ fontWeight: 'bolder' }}>{'Live List'}</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page
        renderToolbar={() => this.renderToolbar()}
      >
        <VotesProgress votes={this.state.votes} />
        <GenericList
            data={this.props.yelpData}
            handleTouch={this.handleTouch}
          />
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateYelpData: (yelpData) => {
    dispatch(updateYelpData(yelpData));
  },
});

const mapStateToProps = state => ({
  yelpData: state.yelpData,
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
