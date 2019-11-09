import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="head">
                <a className="spotify-logo" tabIndex="-1" title="Spotify" href="/"></a>
            </div>
        );
    }
}

export default Header;