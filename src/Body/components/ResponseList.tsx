import axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';
import { List } from 'semantic-ui-react';

import './ResponseList.css';

interface IProps {
    stopId: number
}

interface IState {
    stops: any,
    stopId: any
}

class ResponseList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            stopId: this.props.stopId,
            stops: []
        }
    }

    public componentDidMount() {
        axios.get(`http://data.foli.fi/siri/sm/${this.state.stopId}`).then(res => this.setState({stops: res.data.result}));
    }

    public mapStops(stops) {
        const stopArray = stops.map((stop, index) => {
            const diff = moment.unix(stop.expecteddeparturetime).diff(moment(), 'minutes');
            const departure = diff > 10 ? moment.unix(stop.expecteddeparturetime).format('HH:mm') : `${diff} min`;
            return {key: index, value: stop.lineref, departure, realTime: stop.monitored.toString()}
        });

        // style={{marginRight: spacing + 'em'}} when using JSX.
        return stopArray.map((stop, index) => (
            <List.Item style={stop.realTime === 'true' ? {color: 'green'} : {color: 'black'}} key={stop.index}>
                <List.Content className="lineId" realtime={stop.realTime} floated="left">{stop.value}</List.Content>
                <List.Content className="timeUntilDeparture" floated="right">{stop.departure}</List.Content>
            </List.Item>
        ));
    }

    public render() {
        const stops = this.mapStops(this.state.stops);
        return (
            <div className="Response-list">
                <List divided={true} verticalAlign = "middle">
                    {stops}
                </List>
            </div>
        );
    }
}

export default ResponseList;