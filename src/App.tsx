import * as React from 'react';
import './App.css';

import Body from './Body/BodyWrapper';
import FooterWrapper from './Footer/FooterWrapper';
import HeaderWrapper from './Header/HeaderWrapper';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <HeaderWrapper />
        <Body />
          <FooterWrapper />
      </div>
    );
  }
}

export default App;
