import React, { Component } from 'react';
// Onsen UI
import {
  Page,
  Carousel,
  CarouselItem,
  Icon,
}                       from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { addLiveData, load } from '../../redux/actions';
// Utils
import {
  getUrl,
  ratingToArray,
  getStore,
}                       from '../../utils/utils';
// Sockets
import { emitLiveData } from '../../sockets/sockets';

const SIZE_PERCENT = 66;

const backStyle = {
  height: '100%',
  width: '100%',
  position: 'fixed',
};

class Collaborate extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.new = true;
    this.loaded = false;
    this.holding = false;
    this.stationary = true;
    this.carousel = null;
    this.state = {
      intensity: 0,
      neutral: 'block',
      like: 'none',
      dislike: 'none',
      carouselPosition: 1,
      carouselAnimation: {},
      windowWidth: 0,
      windowHeight: 0,
      widthDiff: 0,
      marginDiff: 0,
    };
  }

  componentWillMount() {
    if (!this.props.loaded) this.props.load(getStore());
  }

  componentDidMount() {
    this.loaded = true;
    this.carousel = document.getElementsByTagName('ons-carousel-item')[1];
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
        intensity: Math.floor(this.state.intensity),
      };

      const socketVote = {
        displayTitle: liveData.displayTitle,
        preference: liveData.preference,
        intensity: liveData.intensity,
      };

      emitLiveData(socketVote);

      this.new = true;
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
          intensity: 0,
        }, () => {
          setTimeout(this.setState.bind(this, {
            carouselPosition: 1,
            carouselAnimation: {},
          }), 50);
        });
      });
    }
  }

  move() {
    if (this.loaded) {
      if (this.new) {
        this.setState({ intensity: 0 });
        this.setState({
          neutral: 'block',
          like: 'none',
          dislike: 'none',
        });
      } else {
        const pos = this.getPos();
        const per = this.percentToPixel(SIZE_PERCENT) / 2;
        if (pos >= per) {
          this.setState({
            neutral: 'none',
            like: 'block',
            dislike: 'none',
          });
        } else if (pos <= -per) {
          this.setState({
            neutral: 'none',
            like: 'none',
            dislike: 'block',
          });
        } else {
          this.setState({
            neutral: 'block',
            like: 'none',
            dislike: 'none',
          });
        }
      }
    }
  }

  onHold() {
    if (this.loaded) {
      this.setState({
        neutral: 'block',
        like: 'none',
        dislike: 'none',
      });
      if (this.new) this.setState({ intensity: 0 });
      else if (this.state.intensity > 100) this.setState({ intensity: 100 });
      else if (this.state.intensity < 100) {
        this.setState({ intensity: this.state.intensity + 1.5 });
        if (this.stationary && this.holding) {
          setTimeout(this.onHold.bind(this), 1000 / 60);
        }
      }
    }
  }

  onHoldDone() {
    if (this.loaded) {
      this.setState({
        neutral: 'block',
        like: 'none',
        dislike: 'none',
      });
      if (this.new) this.setState({ intensity: 0 });
      else if (this.state.intensity < 0) this.setState({ intensity: 0 });
      else if (this.state.intensity > 0) {
        this.setState({ intensity: this.state.intensity - 1 });
        if (!this.holding) setTimeout(this.onHoldDone.bind(this), 1000 / 60);
      }
    }
  }

  onHoldStart(e) {
    e.preventDefault();
    this.new = false;
    this.holding = true;
    this.stationary = true;
    this.onHold();
  }

  onHoldEnd() {
    this.holding = false;
    this.stationary = true;
    this.onHoldDone();
  }

  onMove() {
    if (Math.abs(this.getPos()) > 9) {
      this.stationary = false;
      this.move();
    } else if (this.stationary === false) {
      this.move();
    }
  }

  /**
   * Get the position of the carousel
   * @return {number} pixel values from negative to the left to positive in the right
   */
  getPos() {
    let pos = Number(/\(\s*([^p]+?)\s*p/.exec(this.carousel.style.transform)[1]);
    pos += Math.floor(this.state.windowWidth);
    return pos;
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
    return Math.floor((this.state.windowHeight / 2) - (this.percentToPixel(SIZE_PERCENT) / 2));
  }

  marginLeft() {
    return Math.floor((this.state.windowWidth / 2) - (this.percentToPixel(SIZE_PERCENT) / 2));
  }

  icons(div = 1) {
    return Math.floor(this.percentToPixel(78 - SIZE_PERCENT) / div);
  }

  render() {
    return (
      <Page>
        <div style={{
          ...backStyle,
          background: 'rgb(200,200,200)',
        }}/>
        <div style={{
          ...backStyle,
          height: `${(this.state.windowHeight - (this.marginTop() + this.percentToPixel(SIZE_PERCENT + 8))) + this.percentToPixel((((SIZE_PERCENT + 13) * this.state.intensity) / 100))}px`,
          bottom: '0',
        }}>
          <div style={{
            height: '100%',
            width: '100%',
            display: `${this.state.neutral}`,
            background: `rgba(232, 163, 32, ${this.state.intensity / 100})`,
          }}/>
          <div style={{
            height: '100%',
            width: '100%',
            display: `${this.state.like}`,
            background: `rgba(46, 209, 65, ${this.state.intensity / 100})`,
          }}/>
          <div style={{
            height: '100%',
            width: '100%',
            display: `${this.state.dislike}`,
            background: `rgba(204, 60, 54, ${this.state.intensity / 100})`,
          }}/>
        </div>
        <div style={{
          ...backStyle,
          fontSize: `${this.icons()}px`,
        }}>
          <Icon icon="fa-times-circle-o" style={{
            position: 'fixed',
            color: '#333',
            marginTop: `${Math.floor(this.state.windowHeight / 2) - this.icons(2)}px`,
            marginLeft: `${this.marginLeft() - this.percentToPixel(4) - this.icons()}px`,
          }}/>
          <Icon icon="fa-check-circle-o" style={{
            position: 'fixed',
            color: '#333',
            marginTop: `${Math.floor(this.state.windowHeight / 2) - this.icons(2)}px`,
            marginRight: `${this.marginLeft() - this.percentToPixel(4) - this.icons()}px`,
            right: '0',
          }}/>
        </div>
        <Carousel
          fullscreen
          swipeable
          autoScroll
          autoScrollRatio={(this.percentToPixel(SIZE_PERCENT) / this.state.windowWidth) * 0.5}
          overscrollable
          index={this.state.carouselPosition}
          onPostChange={this.onFlick.bind(this)}
          animationOptions={this.state.carouselAnimation}
          onTouchStart={this.onHoldStart.bind(this)}
          onTouchMove={this.onMove.bind(this)}
          onTouchEnd={this.onHoldEnd.bind(this)}
          onMouseDown={this.onHoldStart.bind(this)}
          onMouseMove={this.onMove.bind(this)}
          onMouseUp={this.onHoldEnd.bind(this)}
          style={{ zIndex: '3' }}
        >
          <CarouselItem/>
          <CarouselItem>
            <div style={{ height: `${this.marginTop() - this.percentToPixel(5)}px` }}/>
            <div style={{
              height: `${this.percentToPixel(SIZE_PERCENT + 13)}px`,
              width: `${this.percentToPixel(SIZE_PERCENT + 10) + this.state.widthDiff}px`,
              marginLeft: `${(this.marginLeft() + this.state.marginDiff) - this.percentToPixel(5)}px`,
              boxShadow: '0 0 0 10000em rgb(60, 64, 65)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: '100%',
                borderRadius: `${this.percentToPixel(12)}px`,
                background: 'rgba(0,0,0,0)',
                boxShadow: '0 0 2em 0 #333 inset, 0 0 0 10em rgb(60, 64, 65)',
              }}/>
            </div>
          </CarouselItem>
          <CarouselItem/>
        </Carousel>
        <div style={{ height: `${this.marginTop()}px` }}/>
        {
          this.props.loaded ?
          <div style={{
            fontSize: `${this.percentToPixel(5.5)}px`,
            textAlign: 'center',
            color: 'rgb(60, 64, 65)',
            position: 'fixed',
            height: `${this.percentToPixel(SIZE_PERCENT + 3)}px`,
            width: `${this.percentToPixel(SIZE_PERCENT)}px`,
            marginLeft: `${this.marginLeft()}px`,
            zIndex: '2',
          }}>
            <div style={{
              height: '100%',
              width: '100%',
              borderRadius: `${this.percentToPixel(10)}px`,
              boxShadow: '0 0 0 2px rgb(38, 39, 40)',
              overflow: 'hidden',
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
                      borderTopRightRadius: `${this.percentToPixel(1)}px`,
                      borderTopLeftRadius: `${this.percentToPixel(1)}px`,
                      boxShadow: '0 0 0 2px rgb(38, 39, 40)',
                      color: '#ccc',
                    }}
                  >
                    {ratingToArray(this.props.yelpData[this.index].rating).map((e, i) => (
                      <Icon
                        icon={`fa-star${e ? '-half' : ''}`}
                        fixed-width="false"
                        key={i}
                        style={{
                          position: 'relative',
                          paddingTop: `${this.percentToPixel(1)}px`,
                          paddingLeft: `${this.percentToPixel(1)}px`,
                          paddingRight: `${this.percentToPixel(1)}px`,
                          zIndex: `${e ? 7 : 8}`,
                          textShadow: '0 0 .2em #333',
                        }}
                      />
                    ))}
                  </div> :
                  <div/>
              }
              <div style={{ padding: `${this.percentToPixel(1)}px` }}>
                {this.props.yelpData[this.index].displayTitle}
              </div>
            </div>
          </div> :
          <div/>
        }
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  load: (state) => {
    dispatch(load(state));
  },
  addLiveData: (liveData) => {
    dispatch(addLiveData(liveData));
  },
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  yelpData: state.yelpData,
  liveData: state.liveData,
  friends: state.friends,
});

export default connect(mapStateToProps, mapDispatchToProps)(Collaborate);
