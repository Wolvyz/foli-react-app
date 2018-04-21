import * as React from 'react';

import './Header.css';

class HeaderNavigation extends React.Component {
    public render() {
        return (
            <div className="Header-nav">
                <ul>
                    <li>Home</li>
                    <li>Map</li>
                    <li>Favourites</li>
                </ul>
            </div>
        );
    }
}

export default HeaderNavigation;