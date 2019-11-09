import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Gallery.css';
import Spotify from "../../lib/spotify";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            playingUrl: null,
            audio: null,
            currentTime: 0,
            tracks: undefined
        }
    }

    static propTypes = {
        tracks: PropTypes.array,
    };

    componentDidMount() {
        this.interval = setInterval(this.isPlaying.bind(this), 8000);
        this.loadTracks(this.props.artist, this.props.token);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadTracks(artistId, token) {
        Spotify.getTracks(artistId, token)
            .then((json) => {
                this.setState({
                    tracks: json.tracks
                });
            });
    }

    isPlaying() {
        if (!this.state.playing) {
            return false;
        } else if (this.state.audio && this.state.audio.currentTime >= 30) {
            this.resetPlayer();
            return false;
        } else {
            return true;
        }
    }

    handlePlayClick(previewUrl) {
        if (this.isPlaying()) {
            if (this.state.playingUrl === previewUrl) {
                this.pausePlayback();
            } else {
                this.resetPlayer();
                this.startPlaying(previewUrl);
            }
        } else {
            this.startPlaying(previewUrl);
        }
    }

    pausePlayback() {
        this.state.audio.pause();
        this.setState({
            playing: false
        });
    }

    resetPlayer() {
        let audio = this.state.audio;
        audio.pause();
        audio.currentTime = 0;
        audio.src = null;
        this.setState({
            playing: false,
            playingUrl: null,
            audio
        });
    }

    startPlaying(url) {
        if (this.state.playingUrl === url) {
            this.restartPlayback();
        } else {
            let audio = this.state.audio ? this.state.audio : new Audio(url);
            audio.src = url;
            audio.currentTime = 0;
            this.setState({
                playing: true,
                playingUrl: url,
                audio
            });
            audio.play();
        }
    }

    restartPlayback() {
        this.state.audio.play();
        this.setState({
            playing: true
        });
    }

    displayIcon(url) {
        if (this.state.playing && this.state.playingUrl === url) {
            return "\u25A0";
        } else {
            return "\u25B6";
        }
    }

    render() {
        return (
            <ul className="Gallery list">
                {this.state.tracks && this.state.tracks.map((track) => {
                    return <li
                        key={track.id}
                        className="track">
                        <div className="relative ma1 aspect-ratio-ns aspect-ratio--1x1-ns">
                            <img
                                className="album-art"
                                alt={`${track.name} album art`}
                                src={track.album.images[1].url}
                                onClick={() => this.handlePlayClick(track.preview_url)}/>
                            <div className="playButton"
                                 style={{top: '50%', left: '50%'}}
                                 onClick={() => this.handlePlayClick(track.preview_url)}>
                                {this.displayIcon(track.preview_url)}
                            </div>
                            <span
                                className="track-name">
                                {track.name}
                            </span>
                        </div>
                    </li>
                })}
            </ul>
        );
    }
}

Gallery.defaultProps = {
    tracks: []
};

export default Gallery;