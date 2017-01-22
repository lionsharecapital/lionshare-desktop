import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Flex } from 'reflexbox';

import styles from './ErrorMessage.scss';

const ErrorMessage = ({ message, onRetry }) => (
  <Flex auto column align="center" justify="center">
    <div className={ styles.iconContainer }>
      <svg xmlns="http://www.w3.org/2000/svg" width="79" height="66" viewBox="0 0 79 66">
        <g fill="none" fill-rule="evenodd" transform="translate(1.75 1.5)">
          <polygon
            stroke="#FFBD2E"
            strokeWidth="2"
            points="75.224 62.912 37.724 .412 .224 62.912"
          />
          <path
            fill="#FFBD2E" d="M36.1446508,22.0382173 L36.4112524,42.4229829 L39.0567602,42.4229829 L39.3233618,22.0382173 L36.1446508,22.0382173 Z M37.7237524,51.8975923 C39.0977758,51.8975923 40.2051977,50.728647 40.2051977,49.2931001 C40.2051977,47.8575533 39.0977758,46.6886079 37.7237524,46.6886079 C36.349729,46.6886079 35.2423071,47.8575533 35.2423071,49.2931001 C35.2423071,50.728647 36.349729,51.8975923 37.7237524,51.8975923 Z"
          />
        </g>
      </svg>
    </div>
    <div className={ styles.message }>
      { message }
    </div>
    <div
      className={ styles.button }
      role="button"
      onClick={ onRetry }
    >
      Reload
    </div>
  </Flex>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default observer(ErrorMessage);
