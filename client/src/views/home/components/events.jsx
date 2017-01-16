import React from 'react';
// Onsen UI
import { ListItem, List, Icon } from 'react-onsenui';
// Styles
// import { }              from '../../../styles/styles';

const Events = ({ events }) => (
  <List
    dataSource={events}
    renderRow={
      (event, idx) => (
        <ListItem key={idx} modifier={idx === events.length - 1 ? 'longdivider' : null}>
          <div className="left">
            <img className="list__item__image" src={(JSON.parse(event.data)[idx]).imageUrl} />
          </div>
          <div className="center">
            <span className="list__item__title">{(JSON.parse(event.data)[idx]).displayTitle}</span>
            <span className="list__item__subtitle">{(JSON.parse(event.data)[idx]).snippetText}</span>
          </div>
        </ListItem>
      )
    }
  />
);

export default Events;
