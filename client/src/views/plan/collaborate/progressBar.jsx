import React, { Component }       from 'react';
// Onsen UI
// import ons              from 'onsenui';
import { ProgressBar } from 'react-onsenui';


class VotesProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const talliedPercent = (this.props.talliedVotes / this.props.expectedVotes) * 100;
    const connectedPercent = (this.props.connectedPeers / this.props.expectedVotes) * 100;
    // console.log('SOCKET.CONNECTIONS: tallied percent', talliedPercent);
    // console.log('SOCKET.CONNECTIONS: connected percent', connectedPercent);
    
    return (
      <section style={{
        padding: '12px',
        backgroundColor: 'rgb(200,200,200)',
        boxShadow: '0 -1em 0.8em -1.1em #333 inset, 0 1em 0.8em -1.1em #333 inset',
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
