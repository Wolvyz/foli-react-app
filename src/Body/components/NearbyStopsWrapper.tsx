import axios from 'axios';
import * as moment from 'moment';
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
    const stops =  this.state.stops.map((stop, index) => {
                const diff = moment.unix(stop.expecteddeparturetime).diff(moment(), 'minutes');
                const departure = diff > 10 ? moment.unix(stop.expecteddeparturetime).format('HH:mm') : `${diff} min`;
                return {key: index, value: stop.lineref, departure, realTime: stop.monitored.toString()}
            });
        return (
            <Grid>
                <Grid.Row>
                    <div className="Map-component">
                        <Grid.Column width={8}>
                            <MapComponent stops={stops} fetchStops={this.fetchStops}/>
                        </Grid.Column>
                    </div>
                    <div className="List-component">
                        <Grid.Column width={8}>
                            <SearchComponent handleSubmit={this.handleSubmit}/>
                            <ResponseList stops={stops}/>
                        </Grid.Column>
                    </div>
                </Grid.Row>
            </Grid>
        );
    }
}

export default NearbyStopsWrapper;