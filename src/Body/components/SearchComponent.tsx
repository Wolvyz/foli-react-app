import * as React from 'react';
import { Button, Form } from 'semantic-ui-react'

import ResponseList from './ResponseList';

import './SearchComponent.css';

interface IState {
    stopId: number,
    getResponse: boolean
}

class FormField extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {stopId: 0, getResponse: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any) {
        this.setState({stopId: event.target.value});
    }

    public handleSubmit(event: any) {
        event.preventDefault();
        this.setState({getResponse: true});
    }

    public render() {
        return (
            <div className="Search">
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <label>
                    Bussipysäkin numero:
                    <input type="text" value={this.state.stopId !== 0 ? this.state.stopId : ''} onChange={this.handleChange} />
                </label>
                </Form.Field>
                <Button type="submit">Hae lähtöjä</Button>
            </Form>
                <div className ="Search-response">{this.state.getResponse ? <ResponseList stopId={this.state.stopId} /> : ''}</div>
            </div>
        );
    }
}

export default FormField;