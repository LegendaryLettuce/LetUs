import React, { Component } from 'react';
// Onsen UI
import { Page, Carousel, CarouselItem, Icon } from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { addLiveData }  from '../../redux/actions';
// Utils
import { getUrl, ratingToArray } from '../../utils/utils';
// Sockets
import { emitLiveData } from '../../sockets/sockets';

const [RED, GREEN, BLUE] = [0, 1, 2];
const SIZE_PERCENT = 66;
const RGB_MIN = 30;
const RGB_MAX = 200;
const RGB = [RGB_MAX, RGB_MAX, RGB_MAX];

class Collaborate extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.otherRGB = RGB_MAX;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.diffx = 0;
    this.new = true;
    this.loaded = false;
    this.holding = false;
    this.stationary = false;
    this.state = {
      cardName: this.props.yelpData[0].displayTitle,
      carouselPosition: 1,
      carouselAnimation: {},
      rgb: RGB,
      windowWidth: 0,
      windowHeight: 0,
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

  onFlick(e) {
    if (e.activeIndex !== 1) {
      const liveData = {
        ...this.props.yelpData[this.index],
        preference: (e.activeIndex) ? -1 : 1,
        intensity: Math.floor(((RGB_MAX - this.otherRGB) / (RGB_MAX - RGB_MIN)) * 100),
      };

      const socketVote = {
        displayTitle: liveData.displayTitle,
        preference: liveData.preference,
        intensity: liveData.intensity,
      };

      emitLiveData(socketVote);

      // this.props.addLiveData(liveData);
//       console.log(
// `DATA:
// type      - ${this.props.yelpData[this.index].displayTitle}
// direction - ${(e.activeIndex) ? 'Dislike' : 'Like'}
// intensity - ${Math.floor(((RGB_MAX - this.otherRGB) / (RGB_MAX - RGB_MIN)) * 100)}%`,
//       );
      this.new = true;
      this.otherRGB = RGB_MAX;
      this.setState({
        carouselPosition: e.activeIndex,
        carouselAnimation: { duration: 0 },
      }, () => {
        if (this.index < this.props.yelpData.length - 1) {
          this.index++;
        } else {
          this.props.router.push('/live');
        }
        this.setState({
          cardName: this.props.yelpData[this.index].displayTitle,
          rgb: RGB,
        }, () => {
          setTimeout(this.setState.bind(this, {
            carouselPosition: 1,
            carouselAnimation: {},
          }), 50);
        });
      });
    }
  }

  getDistFromMid() {
    return (
      Math.floor((
        ((this.x - this.diffx) - (this.state.windowWidth / 2))
        / (this.state.windowWidth / 2)
      ) * 100 * 2)
    );
  }

  makeRGB(color, thisColor, speed) {
    // eslint-disable-next-line no-nested-ternary
    return (color === thisColor) ?
      ((this.state.rgb[thisColor] + (speed * 2) < RGB_MAX) ?
        this.state.rgb[thisColor] + (speed * 2) :
        RGB[thisColor]) :
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
    } else if (this.loaded && this.new) this.setState({ rgb: RGB });
  }

  move(px = this.x, py = this.y) {
    const distFromMid = this.getDistFromMid();
    if (distFromMid >= 50) this.updateRGB(GREEN, 2);
    else if (distFromMid <= -50) this.updateRGB(RED, 2);
    else this.updateRGB(BLUE, 2);
    if (this.loaded && this.new) this.setState({ rgb: RGB });
    if (this.loaded && !this.new && px === this.x && py === this.y && this.holding) {
      setTimeout(this.move.bind(this, px, py), 1000 / 60);
    }
  }

  onHold() {
    this.diffx = this.x - (this.state.windowWidth / 2);
    if (this.otherRGB > RGB_MIN + 1) this.otherRGB -= 2;
    this.updateRGB(BLUE, 2);
    if (this.loaded && this.new) this.setState({ rgb: RGB });
    if (this.loaded && !this.new && this.stationary && this.holding) {
      setTimeout(this.onHold.bind(this), 1000 / 60);
    }
  }

  onHoldDone() {
    if (this.otherRGB < RGB_MAX) this.otherRGB++;
    this.updateRGB(BLUE);
    if (this.loaded && this.new) this.setState({ rgb: RGB });
    if (this.loaded && !this.new && !this.holding &&
        JSON.stringify(this.state.rgb) !== JSON.stringify(RGB)) {
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
    if (Math.abs(distFromMid) > 9) { // TODO: define by pixels
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

  /**
   * Convert a percentage of the screen size to a pixel value
   * @param {number} [percentage=100] - the percentage of the screen size
   * @return {number} A pixel value for use in styling
   */
  percentToPixel(percentage = 100) {
    const woh = this.state.windowHeight > this.state.windowWidth ?
      this.state.windowWidth :
      this.state.windowHeight;
    const per = percentage / 100;
    return Math.floor(woh * per);
  }

  marginTop() {
    return `${Math.floor((this.state.windowHeight / 2) - (this.percentToPixel(SIZE_PERCENT) / 2))}px`;
  }

  marginLeft() {
    return `${Math.floor((this.state.windowWidth / 2) - (this.percentToPixel(SIZE_PERCENT) / 2))}px`;
  }

  // !TODO: configure autoscroll to scroll more easily at edges
  // TODO: add a loading bar to the bottom of the card showing how intense it is
  //       OR make the border a loading bar


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
          index={this.state.carouselPosition}
          onPostChange={this.onFlick.bind(this)}
          animationOptions={this.state.carouselAnimation}
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
            <div style={{ height: this.marginTop() }}/>
            <div style={{
              height: `${this.percentToPixel(SIZE_PERCENT + 3)}px`,
              width: `${this.percentToPixel(SIZE_PERCENT)}px`,
              marginLeft: this.marginLeft(),
              boxShadow: `0 0 0 2px rgb(${this.state.rgb[0]},${this.state.rgb[1]},${this.state.rgb[2]}), 0 0 0 10000em rgb(60, 64, 65)`,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: '100%',
                background: 'rgba(0,0,0,0)',
                boxShadow: '0 0 2em 0 #333 inset',
              }}/>
            </div>
          </CarouselItem>
          <CarouselItem/>
        </Carousel>
        <div style={{ height: this.marginTop() }}/>
        <div style={{
          fontSize: `${this.percentToPixel(5.5)}px`,
          textAlign: 'center',
          color: 'rgb(60, 64, 65)', // TODO: get color from OnsenUI
          position: 'fixed',
          height: `${this.percentToPixel(SIZE_PERCENT + 3)}px`,
          width: `${this.percentToPixel(SIZE_PERCENT)}px`,
          marginLeft: this.marginLeft(),
          zIndex: '2',
          boxShadow: '0 0 0 2px rgb(38, 39, 40), 0 0 0 10000em #ccc',
          background: '#888',
        }}>
          <div style={{
            height: `${this.percentToPixel(SIZE_PERCENT - 10)}px`,
            width: `${this.percentToPixel(SIZE_PERCENT)}px`,
            backgroundImage: `url("${getUrl(this.props.yelpData[this.index].imageUrl)}")`,
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
                  fontSize: `${this.percentToPixel(8)}px`,
                  position: 'absolute',
                  marginLeft: `${this.percentToPixel(8)}px`,
                  height: `${this.percentToPixel(10)}px`,
                  width: `${this.percentToPixel(50)}px`,
                  top: `${this.percentToPixel(SIZE_PERCENT - 20)}px`,
                  background: 'rgba(60, 64, 65, 0.71)',
                  // borderTopRightRadius: `${this.percentToPixel(1)}px`,
                  // borderTopLeftRadius: `${this.percentToPixel(1)}px`,
                  boxShadow: '0 0 0 2px rgb(38, 39, 40)',
                  color: '#ccc',
                }}
              >
                {ratingToArray(this.props.yelpData[this.index].rating).map((e, i) => (
                  <Icon
                    icon={`fa-star${e ? '-half' : ''}`}
                    fixed-width="false"
                    // size={this.percentToPixel(8)}
                    key={i}
                    style={{
                      position: 'relative',
                      paddingTop: `${this.percentToPixel(1)}px`,
                      // height: `${this.percentToPixel(8)}px`,
                      // width: `${this.percentToPixel(8)}px`,
                      paddingLeft: `${this.percentToPixel(1)}px`,
                      paddingRight: `${this.percentToPixel(1)}px`,
                      left: `${e ? `-${this.percentToPixel(1.5)}px` : '0'}`,
                      zIndex: `${e ? 7 : 8}`,
                      textShadow: '0 0 .2em #333',
                    }}
                  />
                ))}
              </div> :
              <div/>
          }
          <div style={{ padding: `${this.percentToPixel(1)}px` }}>
            {this.state.cardName}
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
  // yelpData {
  //   displayTitle: String,
  //   imageUrl: String,
  //   rating: Number,
  //   categories: Array,
  //   displayAddress: Array,
  //   displayPhone: String,
  //   snippetText: String,
  //   mobileUrl: String,
  // }
  yelpData: state.yelpData,
  liveData: state.liveData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Collaborate);
