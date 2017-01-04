import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { LazyList, ListItem, List, Switch, Icon } from 'react-onsenui';
// Styles
import { titleStyle }   from '../../../styles/styles';

class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
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
              <span className="list__item__subtitle">Subtitle</span>
            </div>
            <label className="right">
              <Switch />
            </label>
          </ListItem>
        )}
      />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(Friends);

  // renderRow(idx) {
  //   return (
  //     <ListItem key={idx}>
  //       {this.props.friends[idx]}
  //     </ListItem>
  //   );
  // }
        // <h3>{this.props.friends}</h3>

        // <LazyList
        //   length={this.props.friends.length}
        //   renderRow={this.renderRow.bind(this)}
        //   calculateItemHeight={() => 50}

        // />
