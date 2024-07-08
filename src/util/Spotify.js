var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Write your Client ID
var redirect_uri = 'http://localhost:3000/callback'

var scope = 'playlist-modify-private playlist-modify-public';

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // Check for access token match in URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // cleare the url after timeout
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/',);

            return accessToken;
        } else {
            const state = Spotify.generateRandomString(16); // Generate a random state string
            const stateKey = 'spotify_auth_state';  // Define the key for localStorage
            localStorage.setItem(stateKey, state); // Store the state string in localStorage

            // Spotitfy base URL + query params
            const authUrl = 'https://accounts.spotify.com/authorize';
            let authUrlParams = '?response_type=token';
            authUrlParams += '&client_id=' + encodeURIComponent(client_id);
            authUrlParams += '&scope=' + encodeURIComponent(scope);
            authUrlParams += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            authUrlParams += '&state=' + encodeURIComponent(state);

            window.location = authUrl + authUrlParams;
        }
    },

    generateRandomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array(length).fill().map(() => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
    },

    search (term) {
        const accessToken = Spotify.getAccessToken();
        const encodedTerm = encodeURIComponent(term);

        return fetch(`https://api.spotify.com/v1/search?query=${encodedTerm}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => response.json())
            .then(jsonResponse => {
                if(!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },

    savePlaylist (name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                }).then(response => response.json())
                .then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackUris})
                      });
                });
            });
    }
}

export default Spotify;