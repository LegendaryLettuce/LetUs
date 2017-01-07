import React, { Component }       from 'react';
// Onsen UI
import ons              from 'onsenui';
import { ProgressBar } from 'react-onsenui';


class VotesProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const talliedPercent = (this.props.votes.talliedVotes / this.props.votes.expectedVotes) * 100;
    const connectedPercent = (this.props.votes.connectedPeers / this.props.votes.expectedVotes) * 100;

    return (
      <section style={{
        padding: '4%',
        backgroundColor: '#888',
        borderBottom: '1px solid #ccc',
        boxShadow: '0px -1em 0.8em -1em #333 inset',
      }}>
        <ProgressBar
          value={talliedPercent}
          secondaryValue={connectedPercent}
          style={{ transform: 'scaleY(2.5)' }}
        />
      </section>
    );
  }
}

export default VotesProgress;
