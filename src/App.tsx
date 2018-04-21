import * as React from 'react';
import './App.css';

import Body from './Body/Body';
import Header from './Header/Header';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
