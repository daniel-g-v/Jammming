/*let userAccessToken;
const clientID = '62477595f49b4e4aa141514be97686db';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(userAccessToken){
            return userAccessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expirationTimeMatch){
            userAccessToken = accessTokenMatch[1];
            const expirationTime = Number(expirationTimeMatch[1]);
            window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(searchTerm){
        const userAccessToken = Spotify.getAccessToken();
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {Authorization: `Bearer ${userAccessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(playlistName, URIs){
        if(!playlistName || !URIs.length){
            return;
        }
        const userAccessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${userAccessToken}`};
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers}
            ).then(response => response.json()
            ).then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
                {
                    headers: headers,
                    method: 'POST',                    
                    body: JSON.stringify({name: playlistName})
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                        headers: headers,
                        method: 'POST',
                        body:  JSON.stringify({ uris: URIs})
                    })
                })
            })
    }
}

export default Spotify;*/

let accessToken;
const clientID = '62477595f49b4e4aa141514be97686db';
const redirectURI = 'https://daniel-g-v.github.io/Jammming/';

const Spotify = {
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }
        // check for access token match
        const accesssTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accesssTokenMatch && expiresInMatch) {
            accessToken = accesssTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // wipes the access token and URL parameters after they expire
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
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
//note in the line of code below the instructor mispells savePlaylist as savePlayList note capital "l"
    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then (jsonResponse => {
            userId = jsonResponse.id;
            return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                    headers: headers,
                    method: 'POST',
                    body:  JSON.stringify({ uris: trackUris })
                })
            })
        })
    }
}
export default Spotify;

