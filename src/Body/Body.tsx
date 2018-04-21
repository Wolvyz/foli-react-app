import * as React from 'react';

import FormField from './components/FormField';
import ResponseLists from './components/ResponseList';

import './Body.css';

class Body extends React.Component {
    public render() {
        return (
            <div className="body">
                <FormField />
                <ResponseLists />
            </div>
        );
    }
}

export default Body;
