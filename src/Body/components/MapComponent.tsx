import * as React from 'react';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

import getStops from './lib/NearbyStopsRequest'
import './styles/MapComponent.css';

class MapComponent extends React.Component<any, any> {
    private mapRef: any = React.createRef();

    constructor(props: any) {
        super(props);

        this.state = {stopData: [], center: {lat: 60.4518, lon: 22.2666}};
        this.handleMapMounted = this.handleMapMounted.bind(this);
        this.handleCenterChanged = this.handleCenterChanged.bind(this);
    }

    public componentWillMount() {
        getStops({lat: 60.4518, lon: 22.2666, radius: 500}).then(stopData => {
            stopData.length > 0 ? this.setState({stopData}) : this.setState({stopData: []});
        });
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
        getStops({lat, lon, radius: 500}).then(stopData => {
            this.setState({stopData})
        });
    }

    public createMarkers() {
        return this.state.stopData.map(stop => {
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