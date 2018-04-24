import axios from 'axios';
import * as lodash from 'lodash';
import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import { Button } from 'semantic-ui-react';

import './MapComponent.css';

interface IState {
    stopData: any[]
}

class MapComponent extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {stopData: []};
        this.getStops = this.getStops.bind(this);
    }

    public getStops() {
        const reqOptions = {
            url: 'https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql',
            method: 'POST',
            data: `{
                stopsByRadius(lat:60.4518, lon:22.2666, radius:500) {
                    edges {
                     node {
                       stop {
                           timezone
                            code
                            name
                              lat
                              lon
                              zoneId
                        }
                      }
                  }
                }
            } `,
            timeout: 8000,
            headers: {'Content-Type': 'application/graphql'}
        };

        axios.request(reqOptions).then(res => {
            const stopPositions = lodash.get(res, 'data.data.stopsByRadius.edges', []).map(edge => {
                return {
                    code: edge.node.stop.code,
                    lat: edge.node.stop.lat,
                    lon: edge.node.stop.lon,
                    name: edge.node.stop.name,
                    timeZone: edge.node.stop.timezone,
                    zoneId: edge.node.stop.zoneId
                }
            });
            stopPositions.length > 0 ? this.setState({stopData: stopPositions}) : this.setState({stopData: []});
        }).catch(err => this.setState({stopData: []}));
    }

    public createMarkers() {
        return this.state.stopData.map(stop => {
            return <Marker position={{ lat: stop.lat, lng: stop.lon }} key={stop.name} />
        });
    }

    public render() {
        return (
            <div className="Map-component">
                <MyMapComponent
                    markers={this.createMarkers()}
                    containerElement={
                    <div style={{
                        alignItems: 'center',
                        height: "500px",
                        justifyContent: 'flex-end',
                        width: "500px"
                    }} />
                }
                    mapElement={
                    <div style={{
                        height: "500px",
                        width: "500px"
                   }} />
                }
                />
                <Button type="submit" onClick={this.getStops}>Hae pysäkkejä</Button>
            </div>
        );
    }
}

export default MapComponent;

const MyMapComponent = withGoogleMap<any>((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 60.4518126, lng: 22.2666302 }}
    >
        {props.markers}
    </GoogleMap>
);