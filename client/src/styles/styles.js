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

export const login = {
  backgroundImage: 'url("http://68.media.tumblr.com/b4f33d654b4448794313633770cc8572/tumblr_oh34v07h9w1u9ooogo1_540.gif")',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  width: '100%',
  height: '100vh',
};

export const fbLogin = {
  background: 'none',
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};

export const splashText = {
  color: 'white',
  marginTop: '40%',
  marginBottom: '10%',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '90px',
  textAlign: 'center',
  textShadow: '0px 0px 3px #000',
};

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

export const tagline = {
  textAlign: 'center',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '24px',
  color: 'white',
};

export const buttonStyle = {
  padding: '0px 20px 0px 20px',
  position: 'fixed',
  bottom: '0',
  height: '35px',
  marginBottom: '44px',
  zIndex: '5',
  marginLeft: '0',
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
};
// export const titleStyle = {
//   ...styles.body,
// };
// styles.title = titleStyle;

export default styles;
