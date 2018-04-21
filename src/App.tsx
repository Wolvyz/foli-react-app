import * as React from 'react';
import './App.css';

import Body from './Body/Body';
import HeaderWrapper from './Header/HeaderWrapper';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <HeaderWrapper />
        <Body />
      </div>
    );
  }
}

export default App;
