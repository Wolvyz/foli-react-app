import * as React from 'react';
import { Container } from 'semantic-ui-react';

import NearbyStopsWrapper from './components/NearbyStopsWrapper';

import './BodyWrapper.css';

class Body extends React.Component {
    public render() {
        return (
            <div className ="Body">
            <Container className="Body-wrapper">
                        <div className="Map-element">
                                    <NearbyStopsWrapper />
                        </div>
            </Container>
            </div>
        );
    }
}

export default Body;
