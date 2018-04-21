import axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';

import './ResponseLists.css';

interface IState {
    stops: any
}

class ResponseList extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {stops: []};

    }
    public componentDidMount() {
        axios.get('http://data.foli.fi/siri/sm/993').then(res => this.setState({stops: res.data.result}));
    }

    public mapStops() {
        const stops = this.state.stops.map((stop, index) => <ListItem key={index} value={stop.lineref} departure={stop.aimeddeparturetime} />);
        return <ul>{stops}</ul>
    }

    public render() {
        return (
            <div className="Response-list">
                {this.mapStops()}
            </div>
        );
    }
}

export default ResponseList;

function ListItem(props) {
    const departureTime = moment.unix(props.departure).diff(moment(), 'minutes');
    return <li className="List-item">{props.value}, {departureTime}</li>
}