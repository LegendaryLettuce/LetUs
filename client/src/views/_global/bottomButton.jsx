import React            from 'react';
// Onsen UI
import { Button }       from 'react-onsenui';
// Styles
import { buttonStyle }  from '../../styles/styles';

/**
 * Creates a button used for routing that is placed above the bottomNav
 * @param {Object} props - React props
 * @param {string} props.title - Text to be displayed
 * @param {requestCallback} props.route - Callback to route to the next page
 * @extends {React.Component}
 */
const BottomButton = ({ title, route }) => (
  <Button style={buttonStyle} modifier='large' onClick={route}>{title}</Button>
);

export default BottomButton;
