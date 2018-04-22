import * as moment from 'moment';
import * as React from 'react';
import { List } from 'semantic-ui-react';

import './ResponseList.css';

interface IProps {
    stops: any[],
    stopId?: number
}

interface IState {
    stops: any[],
    stopId?: number
}

class ResponseList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            stops: props.stops,
            stopId: 0
        }
    }

    public mapStops(stops) {
        return stops.map((stop, index) => {
            const diff = moment.unix(stop.expecteddeparturetime).diff(moment(), 'minutes');
            const departure = diff > 10 ? moment.unix(stop.expecteddeparturetime).format('HH:mm') : `${diff} min`;
            return {key: index, value: stop.lineref, departure, realTime: stop.monitored.toString()}
        });
    }

    public render() {
        const stops = this.mapStops(this.props.stops);
        const stopId = this.props.stopId;
        const stopItems = stops.map(stop => (
                <List.Item style={stop.realTime === 'true' ? {color: 'green'} : {color: 'black'}} key={stop.index}>
                    <List.Content className="lineId" realtime={stop.realTime} floated="left">{stop.value}</List.Content>
                    <List.Content className="timeUntilDeparture" floated="right">{stop.departure}</List.Content>
                </List.Item>
        ));
        return (
            <div className="Response-list">
                { stops.length > 0 ?
                    <List divided={true} verticalAlign="middle">
                        {stopItems}
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