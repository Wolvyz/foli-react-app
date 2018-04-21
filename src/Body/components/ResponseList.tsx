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
        const stopArray = stops.map((stop, index) => ({key: index, value: stop.lineref, departure: moment.unix(stop.aimeddeparturetime).diff(moment(), 'minutes')}));
        return stopArray.map((stop, index) => (
            <List.Item key={stop.index}>
                <List.Content floated="left">{stop.value}</List.Content>
                <List.Content floated="right">{stop.departure} min</List.Content>
            </List.Item>
        ));
    }

    public render() {
        return (
            <div className="Response-list">
                <List divided={true} verticalAlign = "middle">
                {this.state.stops.length > 0 && this.mapStops(this.state.stops)}
                </List>
            </div>
        );
    }
}

export default ResponseList;