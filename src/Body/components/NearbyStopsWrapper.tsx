import axios from 'axios';
import * as React from 'react';
import { Grid} from 'semantic-ui-react';


import MapComponent from './MapComponent';
import ResponseList from './ResponseList';
import SearchComponent from './SearchComponent'

import getStops from './lib/NearbyStopsRequest';

class NearbyStopsWrapper extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
          stops: [],
            stopId: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchStops = this.fetchStops.bind(this);
    }

    public fetchStops({lat, lon, radius}) {
        getStops({lat, lon, radius}).then(stops => {
           return stops && stops.length > 0 ? this.setState({stops}) : this.setState({stops: []})
        });
    }

    public handleSubmit(stopId) {
        axios.get(`http://data.foli.fi/siri/sm/${stopId}`).then(res => {
            const stops = res.data.result;
            res.data.result && res.data.result.length > 0 ? this.setState({stops}) : this.setState({stops: []});
        }).catch(err => this.setState({stops: []}));
    }

    public render() {
        return (
            <Grid>
                <Grid.Row>
                    <div className="Map-component">
                        <Grid.Column width={8}>
                            <MapComponent stops={this.state.stops} fetchStops={this.fetchStops}/>
                        </Grid.Column>
                    </div>
                    <div className="List-component">
                        <Grid.Column width={8}>
                            <SearchComponent handleSubmit={this.handleSubmit}/>
                            <ResponseList stops={this.state.stops}/>
                        </Grid.Column>
                    </div>
                </Grid.Row>
            </Grid>
        );
    }
}

export default NearbyStopsWrapper;