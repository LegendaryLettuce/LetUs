import React, { Component }                          from 'react';
// Onsen UI
import TextCarousel                                  from 'react-text-carousel';
import { Page, Icon, Button, BottomToolbar }         from 'react-onsenui';
// Axios for requests
import axios                                         from 'axios';
// Redux
import { connect }                                   from 'react-redux';
import { updateUser, load, loadFB, updateEventHash } from '../../redux/actions';
// Utils
import { postLogin, getStore, loadFacebook }         from '../../utils/utils';
// Styles
import { login, splashText, fbLogin, tint, tagline } from '../../styles/styles';
import '../../styles/loginMobile.css';

const button = {
  fontSize: 'x-large',
  backgroundColor: '#3b5998',
  borderRadius: '.2em',
};

const phrases = [' eat.', ' drink.', ' play.']; // Required
const interval = 2000; // The time to wait before rendering the next string
const typistProps = {}; // Props that are passed to the react-typist component

class LoginView extends Component {

  componentWillMount() {
    // Load cached redux from Session Store
    if (!this.props.loaded) this.props.load(getStore());
    axios.get('/login/check-event-hash')
      .then((res) => {
        this.redirectEventHash = res.data;
        // console.log('CHECKING EVENT HASH:', res.data);
      });
  }

  componentDidMount() {
    // Load Facebook API if not loaded yet
    if (!this.props.fbLoaded) loadFacebook(this.props.loadFB.bind(this, true));
  }

  fbLogin() {
    const result = {};
    FB.login((lRes) => {
      if (lRes.status === 'connected' && lRes.authResponse && lRes.authResponse.accessToken) {
        result.id = lRes.authResponse.userID;
        FB.api(
          `/${lRes.authResponse.userID}`,
          { fields: 'first_name,last_name,picture' },
          (uRes) => {
            if (uRes && !uRes.error) {
              result.name = `${uRes.first_name} ${uRes.last_name}`;
              result.pic = uRes.picture.data.url;
              FB.api(
                `/${lRes.authResponse.userID}/friends`,
                (fRes) => {
                  if (fRes && !fRes.error) {
                    result.friends = fRes.data;
                    postLogin(result)
                      .then(() => {
                        // console.log('CHECKING EVENT HASH AFTER LOGIN:', this.redirectEventHash);
                        this.props.updateUser(result);
                        if (this.redirectEventHash && this.redirectEventHash.length === 6) {
                          this.props.router.push(`/c/${this.redirectEventHash}`);
                        } else {
                          this.props.router.push('/home');
                        }
                      });
                  }
                },
              );
            }
          },
        );
      }
    }, { scope: 'public_profile,user_friends,email' });
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Page>
        <div style={login}>
          <div style={tint}>
            <div className='wordDiv' style={splashText}>
              Let Us
                <TextCarousel phrases={phrases} interval={interval} typistProps={typistProps} />
              <div style={tagline}>Collaborative event planning with friends.</div>
            </div>
            {
              this.props.fbLoaded ?
              <BottomToolbar style={fbLogin}>
                <Button style={button} onClick={this.fbLogin.bind(this)}>
                  <Icon icon="fa-facebook-square"/> Log In
                </Button>
              </BottomToolbar> :
              <div
                // TODO: Add loading symbol when button is not loaded
              />
            }
          </div>
        </div>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (token) => {
    dispatch(updateUser(token));
  },
  load: (state) => {
    dispatch(load(state));
  },
  loadFB: (loaded) => {
    dispatch(loadFB(loaded));
  },
  updateEventHash: (eventHash) => {
    dispatch(updateEventHash(eventHash));
  },
});

const mapStateToProps = state => ({
  loaded: state.loaded,
  fbLoaded: state.fbLoaded,
  eventHash: state.eventHash,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
