import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Profile.css'
import Gallery from "../Gallery/Gallery";
import logo from '../../logo.svg';

class Profile extends Component {
    static propTypes = {
        artists: PropTypes.array,
        token: PropTypes.string
    };

    render() {
        let artists = this.props.artists;
        return (
            <div className="profile-wrapper">
                {artists && artists.map((artist) =>
                    <div className="content" key={artist.id}>
                        <div className="profile">
                            <img
                                src={ artist.images.length > 0 ? artist.images[0].url : logo }
                                alt={`${artist.name} Profile`}
                                id="profile-img"/>
                            <div className="artist-info">
                                <div id="artist-name" className="f3">{artist.name}</div>
                                <div id="artist-follower-count" className="">{artist.followers.total} followers</div>
                                <div id="artist-genres" className="">
                                    {artist.genres.length > 0 &&
                                    artist.genres.map((genre, k) => <span key={k}>{artist.genres}</span>)
                                        .reduce((prev, curr) => [prev, ', ', curr])
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="gallery">
                            <Gallery artist={artist.id} token={this.props.token}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;