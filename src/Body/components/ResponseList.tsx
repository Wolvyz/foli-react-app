import axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';

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

    public mapStops() {
        const stopArray = this.state.stops.map((stop, index) => <ListItem key={index} value={stop.lineref} departure={stop.aimeddeparturetime} />);
        return <ul>{stopArray}</ul>
    }

    public render() {
        return (
            <div className="Response-list">
                {this.state.stops.length > 0 && this.mapStops()}
            </div>
        );
    }
}

export default ResponseList;

function ListItem(props) {
    const departureTime = moment.unix(props.departure).diff(moment(), 'minutes');
    return <li className="List-item" key={props.key}>{props.value}, {departureTime}</li>;
}