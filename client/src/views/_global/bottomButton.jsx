import React            from 'react';
// Onsen UI
import { Button }       from 'react-onsenui';
// Styles
import { buttonStyle }  from '../../styles/styles';

/**
 * Creates a button used for routing that is placed above the bottomNav
 * @param {Object} props - React props
 * @param {string} props.title - Text to be displayed
 * @param {requestCallback} props.routeHandler - Callback to route to the next page
 * @extends {React.Component}
 */
const BottomButton = ({ title, routeHandler }) => (
  <Button style={buttonStyle} modifier='large' onClick={routeHandler}>{title}</Button>
);

export default BottomButton;
