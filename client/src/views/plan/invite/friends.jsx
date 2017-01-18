import React, { Component } from 'react';
// React Router
import { browserHistory, Link } from 'react-router';
// Onsen UI
import { ListItem, List, Switch, Icon, Input } from 'react-onsenui';
// Redux
import { connect }      from 'react-redux';
import { updateInviteFriends } from '../../../redux/actions';
// Styles
// import { }   from '../../../styles/styles';

class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inviteFriends: [],
      checked: [],
    };
    const checkBoxes = [];
    this.props.friends.forEach((friend) => {
      checkBoxes.push(false);
    });
    this.inviteFriends = this.inviteFriends.bind(this);
  }

  inviteFriends(friend, key) {
    const friendIndex = this.state.inviteFriends.indexOf(friend);
    if (friendIndex === -1) {
      this.state.inviteFriends.push(friend);
    } else if (friendIndex !== -1) {
      this.state.inviteFriends.splice(friendIndex, 1);
    }
    this.props.updateInviteFriends(this.state.inviteFriends);
    const checkState = this.state.checked;
    checkState[key] = !this.state.checked[key];
    this.setState({
      checked: checkState,
    });
  }

  render() {
    return (
      <div>
        <List
          dataSource={this.props.friends}
          renderRow={(row, idx) => (
            <ListItem key={idx} modifier='tappable' onClick={() =>
              this.inviteFriends({ row }.row, idx)
            }>
              <div className="left">
                <Icon icon="md-face" className="list__item__icon" />
              </div>
              <div className="center">
                <span className="list__item__title">{row.name}</span>
                <span className="list__item__subtitle">Ready to party</span>
              </div>
              <label className="right">
                <Input inputId={`checkbow-${row}`} type='checkbox' checked={this.state.checked[idx]}/>
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
  friends: state.user.friends,
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
