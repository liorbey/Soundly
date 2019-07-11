import React, { Component } from 'react';
import './App.css';
import SearchResults from '../Components/SearchResults/SearchResults';
import Playlist from '../Components/Playlist/Playlist';
import Spotify from '../util/Spotify';
import SearchBar from '../Components/SearchBar/SearchBar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TopBar from '../ComponentStyle/topbar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '    <enter a playlist name>',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
          return;
      }
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      });
  }

  removeTrack(track) {
   let tracks = this.state.playlistTracks;
    this.setState({ 
      playlistTracks: tracks
    }); 
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const arrURI = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, arrURI);
    this.setState({
      playlistName: 'default'
    })
    this.setState({
      playlistTracks: []
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  render() {
    return (
      <div className="data-reactroot">
          <TopBar position="static">
            <Toolbar>
              <Typography variant="h5" color="dark">
                Soundly
              </Typography>
            </Toolbar>
          </TopBar>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
