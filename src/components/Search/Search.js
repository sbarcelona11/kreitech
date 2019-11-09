import React, {Component} from "react";
import Spotify from "../../lib/spotify";
import Profile from '../Profile/Profile';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artists: null,
            errorMessage: ''
        };
        // binds.
        this.updateProfile = this.updateProfile.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(token) {
        const result = Spotify.search(this.state.query, token)
            .then(json => this.search(json))
            .catch(e => {
                this.displayErrorMessage('Please enter a search query');
                this.setState({ artists: null });
            });
        return result;
    }

    search(artistJSON) {
        const artists = artistJSON.artists.items;
        if (artists.length > 0) {
            return this.updateProfile(artistJSON)
        } else {
            this.displayErrorMessage('Artist not found, please try again');
            this.setState({ artists: null });
            return false;
        }
    }

    updateProfile(artistJSON) {
        const artists = artistJSON.artists.items;
        this.setState({
            artists: artists,
            errorMessage: ''
        });
        return artistJSON;
    }

    displayErrorMessage(message) {
        this.setState({
            errorMessage: message
        });
    }

    render() {
        let token = this.props.token;
        return (
            <div className="track-search-container">
                <div className="search-text">Search Spotify API for an Artist and Preview their Top Tracks</div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.handleSearch(token);
                }}>
                    <input type="text"
                           placeholder="Search for an artist"
                           value={this.state.query}
                           onChange={event => {
                               this.setState({query: event.target.value})
                           }}/>
                    <button
                        className="btn btn-green">Search
                    </button>
                </form>
                <div className="error">{this.state.errorMessage}</div>
                <div id="Profile">
                    <Profile artists={this.state.artists} token={token}/>
                </div>
            </div>
        );
    }
}

export default Search;