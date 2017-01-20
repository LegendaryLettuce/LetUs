import React, { Component } from 'react';
// Redux
import { connect }          from 'react-redux';
import { List, ListItem }   from 'react-onsenui';

class GenericList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
  }
  // eslint-disable-next-line class-methods-use-this
  renderIcon(iconData) {
    return (
      <ons-icon
        icon={ iconData.icon || 'fa-exclamation-circle' }
        size={ iconData.size || '25px'}
        fixed-width='false'
        className='list__item__thumbnail'
        style={ iconData.style}>
      </ons-icon>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderImage(imageUrl) {
    return (
      <img src={imageUrl} className='list__item__thumbnail' alt=''/>
    );
  }

  renderRow(rowData, index) {
    // Randomly Select a Cat picture for place holder
    const x = 40 + Math.round(5 * (Math.random() - 0.5));
    const y = 40 + Math.round(5 * (Math.random() - 0.5));

    const textStyle = rowData.textStyle || {};

    const containerStyle = rowData.containerStyle || {};

    const imageUrl = rowData.imageUrl || `http://placekitten.com/g/${x}/${y}`;

    const leftTumbnail = rowData.useIcon ?
      this.renderIcon(rowData.useIcon) : this.renderImage(imageUrl);

    return (
      <ListItem
        key={index}
        onClick={() => {
          this.props.handleTouch(rowData);
        }}
        style={containerStyle}
        modifier='longdivider'
        tappable
      >
        <div className='left'>
          {leftTumbnail}
        </div>
        <div className='center' style={textStyle}>
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
  edp: state.edp,
});

export default connect(mapStateToProps)(GenericList);
