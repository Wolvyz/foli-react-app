import * as React from 'react';
import { Container, Grid} from 'semantic-ui-react';

import MapComponent from './components/MapComponent';
import FormField from './components/SearchComponent';

import './Body.css';

class Body extends React.Component {
    public render() {
        return (
            <div className="Body-wrapper">
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <MapComponent />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <FormField />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Body;
