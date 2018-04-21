import * as React from 'react';

import FormField from './components/FormField';

import './Body.css';

class Body extends React.Component {
    public render() {
        return (
            <div className="body">
                <FormField />
            </div>
        );
    }
}

export default Body;
