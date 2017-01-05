import React, { Component } from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import { Page, Carousel, CarouselItem } from 'react-onsenui';
// Styles
// import styles           from '../../styles/styles';

class Hello extends Component {

  constructor(props) {
    super(props);
    this.rgb = ['181', '198', '208'];
    this.fake = ['Italian', 'French', 'Vietnamese', 'Japanese', 'Chinese'];
    this.index = 0;
    this.calculateHeight = (div = 1) => (
      Math.floor(Math.floor(((window.innerWidth / 2) / window.innerHeight) * 100) / div)
    );
    this.state = {
      word: this.fake[0],
      pos: 1,
      anim: {},
      rgb: this.rgb,
    };
  }

  onFlick() {
    this.setState({
      pos: 0,
      anim: { duration: 0 },
    }, () => {
      if (this.index < this.fake.length - 1) {
        this.index += 0.5;
      }
      this.setState({
        word: this.fake[this.index],
        rgb: this.rgb,
        pos: 1,
        anim: {},
      });
    });
  }

  onHold() {
    this.setState({
      rgb: (this.state.rgb[0] > 30) ?
      [this.state.rgb[0] - 1, this.state.rgb[1], this.state.rgb[2]] :
      this.state.rgb,
    }, () => {
      if (this.state.stationary && this.state.holding) {
        setTimeout(this.onHold.bind(this), 1000 / 60);
      }
    });
  }

  onHoldDone() {
    this.setState({
      rgb: (this.state.rgb[0] < this.rgb[0]) ?
      [this.state.rgb[0] + 0.5, this.state.rgb[1], this.state.rgb[2]] :
      this.state.rgb,
    }, () => {
      if (!this.state.holding && this.state.rgb[0] < this.rgb[0]) {
        setTimeout(this.onHoldDone.bind(this), 1000 / 60);
      }
    });
  }

  onHoldStart(e) {
    e.preventDefault();
    this.setState({
      holding: true,
      stationary: true,
    }, () => {
      this.onHold();
    });
  }

  onHoldEnd() {
    this.setState({
      holding: false,
    }, () => {
      this.onHoldDone();
    });
  }

  onHoldMove() {
    this.setState({
      stationary: false,
    });
  }

  // TODO: turn green when going right, turn red when going left based on colors
  render() {
    return (
      <Page>
        <Carousel
          fullscreen
          swipeable
          autoScroll
          overscrollable
          index={this.state.pos}
          onPostChange={this.onFlick.bind(this)}
          animationOptions={this.state.anim}
          onTouchStart={this.onHoldStart.bind(this)}
          onTouchEnd={this.onHoldEnd.bind(this)}
          onTouchMove={this.onHoldMove.bind(this)}
          onMouseDown={this.onHoldStart.bind(this)}
          onMouseUp={this.onHoldEnd.bind(this)}
          onMouseMove={this.onHoldMove.bind(this)}
        >
          <CarouselItem/>
          <CarouselItem>
            <div style={{
              height: `${50 - this.calculateHeight(2)}%`,
            }}/>
            <div style={{
              height: `${this.calculateHeight()}%`,
              width: '50%',
              marginLeft: '25%',
              fontSize: '1.5em',
              textAlign: 'center',
              background: `rgb(${this.state.rgb[0]},${this.state.rgb[1]},${this.state.rgb[2]})`,
              color: '#333',
              borderRadius: '1em',
            }}>
              <div style={{
                padding: '10%',
                paddingTop: '40%',
              }}>
                {this.state.word}
              </div>
            </div>
          </CarouselItem>
          <CarouselItem/>
        </Carousel>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Hello);
