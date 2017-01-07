const styles = {};

export const bodyStyle = {
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '24px',
};
styles.body = bodyStyle;

export const bottomNavStyle = {
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-around',
};

export const login = {
  'background-image': 'url("http://68.media.tumblr.com/b4f33d654b4448794313633770cc8572/tumblr_oh34v07h9w1u9ooogo1_540.gif")',
  position: 'fixed',
  width: '100%',
  height: '100vh',
};

export const fbLogin = {
  background: 'none',
  'margin-bottom': '30px',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-around',
};

export const splashText = {
  color: 'white',
  'margin-top': '150px',
  'margin-bottom': '100px',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '90px',
  'text-align': 'center',
  'text-shadow': '0px 0px 3px #000',
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
  'background-color': 'rgba(0,0,0,.5)',
  margin: 'auto',
};

export const tagline = {
  'text-align': 'center',
  fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: '300',
  fontSize: '24px',
  color: 'white',
};

// export const titleStyle = {
//   ...styles.body,
// };
// styles.title = titleStyle;

export default styles;
