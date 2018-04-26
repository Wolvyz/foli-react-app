import * as React from 'react';
import { List } from 'semantic-ui-react';

import './styles/ResponseList.css';

class ResponseList extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            stops: [],
            stopId: 0
        }
    }

    public render() {
        const stopId = this.props.stopId;
        const stops = this.props.stops.map(stop => (
                <List.Item style={stop.realTime === 'true' ? {color: 'green'} : {color: 'black'}} key={stop.index}>
                    <List.Content className="lineId" realtime={stop.realTime} floated="left">{stop.value}</List.Content>
                    <List.Content className="timeUntilDeparture" floated="right">{stop.departure}</List.Content>
                </List.Item>
        ));
        return (
            <div className="Response-list">
                { stops.length > 0 ?
                    <List divided={true} verticalAlign="middle">
                        {stops}
                    </List> :
                    (
                        <div className="No-results"><p>{stopId ? `Ei tuloksia linjalle ${stopId}` : ''}</p></div>
                    )
                }
            </div>
        );
    }
}

export default ResponseList;