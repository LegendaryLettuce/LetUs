import React, { Component } from 'react';
// Redux
import { connect }      from 'react-redux';
// Copy Button
import CopyToClipboard  from 'react-copy-to-clipboard';
// Onsen UI
import { Icon }         from 'react-onsenui';

const linkStyle = {
  border: '2px solid white',
  borderRadius: '10px',
  width: '65%',
  height: '24px',
  margin: 'auto',
  padding: '10px',
  paddingBottom: '10px',
  textAlign: 'center',
  marginBottom: '5%',
};

const copyStyle = {
  right: '0',
  margin: '0',
  padding: '0',
  float: 'right',
  position: 'relative',
  top: '-16px',
};

const link = {
  display: 'inline',
  position: 'relative',
  top: '-16px',
};

const hostUrl = `${window.location.href}`;

const concatHostUrl = hostUrl.split('/')[2];

class Link extends Component {
  constructor(props) {
    super(props);
    this.animationDur = 1;
    this.state = {
      copied: false,
      transparency: 0,
    };
    this.copyFeedback = this.copyFeedback.bind(this);
    this.animateTransparency = this.animateTransparency.bind(this);
  }

  animateTransparency() {
    if (this.state.copied && (this.state.transparency >= 0)) {
      this.setState({
        transparency: this.state.transparency - ((1 / 60) * (1 / this.animationDur)),
      }, () => {
        setTimeout(() => {
          this.animateTransparency();
        }, (1000 / 60));
      });
    }
  }

  copyFeedback() {
    if (!this.state.copied) {
      this.setState({
        copied: true,
        transparency: 1,
      }, () => {
        this.animateTransparency();
        setTimeout(() => {
          this.setState({
            copied: false,
            transparency: 0,
          });
        }, (this.animationDur * 1000));
      });
    }
  }

  render() {
    const linkStyleCopied = {
      ...linkStyle,
      backgroundColor: `rgba(255, 255, 255, ${this.state.transparency})`,
    };
    const copyTextStyle = {
      position: 'relative',
      fontWeight: 'bolder',
      fontSize: '120%',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color: `rgba(0, 0, 0, ${this.state.transparency / 2})`,
      zIndex: '5',
    };

    return (
      <CopyToClipboard
        text={`${hostUrl}c/${this.props.eventHash}`}
        onCopy={() => { this.copyFeedback(); }}
      >
        <div style={this.state.copied ? linkStyleCopied : linkStyle}>
          <div style={copyTextStyle}>Copied</div>
          <div style={{ float: 'left' }}>
            <p style={link}>{`${concatHostUrl}/c/${this.props.eventHash}`}</p>
          </div>
          <Icon icon='fa-clone' style={copyStyle}/>
        </div>
      </CopyToClipboard>
    );
  }
}

const mapStateToProps = state => ({
  eventHash: state.eventHash,
});

export default connect(mapStateToProps)(Link);
