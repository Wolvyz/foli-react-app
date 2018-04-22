import axios from 'axios';
import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

import './MapComponent.css';

class MapComponent extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);

        this.state = {vehicleData: []};
    }


    public componentDidMount() {
        axios.get('http://data.foli.fi/siri/vm/pretty').then(res => {
            const vehicleData = res.data.result;
            res.data.result && res.data.result.length > 0 ? this.setState({vehicleData}) : this.setState({vehicleData: []});
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