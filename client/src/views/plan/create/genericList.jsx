import React, { Component }       from 'react';
// Redux
import { connect }      from 'react-redux';
// Onsen UI
import ons              from 'onsenui';
import { List, ListItem } from 'react-onsenui';

class GenericList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon(iconData) {
    return (
      <ons-icon
        icon={ iconData.icon || 'fa-exclamation-circle' }
        size='30px'
        fixed-width='false'
        className='list__item__thumbnail'
        style={ iconData.style}>
      </ons-icon>
    );
  }

  renderImage(imageUrl) {
    return (
      <img src={imageUrl} className='list__item__thumbnail' />
    );
  }

  renderRow(rowData, index) {
    // Randomly Select a Cat picture for place holder
    const x = 40 + Math.round(5 * (Math.random() - 0.5));
    const y = 40 + Math.round(5 * (Math.random() - 0.5));

    const imageUrl = rowData.imageUrl || `http://placekitten.com/g/${x}/${y}`;

    const leftTumbnail = rowData.useIcon ?
      this.renderIcon(rowData.useIcon) : this.renderImage(imageUrl);

    return (
      <ListItem key={index} modifier='longdivider' onClick={() => {
        this.props.handleTouch(rowData);
      }} tappable>
      <div className='left'>
          {leftTumbnail}
        </div>
        <div className='center'>
          {rowData.displayTitle}
        </div>
      </ListItem>
    );
  }

  render() {
    return (
      <List
        dataSource={this.props.data}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => ({
  hello: state.hello,
});

export default connect(mapStateToProps)(GenericList);
