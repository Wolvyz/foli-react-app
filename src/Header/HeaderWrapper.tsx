import * as React from 'react';
import {Header} from 'semantic-ui-react'

import HeaderNavigation from './components/HeaderNavigation';

import './HeaderWrapper.css';

class HeaderWrapper extends React.Component {
    public render() {
        return (
            <div className="Header-wrapper">
                <Header size="huge">Pysäkkiaikataulut</Header>
                <HeaderNavigation />
            </div>
        );
    }
}

export default HeaderWrapper;