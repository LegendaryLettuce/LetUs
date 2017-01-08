import React, { Component } from 'react';
// Onsen UI
import { Page, Carousel, CarouselItem, Icon } from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { addLiveData }  from '../../redux/actions';
// Styles
// import styles           from '../../styles/styles';

const [RED, GREEN, BLUE] = [0, 1, 2];
// TODO: Make width-percent into state and adjust when width is smaller than height
const WIDTH_PERCENT = 66;
const WIDTH_PERCENT_DEC = WIDTH_PERCENT / 100;

class Collaborate extends Component {

  constructor(props) {
    super(props);
    // yelpData
    // {
    //   displayTitle: String,
    //   imageUrl: String,
    //   rating: Number,
    //   categories: Array,
    //   displayAddress: Array,
    //   displayPhone: String,
    //   snippetText: String,
    //   mobileUrl: String,
    // }
    this.index = 0;
    this.rgb = [200, 200, 200];
    this.otherRGB = 200;
    this.rgbMin = 30;
    this.rgbMax = 200;
    this.x = window.innerWidth / 2;
    this.diffx = 0;
    this.y = window.innerHeight / 2;
    this.new = true;
    this.holding = false;
    this.stationary = false;
    this.getUrl = url => (`${url.slice(0, url.length - 6)}l${url.slice(url.length - 4, url.length)}`);
    this.ratingToArray = (rating) => {
      const a = new Array(Math.floor(rating)).fill(0);
      if (rating - Math.floor(rating) !== 0) a.push(1);
      return a;
    };
    this.loaded = false;
    this.state = {
      word: this.props.yelpData[0].displayTitle,
      pos: 1,
      anim: {},
      rgb: this.rgb,
      windowWidth: 0,
      windowHeight: 0,
      loaded: false,
    };
  }
  componentDidMount() {
    this.loaded = true;
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }, () => window.addEventListener('resize', this.updateWindowSize.bind(this)));
  }
  componentWillUnmount() {
    this.loaded = false;
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
        Math.floor(((this.state.windowWidth * WIDTH_PERCENT_DEC) / this.state.windowHeight) * 100)
      / div)
    );
  }

  onFlick(e) {
    if (e.activeIndex !== 1) {
      this.props.addLiveData({
        ...this.props.yelpData[this.index],
        preference: (e.activeIndex) ? -1 : 1,
        intensity: Math.floor(((this.rgbMax - this.otherRGB) / (this.rgbMax - this.rgbMin)) * 100),
      });
//       console.log(
// `DATA:
// type      - ${this.props.yelpData[this.index].displayTitle}
// direction - ${(e.activeIndex) ? 'Dislike' : 'Like'}
// intensity - ${Math.floor(((this.rgbMax - this.otherRGB) / (this.rgbMax - this.rgbMin)) * 100)}%`,
//       );
      this.new = true;
      this.otherRGB = this.rgbMax;
      this.setState({
        pos: e.activeIndex,
        anim: { duration: 0 },
      }, () => {
        if (this.index < this.props.yelpData.length - 1) {
          this.index++;
        } else {
          this.props.router.push('/live');
        }
        this.setState({
          word: this.props.yelpData[this.index].displayTitle,
          rgb: this.rgb,
        }, () => {
          setTimeout(this.setState.bind(this, {
            pos: 1,
            anim: {},
          }), 50);
        });
      });
    }
  }

  getDistFromMid() {
    return Math.floor(
      (((this.x - this.diffx) - (this.state.windowWidth / 2)) / (this.state.windowWidth / 2))
      * 100 * 2);
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
    if (this.loaded && !this.new) {
      this.setState({
        rgb: [
          this.makeRGB(color, RED, speed),
          this.makeRGB(color, GREEN, speed),
          this.makeRGB(color, BLUE, speed),
        ],
      });
    } else if (this.loaded && this.new) this.setState({ rgb: this.rgb });
  }

  move(px = this.x, py = this.y) {
    const distFromMid = this.getDistFromMid();
    if (distFromMid >= 50) this.updateRGB(GREEN, 2);
    else if (distFromMid <= -50) this.updateRGB(RED, 2);
    else this.updateRGB(BLUE, 2);
    if (this.loaded && this.new) this.setState({ rgb: this.rgb });
    if (this.loaded && !this.new && px === this.x && py === this.y && this.holding) {
      setTimeout(this.move.bind(this, px, py), 1000 / 60);
    }
  }

  onHold() {
    this.diffx = this.x - (this.state.windowWidth / 2);
    if (this.otherRGB > this.rgbMin + 1) this.otherRGB -= 2;
    this.updateRGB(BLUE, 2);
    if (this.loaded && this.new) this.setState({ rgb: this.rgb });
    if (this.loaded && !this.new && this.stationary && this.holding) {
      setTimeout(this.onHold.bind(this), 1000 / 60);
    }
  }

  onHoldDone() {
    if (this.otherRGB < this.rgbMax) this.otherRGB++;
    this.updateRGB(BLUE);
    if (this.loaded && this.new) this.setState({ rgb: this.rgb });
    if (this.loaded && !this.new && !this.holding &&
        JSON.stringify(this.state.rgb) !== JSON.stringify(this.rgb)) {
      setTimeout(this.onHoldDone.bind(this), 1000 / 60);
    }
  }

  onHoldStart(e) {
    e.preventDefault();
    this.diffx = this.x - (this.state.windowWidth / 2);
    this.new = false;
    this.holding = true;
    this.stationary = true;
    this.onHold();
  }

  onHoldEnd() {
    this.holding = false;
    this.onHoldDone();
  }

  moveBoth() {
    const distFromMid = this.getDistFromMid();
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


  // !TODO: configure autoscroll to scroll more easily at edges
  // TODO: programmatically define width and increase width of card
  // TODO: add a loading bar to the bottom of the card showing how intense it is
  //       OR make the border a loading bar
  // TODO: rewrite to use absolute pixel sizes rather than percents
  // TODO: make card a reasonable size on all systems


  // TODO: place x and o icons on left and right hidden until revealed by card
  // TODO: make icon colors more saturated if more intense
  // TODO: replace background change with loading bar
  // OR
  // TODO: attach circle to window and make x or check appear on swipe

  // TODO: display colored shadow from sides when past position required to send card

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
          }}
        >
          <CarouselItem/>
          <CarouselItem>
            <div style={{
              height: `${50 - this.calculateHeight(2)}%`,
            }}/>
            <div style={{
              height: `${this.calculateHeight() + 3}%`, // TODO: change size based on text lines
              width: `${WIDTH_PERCENT}%`,
              marginLeft: `${((100 - WIDTH_PERCENT) / 2)}%`,
              boxShadow: `0 0 0 2px rgb(${this.state.rgb[0]},${this.state.rgb[1]},${this.state.rgb[2]}), 0 0 0 10000em rgb(60, 64, 65)`,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: '100%',
                fontSize: 'xx-large',
                textAlign: 'center',
                background: 'rgba(0,0,0,0)',
                boxShadow: '0 0 2em 0 #333 inset',
              }}/>
            </div>
          </CarouselItem>
          <CarouselItem/>
        </Carousel>
        <div style={{ height: `${50 - this.calculateHeight(2)}%` }}/>
        <div style={{
          fontSize: 'xx-large',
          textAlign: 'center',
          color: 'rgb(60, 64, 65)', // TODO: get color from OnsenUI
          position: 'fixed',
          height: `${this.calculateHeight() + 3}%`,
          width: `${WIDTH_PERCENT}%`,
          marginLeft: `${((100 - WIDTH_PERCENT) / 2)}%`,
          zIndex: '2',
          boxShadow: '0 0 0 2px rgb(38, 39, 40), 0 0 0 10000em #ccc',
          background: '#888',
        }}>
          <div style={{
            height: `${(((this.calculateHeight() - 10) / 100) * this.state.windowHeight) + 1}px`,
            width: `${((WIDTH_PERCENT_DEC) * this.state.windowWidth)}px`,
            backgroundImage: `url("${this.getUrl(this.props.yelpData[this.index].imageUrl)}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            overflow: 'hidden',
            boxShadow: '0 0 0 2px rgb(38, 39, 40)',
          }}/>
          {
            this.props.yelpData[this.index].rating ?
              <div
                className="rating"
                style={{
                  position: 'absolute',
                  marginLeft: `${0.08 * this.state.windowWidth}px`,
                  height: `${0.1 * this.state.windowWidth}px`,
                  width: `${(0.1 * this.state.windowWidth) * 5}px`,
                  top: `${((((this.calculateHeight() - 10) / 100) * this.state.windowHeight) + 1) - (0.1 * this.state.windowWidth)}px`,
                  background: 'rgba(60, 64, 65, 0.71)',
                  // borderTopRightRadius: `${0.01 * this.state.windowWidth}px`,
                  // borderTopLeftRadius: `${0.01 * this.state.windowWidth}px`,
                  boxShadow: '0 0 0 2px rgb(38, 39, 40)',
                  color: '#ccc',
                }}
              >
                {this.ratingToArray(this.props.yelpData[this.index].rating).map((e, i) => (
                  <Icon
                    icon={`fa-star${e ? '-half' : ''}`}
                    fixed-width="false"
                    size={0.08 * this.state.windowWidth}
                    key={i}
                    style={{
                      position: 'relative',
                      top: `${((0.08 * this.state.windowWidth) - 30 < 0) ? ((0.08 * this.state.windowWidth) - 30) : 0}px`,
                      paddingTop: `${0.01 * this.state.windowWidth}px`,
                      height: `${0.08 * this.state.windowWidth}px`,
                      width: `${0.08 * this.state.windowWidth}px`,
                      paddingLeft: '2px',
                      paddingRight: '2px',
                      left: `${e ? `-${0.015 * this.state.windowWidth}px` : '0'}`,
                      zIndex: `${e ? 7 : 8}`,
                      textShadow: '0 0 .2em #333',
                    }}
                  />
                ))}
              </div> :
              <div/>
          }
          <div style={{ padding: `${0.01 * this.state.windowHeight}px` }}>
            {this.state.word}
          </div>
        </div>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addLiveData: (liveData) => {
    dispatch(addLiveData(liveData));
  },
});

const mapStateToProps = state => ({
  yelpData: state.yelpData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Collaborate);
