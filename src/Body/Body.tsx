import * as React from 'react';

import FormField from './components/FormField';

import './Body.css';

class Header extends React.Component {
    public render() {
        return (
            <div className="body">
                <FormField/>
            </div>
        );
    }
}

export default Header;
