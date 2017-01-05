import React, { Component } from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import { Page, Carousel, CarouselItem } from 'react-onsenui';
// Styles
// import styles           from '../../styles/styles';

class Collaborate extends Component {

  constructor(props) {
    super(props);
    this.rgb = ['181', '198', '208'];
    this.rgbMin = 30;
    this.fake = ['Italian', 'French', 'Vietnamese', 'Japanese', 'Chinese'];
    this.index = 0;
    // TODO: break out all non-rerendering state components
    this.state = {
      word: this.fake[0],
      pos: 1,
      anim: {},
      rgb: this.rgb,
      intensity: 0,
    };
  }
  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }, () => window.addEventListener('resize', this.updateWindowSize.bind(this)));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowSize.bind(this));
  }

  updateWindowSize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  calculateHeight(div = 1) {
    return (
      Math.floor(
        Math.floor(((this.state.windowWidth / 2) / this.state.windowHeight) * 100)
      / div)
    );
  }

  onFlick(e) {
    if (e.activeIndex !== 1) {
      console.log(`DATA:
type      - ${this.fake[this.index]}
direction - ${(e.activeIndex) ? 'Dislike' : 'Like'}
intensity - ${Math.floor(((this.rgb[0] - this.state.rgb[0]) / (this.rgb[0] - this.rgbMin)) * 100)}%`,
      );
    }
    // TODO: move up into if block
    this.setState({
      pos: e.activeIndex,
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
      rgb: (this.state.rgb[0] > this.rgbMin) ?
      [this.state.rgb[0] - 2, this.state.rgb[1], this.state.rgb[2]] :
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
      [this.state.rgb[0] + 1, this.state.rgb[1], this.state.rgb[2]] :
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
  // TODO: add a loading bar to the bottom of the card showing how intense it is
  // TODO: rewrite to use absolute pixel sizes rather than percents
  // TODO: make contents of card remain in place when card is moved
  // TODO: make card a reasonable size on all systems
  // !TODO: allow leeway for intensifying card
  // !TODO: configure autoscroll to scroll more easily at edges
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
              color: '#242424',
              borderRadius: '10%',
              boxShadow: '0 0 1em 0 #000 inset',
              border: '1px solid #ccc',
            }}>
              <div style={{
                // fontWeight: '900',
                // WebkitTextStroke: '1px #ccc',
                // textShadow: '0 0 1em #000', // , 0 0 .33em rgba(0,0,0,.33)
                padding: '10%',
                paddingTop: '70%',
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

export default connect(mapStateToProps)(Collaborate);
