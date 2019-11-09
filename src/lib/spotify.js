import apiUtils from './apiUtils';

const BASE_URL = 'https://api.spotify.com/v1';

const Spotify = {
    getSearchUrl: (query) => {
        return `${BASE_URL}/search?q=${encodeURI(query)}&type=artist`;
    },

    getTracksUrl: (artistId) => {
        return `${BASE_URL}/artists/${artistId}/top-tracks?country=US&`;
    },

    search: (query, accessToken) => {
        let searchUrl = Spotify.getSearchUrl(query);
        return fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(apiUtils.checkStatus)
            .then(response => response.json())
    },

    getTracks: (artistId, accessToken) => {
        let searchUrl = Spotify.getTracksUrl(artistId);
        return fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then(apiUtils.checkStatus)
            .then(response => response.json())
    }
};

export default Spotify;