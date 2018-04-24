import axios from 'axios';
import * as lodash from 'lodash';
import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import { Button } from 'semantic-ui-react';

import './MapComponent.css';

class MapComponent extends React.Component<any, any> {
    private mapRef: any = React.createRef();

    constructor(props: any) {
        super(props);

        this.state = {stopData: [], center: {lat: 60.4518, lon: 22.2666}};
        this.getStops = this.getStops.bind(this);
        this.handleMapMounted = this.handleMapMounted.bind(this);
        this.handleCenterChanged = this.handleCenterChanged.bind(this);
    }

    public getStops() {
        const reqOptions = {
            url: 'https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql',
            method: 'POST',
            data: `{
                stopsByRadius(lat:${this.state.center.lat}, lon:${this.state.center.lon}, radius:500) {
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

    public handleMapMounted(map) {
        this.mapRef = map;
    }


    public handleCenterChanged() {
        const lat = this.mapRef.getCenter().lat();
        const lon = this.mapRef.getCenter().lng();
        this.setState({
            center: {
                lat,
                lon
            }
        });
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
                    onMapMounted={this.handleMapMounted}
                    center={this.state.center}
                    onCenterChanged={this.handleCenterChanged}
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
        ref={props.onMapMounted}
        defaultZoom={15}
        defaultCenter={{ lat: 60.4518126, lng: 22.2666302 }}
        onCenterChanged={props.onCenterChanged}
    >
        {props.markers}
    </GoogleMap>
);