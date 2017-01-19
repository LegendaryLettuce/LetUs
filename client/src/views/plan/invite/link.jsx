import React, { Component } from 'react';
// Redux
import { connect }      from 'react-redux';
// Copy Button
import CopyToClipboard  from 'react-copy-to-clipboard';
// Onsen UI
import { Icon }         from 'react-onsenui';
// Styles
// import { }   from '../../../styles/styles';

const linkStyle = {
  border: '2px solid white',
  borderRadius: '10px',
  width: '65%',
  height: '3.5%',
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
};
const link = {
  display: 'inline',
};

const hostUrl = `${window.location.href}`;

const concatHostUrl = hostUrl.split('/')[2];

class Link extends Component {
  constructor(props) {
    super(props);

    this.animationDur = 1;

    this.state = {
      copied: false,
      transparency: 1,
    };
    this.copyFeedback = this.copyFeedback.bind(this);
    this.animateTransparency = this.animateTransparency.bind(this);
  }

  animateTransparency() {
    if (this.state.copied && (this.state.transparency >= 0)) {
      console.log('ANIMATING TRANSP');
      this.setState({
        transparency: this.state.transparency - ((1 / 60) * (1 / this.animationDur)),
      });
      setTimeout(() => {
        this.animateTransparency();
      }, (1000 / 60));
    }
  }

  copyFeedback() {
    console.log('COPY FEEDBACK EXECUTED');
    if (!this.state.copied) {
      this.setState({
        copied: true,
      }, () => {
        this.animateTransparency();
        setTimeout(() => {
          this.setState({
            copied: false,
            transparency: 1,
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

    return (
      <CopyToClipboard
        text={`${hostUrl}c/${this.props.eventHash}`}
        onCopy={() => {
          console.log('COPIED:', `${hostUrl}c/${this.props.eventHash}`);
          this.copyFeedback();
        }}
      >
        <div style={this.state.copied ? linkStyleCopied : linkStyle}>
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
