import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

import './MapComponent.css';

export interface IProps {
    isMarkerShown: boolean
}

class MapComponent extends React.Component<{}, IProps> {
    constructor(props: any) {
        super(props);

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
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
);