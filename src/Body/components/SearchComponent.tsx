import * as React from 'react';
import {Button, Form} from 'semantic-ui-react';

import './styles/SearchComponent.css';

class SearchComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {stopId: 0};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit(event: any) {
        event.preventDefault();
        this.props.handleSubmit(this.state.stopId);
    }

    public handleChange(event: any) {
        this.setState({stopId: event.target.value});
    }

    public render() {
        return (
            <div className="Search">
                <Form onSubmit={this.handleSubmit}>
                    <label>
                        Pysäkin numero:
                        <input type="text" value={this.state.stopId !== 0 ? this.state.stopId : ''}
                               onChange={this.handleChange}/>
                    </label>
                    <Button type="submit">Hae lähtöjä</Button>
                </Form>
            </div>
        );
    }
}

export default SearchComponent;