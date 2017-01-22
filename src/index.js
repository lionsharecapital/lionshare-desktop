import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Flex } from 'reflexbox';

import stores from 'stores';

import Application from './scenes/Application';

let DevTools;
if (__DEV__) {
  DevTools = require('mobx-react-devtools').default;
}

render((
  <Flex auto>
    <Provider { ...stores }>
      <Application />
    </Provider>
    { false && <DevTools position={{ bottom: 0, right: 0 }} /> }
  </Flex>
), document.getElementById('root'));
