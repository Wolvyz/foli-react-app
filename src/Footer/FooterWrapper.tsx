import * as React from 'react';
import { Container } from 'semantic-ui-react';

import './FooterWrapper.css';

class FooterWrapper extends React.Component {
    public render() {
        return (
            <div className="Footer-wrapper">
            <Container>
                <p>(c) Ville Vartiainen 2018</p>
            </Container>
            </div>
        );
    }
}

export default FooterWrapper;