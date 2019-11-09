import React, {Component} from 'react';
import {authEndpoint, clientId, redirectUri, scopes} from "../../lib/config";
import './Login.css';

class Login extends Component {

    render() {
        return (
            <div className='track-search-container'>
                <a className="btn btn-green"
                   href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20"
                   )}&response_type=token&show_dialog=true`}>
                    Login to Spotify
                </a>
            </div>
        );
    }

}

export default Login;