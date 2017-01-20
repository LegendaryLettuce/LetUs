const styles = {};

export const bodyStyle = {
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '24px',
};
styles.body = bodyStyle;

export const bottomNavStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  position: 'fixed',
};
styles.bottomNavStyle = bottomNavStyle;

export const login = {
  backgroundImage: 'url("http://68.media.tumblr.com/b4f33d654b4448794313633770cc8572/tumblr_oh34v07h9w1u9ooogo1_540.gif")',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  width: '100%',
  height: '100%',
};
styles.login = login;

export const fbLogin = {
  background: 'none',
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};
styles.fbLogin = fbLogin;

export const splashText = {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  color: 'white',
  paddingBottom: '240px',
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  fontFamily: 'HelveticaNeue-Light, "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '90px',
  textAlign: 'center',
  textShadow: 'rgb(0, 0, 0) 0px 0px 3px',
};
styles.splashText = splashText;

export const tint = {
  content: '""',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,.5)',
  margin: 'auto',
};
styles.tint = tint;

export const tagline = {
  paddingTop: '10px',
  textAlign: 'center',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '24px',
  color: 'white',
};
styles.tagline = tagline;

export const buttonStyle = {
  padding: '0px 20px 0px 20px',
  position: 'fixed',
  bottom: '0',
  height: '40px',
  marginBottom: '44px',
  zIndex: '5',
  marginLeft: '0',
  width: '100%',
  textAlign: 'center',
  fontSize: 'large',
  fontWeight: 'bold',
  borderRadius: '0',
};
styles.buttonStyle = buttonStyle;

export const listContainer = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};
styles.listContainer = listContainer;

export const listStyle = {
  overflowY: 'scroll',
};
styles.listStyle = listStyle;

export const listBottom = {
  minHeight: '84px',
  width: '100%',
};
styles.listBottom = listBottom;

export default styles;
