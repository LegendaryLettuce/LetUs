import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { Page, Dialog, Button }  from 'react-onsenui';
// Styles
import { titleStyle }   from '../styles/styles';

class Hello extends Component {

  constructor(props) {
    super(props);
    // ons.notification.alert(this.props.hello);
  }

  render() {
    return (
      <Page>
        <Dialog
          isOpen={true}
        >
          <div style={{ ...titleStyle, textAlign: 'center', margin: '20px' }}>
            <p style={{ opacity: 0.5 }}>{this.props.hello}</p>
          </div>
        </Dialog>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Hello);
