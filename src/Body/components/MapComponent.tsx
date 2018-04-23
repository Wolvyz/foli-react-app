import axios from 'axios';
import * as lodash from 'lodash';
import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

import './MapComponent.css';

interface IState {
    vehicleData: any[]
}

class MapComponent extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {vehicleData: []};
    }

    public componentDidMount() {
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
            const vehicleDatas = lodash.get(res, 'data.data.stopsByRadius.edges', []).map(edge => {
                return {
                    code: edge.node.stop.code,
                    lat: edge.node.stop.lat,
                    lon: edge.node.stop.lon,
                    name: edge.node.stop.name,
                    timeZone: edge.node.stop.timezone,
                    zoneId: edge.node.stop.zoneId
                }
            });
            vehicleDatas.length > 0 ? this.setState({vehicleData: vehicleDatas}) : this.setState({vehicleData: []});
        }).catch(err => this.setState({vehicleData: []}));
    }

    public render() {
        return (
            <div className="Map-component">
                <MyMapComponent
                    isMarkerShown="true"
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
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
            </div>
        );
    }
}

export default MapComponent;

const MyMapComponent = withGoogleMap<any>((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 60.4518126, lng: 22.2666302 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
);