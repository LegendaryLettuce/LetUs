import React, { Component } from 'react';
// Onsen UI
import TextCarousel         from 'react-text-carousel';
import { Page, Icon, Button, BottomToolbar }             from 'react-onsenui';
// Redux
import { connect }          from 'react-redux';
import { updateUser }       from '../../redux/actions';
// Utils
import { postLogin }        from '../../utils/utils';
// Styles
import { login, splashText, fbLogin, tint, tagline } from '../../styles/styles';

// const images = ["http://68.media.tumblr.com/233a17b2322253404dfc6ce97501613b/tumblr_oh350r0AtK1u9ooogo1_540.gif", ]

// const timedBackground = () => {
//   setTimeout(() => {
//     console.log(x);
//   });
// };

const button = {
  fontSize: 'x-large',
  backgroundColor: '#3b5998',
  borderRadius: '.2em',
};

const phrases = [' eat.', ' drink.', ' play.']; // Required
const interval = 2000; // The time to wait before rendering the next string
const typistProps = {}; // Props that are passed to the react-typist component

class LoginView extends Component {
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: '1233081016779123',
        cookie: true,
        xfbml: true,
        version: 'v2.8',
      });
      FB.AppEvents.logPageView();
    };
    (((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk'));
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
                        this.props.updateUser(result);
                        this.props.router.push('/create');
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
          <div id="fb-root"/>
          <script/>
          <div style={tint}>
            <div style={splashText}>
              Let Us
              <TextCarousel phrases={phrases} interval={interval} typistProps={typistProps} />
            </div>
            <div style={tagline}>Collaborative event planning with friends.</div>
            <BottomToolbar style={fbLogin}>
              <Button style={button} onClick={this.fbLogin.bind(this)}>
                <Icon icon="fa-facebook-square"/> Log In
              </Button>
            </BottomToolbar>
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
});

const mapStateToProps = state => ({
  // user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
