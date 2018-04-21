import * as React from 'react';
import { Header } from 'semantic-ui-react'

import HeaderNavigation from './HeaderNavigation';

import './HeaderWrapper.css';

class HeaderWrapper extends React.Component {
    public render() {
        return (
            <div className="Header-wrapper">
                <Header size="large">Pysäkkiaikataulut</Header>
                <Header size="medium">Better than Föli</Header>
                <HeaderNavigation />
            </div>
        );
    }
}

export default HeaderWrapper;