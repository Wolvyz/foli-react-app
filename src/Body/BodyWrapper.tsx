import * as React from 'react';
import { Container, Grid} from 'semantic-ui-react';

import MapComponent from './components/MapComponent';
import FormField from './components/SearchComponent';

import './BodyWrapper.css';

class Body extends React.Component {
    public render() {
        return (
            <div className ="Body">
            <Container className="Body-wrapper">
                    <Grid>
                        <Grid.Row>
                        <div className="Map-element">
                                <Grid.Column width={8}>
                                    <MapComponent />
                                 </Grid.Column>
                        </div>
                    <div className="Search-element">
                            <Grid.Column width={8}>
                                <FormField />
                            </Grid.Column>
                    </div>
                        </Grid.Row>
                    </Grid>
            </Container>
            </div>
        );
    }
}

export default Body;
