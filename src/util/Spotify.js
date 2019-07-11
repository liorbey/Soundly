const clientID = '9886d9f956354ae89e837076c4ed464f';
const redirectURI = 'http://localhost:3000/';
let userID = '';
let playlistID = '';
let accessToken;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		} 
		accessToken = window.location.href.match(/access_token=([^&]*)/);
		let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
		if(accessToken && expiresIn) {
			accessToken = accessToken[1];
			expiresIn = expiresIn[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
		}
		
	},

	search(term) {
		let accessToken = this.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
  			headers: {
  				Authorization: `Bearer ${accessToken}`
  			}
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			if(!jsonResponse.tracks){
        		return [];
      	}
      	return jsonResponse.tracks.items.map(track => ({
        	id: track.id,
        	name : track.name,
        	artist: track.artists[0].name,
        	album: track.album.name,
        	uri: track.uri
      		}))
		});
	},

	savePlaylist(playlistName, arrURI) {
		if(!playlistName && !arrURI) return;
		accessToken = this.getAccessToken();
		const headers = {
      		Authorization: `Bearer ${accessToken}`
    	};
    	fetch('https://api.spotify.com/v1/me', {
    		headers: headers
    	}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			userID = jsonResponse.id;
		});
		fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: `POST`,
                body: JSON.stringify({
                	name: playlistName
                })
        }).then(response => {
        	return response.json();
        }).then(jsonResponse => {
        	playlistID = jsonResponse.id; 
        }).then(() => {
	        fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
	                headers: headers,
	                method: 'POST',
	                body: JSON.stringify({
	                	uris: arrURI
	                })
			});  	
        })
	}
}

export default Spotify;
