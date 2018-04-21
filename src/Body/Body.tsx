import * as React from 'react';

import FormField from './components/SearchComponent';

import './Body.css';

class Body extends React.Component {
    public render() {
        return (
            <div className="Body-wrapper">
                <FormField />
            </div>
        );
    }
}

export default Body;
