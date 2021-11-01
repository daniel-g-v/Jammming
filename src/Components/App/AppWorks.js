import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from'../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //for step 95 use the next line of code
      searchResults: [],

      //for steps befor #95
      /*searchResults: [
      {name: 'name1', artist: 'artist 1', album: 'album1', id: 1},
      {name: 'name2', artist: 'artist 2', album: 'album2', id: 2},
      {name: 'name3', artist: 'artist 3', album: 'album3', id: 3}
      ], */

      playlistName: 'My Playlist',
      
      //The next line of code is for step 95
      playlistTracks: [],

      //Use the following code before step #95
      /*playlistTracks: [
        {name: 'playList_name1', artist: 'playList_artist 1', album: 'playList_album1', id: 4},
        {name: 'playList_name2', artist: 'playList_artist 2', album: 'playList_album2', id: 5},
        {name: 'playList_name3', artist: 'playList_artist 3', album: 'playList_album3', id: 6}
      ],*/
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});

  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
     
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist ( this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    //for steps before 88 use the next line of code
    //console.log(term);
    //for step 88 change the above line of code to the following
      Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove = {this.removeTrack} 
              onNameChange = {this.updatePlaylistName}
              onSave = {this.savePlaylist}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default App;