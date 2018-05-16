import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

import getStops from './lib/NearbyStopsRequest'
import './styles/MapComponent.css';

class MapComponent extends React.Component<any, any> {
    private mapRef: any = React.createRef();

    constructor(props: any) {
        super(props);

        this.state = {stops: this.props.stops, center: {lat: 60.4518, lon: 22.2666}};
        this.handleMapMounted = this.handleMapMounted.bind(this);
        this.handleDragEnded = this.handleDragEnded.bind(this);
    }

    public handleMapMounted(map) {
        this.mapRef = map;
    }


    public handleDragEnded() {
        const lat = this.mapRef.getCenter().lat();
        const lon = this.mapRef.getCenter().lng();
        this.setState({
            center: {
                lat,
                lon
            }
        });
        getStops({lat, lon, radius: 800}).then(stopData => {
            this.setState({stops: stopData});
        });
    }

    public createMarkers() {
        return this.state.stops.map(stop => {
            return <Marker position={{ lat: stop.lat, lng: stop.lon }} key={stop.code} label={stop.code} />
        });
    }

    public render() {
        return (
            <div className="Map-component">
                <MyMapComponent
                    markers={this.createMarkers()}
                    onMapMounted={this.handleMapMounted}
                    center={this.state.center}
                    onDragEnd={this.handleDragEnded}
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
        ref={props.onMapMounted}
        defaultZoom={15}
        defaultCenter={{ lat: 60.4518126, lng: 22.2666302 }}
        onDragEnd={props.onDragEnd}
    >
        {props.markers}
    </GoogleMap>
);