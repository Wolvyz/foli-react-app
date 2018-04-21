import * as React from 'react';
import { Container } from 'semantic-ui-react'

import HeaderNavigation from './HeaderNavigation';

import './HeaderNavigation.css';

class Header extends React.Component {
    public render() {
        return (
            <div className="Header">
            <Container>
                <header className="App-header">
                    <h1 className="App-title">Föli aikataulut</h1>
                    <HeaderNavigation />
                </header>
            </Container>
            </div>
        );
    }
}

export default Header;