import * as React from 'react';

import './FormField.css';

interface IState {
    stopId: number
}

class FormField extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {stopId: 0};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: any) {
        this.setState({stopId: event.target.value});
    }

    public handleSubmit(event: any) {
        alert('A name was submitted: ' + this.state.stopId);
        event.preventDefault();
    }

    public render() {
        return (
            <div className="Search-form">
            <form onSubmit={this.handleSubmit}>
                <label>
                    Bussipysäkin numero:
                    <input type="text" value={this.state.stopId} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        );
    }
}

export default FormField;