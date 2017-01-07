import React, { Component }       from 'react';

// React Router
import { browserHistory, Link } from 'react-router';

// Onsen UI
import ons              from 'onsenui';
import { ListItem, List, Switch, Icon, Input } from 'react-onsenui';

// Redux
import { connect }      from 'react-redux';
import { updateInviteFriends }
                        from '../../../redux/actions';

// Styles
import { }   from '../../../styles/styles';

class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inviteFriends: [],
    };
    this.inviteFriends = this.inviteFriends.bind(this);
  }

  inviteFriends(friend) {
    const friendIndex = this.state.inviteFriends.indexOf(friend);
    if (friendIndex === -1) {
      this.state.inviteFriends.push(friend);
    } else if (friendIndex !== -1) {
      this.state.inviteFriends.splice(friendIndex, 1);
    }
    console.log(this.state.inviteFriends);
    this.props.updateInviteFriends(this.state.inviteFriends);
  }

  render() {
    return (
      <div>
        <List
          dataSource={this.props.friends}
          renderRow={(row, idx) => (
            <ListItem modifier={idx === this.props.friends.length - 1 ? 'longdivider' : null}>
              <div className="left">
                <Icon icon="md-face" className="list__item__icon" />
              </div>
              <div className="center">
                <span className="list__item__title">{row}</span>
                <span className="list__item__subtitle">Ready to party</span>
              </div>
              <label className="right">
          <Input inputId={`checkbow-${row}`} type='checkbox' onClick={() =>
          this.inviteFriends({ row }.row)
          } />
              </label>
            </ListItem>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateInviteFriends: (friends) => {
    dispatch(updateInviteFriends(friends));
  },
});

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
