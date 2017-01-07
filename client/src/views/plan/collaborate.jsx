import React, { Component } from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import { Page, Carousel, CarouselItem } from 'react-onsenui';
// Styles
// import styles           from '../../styles/styles';

const [RED, GREEN, BLUE] = [0, 1, 2];

class Collaborate extends Component {

  constructor(props) {
    super(props);
    // this.fake = ['Italian', 'French', 'Vietnamese', 'Japanese', 'Chinese'];
    // yelpData
    // {
    //   displayTitle: String,
    //   imageUrl: String,
    //   rating: Number,
    // }
    this.index = 0;
    this.rgb = [200, 200, 200]; // [181, 198, 208];
    this.otherRGB = 200;
    this.rgbMin = 100;
    this.rgbMax = 200;
    this.x = window.innerWidth / 2;
    this.diffx = 0;
    this.y = window.innerHeight / 2; // unused
    this.holding = false;
    this.stationary = false;
    this.getUrl = url => (`${url.slice(0, url.length - 6)}l${url.slice(url.length - 5, url.length)}`);
    this.state = {
      word: this.props.yelpData[0].displayTitle,
      pos: 1,
      anim: {},
      rgb: this.rgb,
      windowWidth: 0,
      windowHeight: 0,
      topSpace: 50,
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
        Math.floor(((this.state.windowWidth / 1.5) / this.state.windowHeight) * 100)
      / div)
    );
  }

  onFlick(e) {
    if (e.activeIndex !== 1) {
      console.log(
`DATA:
type      - ${this.props.yelpData[this.index].displayTitle}
direction - ${(e.activeIndex) ? 'Dislike' : 'Like'}
intensity - ${Math.floor(((this.rgbMax - this.otherRGB) / (this.rgbMax - this.rgbMin)) * 100)}%`,
      );
      this.setState({
        pos: e.activeIndex,
        anim: { duration: 0 },
      }, () => {
        if (this.index < this.props.yelpData.length - 1) {
          this.index++;
        }
        this.setState({
          word: this.props.yelpData[this.index].displayTitle,
          rgb: this.rgb,
          pos: 1,
          anim: {},
        });
      });
    }
  }

  makeRGB(color, thisColor, speed) {
    // eslint-disable-next-line no-nested-ternary
    return (color === thisColor) ?
      ((this.state.rgb[thisColor] + (speed * 2) < this.rgbMax) ?
        this.state.rgb[thisColor] + (speed * 2) :
        this.rgb[thisColor]) :
      ((this.state.rgb[thisColor] - speed > this.otherRGB) ?
        this.state.rgb[thisColor] - speed :
        this.otherRGB);
  }

  updateRGB(color, speed = 1) {
    this.setState({
      rgb: [
        this.makeRGB(color, RED, speed),
        this.makeRGB(color, GREEN, speed),
        this.makeRGB(color, BLUE, speed),
      ],
    });
  }

  // !TODO: allow leeway for intensifying card
  // TODO: turn green when going right, turn red when going left based on colors
  move(px = this.x, py = this.y) {
    // TODO: finish vertical movement
    const distFromMid = Math.floor(
      (((this.x - this.diffx) - (this.state.windowWidth / 2))
      / (this.state.windowWidth / 2))
      * 100 * 2);
    if (distFromMid >= 50) this.updateRGB(GREEN, 1);
    else if (distFromMid <= -50) this.updateRGB(RED, 1);
    else this.updateRGB(BLUE, 1);

    this.setState({
      topSpace: Math.floor((this.y / this.state.windowHeight) * 100),
    });
    if (px === this.x && py === this.y && this.holding) {
      setTimeout(this.move.bind(this, px, py), 1000 / 60);
    }
  }

  onHold() {
    this.diffx = this.x - (this.state.windowWidth / 2);
    if (this.otherRGB > this.rgbMin) this.otherRGB--;
    this.updateRGB(BLUE);
    if (this.stationary && this.holding) {
      setTimeout(this.onHold.bind(this), 1000 / 60);
    }
  }

  onHoldDone() {
    if (this.otherRGB < this.rgbMax) this.otherRGB++;
    this.updateRGB(BLUE);
    if (!this.holding && JSON.stringify(this.state.rgb) !== JSON.stringify(this.rgb)) {
      setTimeout(this.onHoldDone.bind(this), 1000 / 60);
    }
  }

  onHoldStart(e) {
    e.preventDefault();
    // TODO: only allow movement (disable carousel etc.) if not within element
    this.diffx = this.x - (this.state.windowWidth / 2);
    this.holding = true;
    this.stationary = true;
    this.onHold();
  }

  onHoldEnd() {
    this.holding = false;
    this.onHoldDone();
  }

  moveBoth() {
    const distFromMid = Math.floor(
      (((this.x - this.diffx) - (this.state.windowWidth / 2))
      / (this.state.windowWidth / 2))
      * 100 * 2);
    if (Math.abs(distFromMid) > 9) {
      this.stationary = false;
      this.move();
    }
  }

  moveMouse(e) {
    [this.x, this.y] = [e.nativeEvent.clientX, e.nativeEvent.clientY];
    this.moveBoth();
  }

  moveTouch(e) {
    [this.x, this.y] = [e.nativeEvent.touches[0].clientX, e.nativeEvent.touches[0].clientY];
    this.moveBoth();
  }

  // TODO: desaturate images and then saturate as card is held, tint on swipe
  // !TODO: configure autoscroll to scroll more easily at edges
  // TODO: programmatically define width and increase width of card
  // TODO: add a loading bar to the bottom of the card showing how intense it is
  // TODO: rewrite to use absolute pixel sizes rather than percents
  // TODO: make contents of card remain in place when card is moved
  // TODO: make card a reasonable size on all systems
  render() {
    return (
      <Page
        onMouseMove={this.moveMouse.bind(this)}
        onTouchMove={this.moveTouch.bind(this)}
      >
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
          onMouseDown={this.onHoldStart.bind(this)}
          onMouseUp={this.onHoldEnd.bind(this)}
          style={{
            zIndex: '3',
            // background: '#242424',
            // WebkitBackgroundClip: '',
            // backgroundClip: '',
          }}
        >
          <CarouselItem/>
          <CarouselItem>
            <div style={{
              height: `${50 - this.calculateHeight(2)}%`,
            }}/>
            <div style={{
              height: `${this.calculateHeight()}%`,
              width: '66%',
              marginLeft: '16%',
              borderRadius: '10%',
              boxShadow: '0 0 0 10000em #242424',
              border: '1px solid #ccc',
              overflow: 'hidden',
              // zIndex: '3',
              // border: '1px solid #ccc',
            }}>
              <div style={{
                height: '100%',
                widht: '100%',
                // height: `${this.calculateHeight()}%`,
                // width: '66%',
                // marginLeft: '16%',
                fontSize: 'xx-large',
                textAlign: 'center',
                background: `rgba(${this.state.rgb[0]},${this.state.rgb[1]},${this.state.rgb[2]},0.6)`,
                color: '#242424', // TODO: get color from OnsenUI
                borderRadius: '10%',
                boxShadow: '0 0 1em 0 #333 inset',
                // border: '1px solid #ccc',
              }}>
                <div style={{
                  // fontWeight: '900',
                  // WebkitTextStroke: '1px #ccc',
                  // textShadow: '0 0 1em #000', // , 0 0 .33em rgba(0,0,0,.33)
                  padding: '10%',
                  paddingTop: '70%',
                }}>
                  {'' /* this.state.word */}
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem/>
        </Carousel>
        <div style={{
          height: `${50 - this.calculateHeight(2)}%`,
        }}/>
        <div style={{
          fontSize: 'xx-large',
          textAlign: 'center',
          // color: '#242424', // TODO: get color from OnsenUI
          position: 'fixed',
          height: `${this.calculateHeight()}%`,
          width: '66%',
          marginLeft: '16%',
          zIndex: '2',
        }}>
          <div style={{
            padding: '10%',
            paddingTop: '70%',
            // TODO: place x and o icons on left and right hidden until revealed by card
            // TODO: make icon colors more saturated if more intense
            // TODO: replace background change with loading bar
            // OR
            // TODO: attach circle to window and make x or check appear on swipe
          }}>
            <image src={this.getUrl()}/>
            {this.state.word}
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  yelpData: state.yelpData,
});

export default connect(mapStateToProps)(Collaborate);
