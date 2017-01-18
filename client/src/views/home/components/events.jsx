import React, { Component } from 'react';
// Onsen UI
import { ListItem, List } from 'react-onsenui';

const circle = {
  borderRadius: '12px',
  padding: '2px 6px 2px 6px',
  textAlign: 'center',
  background: 'gray',
  marginRight: '2px',
  display: 'inline-block',
};

const divStyle = {
  display: 'inline-block',
};

const Events = props => (
      <List
        dataSource={props.events}
        renderRow={
          (event, idx) => (
            <ListItem key={idx} modifier={idx === props.events.length - 1 ? 'longdivider' : null} onClick={() => {
              props.handleTouch(event);
            }}>
              <div className="left">
                <img className="list__item__image" alt="Top Event Image" src={JSON.parse(event.topEvent)[0].imageUrl} />
              </div>
              <div className="center">
                <span className="list__item__title">{JSON.parse(event.topEvent)[0].displayTitle}</span>
                <span className="list__item__subtitle">
                  Attendees<br />
                  <span style={circle}>{JSON.parse(event.creator).name}</span>
                  <div style={divStyle}>{JSON.parse(event.attendees).map((attendee, i) => (
                    <span style={circle} key={i}>{attendee.name}</span>
                  ))}</div>
                </span>
              </div>
            </ListItem>
          )
        }
      />
    );

export default Events;

