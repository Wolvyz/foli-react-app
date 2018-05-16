import * as moment from 'moment';
import * as React from 'react';
import {List} from 'semantic-ui-react';

import './styles/ResponseList.css';

class ResponseList extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            stops: [],
            stopId: 0
        }
    }

    public componentWillMount() {
        this.setState({stops: this.props.stops})
    }

    public render() {
        const stopId = this.props.stopId;
        const newStops = this.props.stops.map((stop, index) => {
            const diff = moment.unix(stop.expecteddeparturetime).diff(moment(), 'minutes');
            const departure = diff > 10 ? moment.unix(stop.expecteddeparturetime).format('HH:mm') : `${diff} min`;
            return {key: index, value: stop.lineref, departure, realTime: stop.monitored && stop.monitored.toString()}
        });
        const stops = newStops.map(stop => (
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