import axios from 'axios';
import * as lodash from 'lodash';
import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

import ResponseList from './ResponseList';

import './styles/SearchComponent.css';

interface IState {
    stopId?: number,
    stops: any[]
}

class SearchComponent extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {stops: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any) {
        this.setState({stopId: event.target.value});
    }

    public handleSubmit(event: any) {
        event.preventDefault();
        axios.get(`http://data.foli.fi/siri/sm/${this.state.stopId}`).then(res => {
            const stops = res.data.result;
            res.data.result && res.data.result.length > 0 ? this.setState({stops}) : this.setState({stops: []});
        }).catch(err => this.setState({stops: []}));
    }

    public render() {
        const stopId = lodash.get(this.state.stops, '0.value');
        return (
            <div className="Search">
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <label>
                    Pysäkin numero:
                    <input type="text" value={this.state.stopId !== 0 ? this.state.stopId : ''} onChange={this.handleChange} />
                </label>
                </Form.Field>
                <Button type="submit">Hae lähtöjä</Button>
            </Form>
                <div className ="Search-response"><ResponseList stops={this.state.stops} stopId={stopId} /></div>
            </div>
        );
    }
}

export default SearchComponent;