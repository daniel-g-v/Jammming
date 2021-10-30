import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {name: 'name1', artist: 'artist1', album: 'album1', id: '1'},
        {name: 'name2', artist: 'artist2', album: 'album2', id: '2'},
        {name: 'name3', artist: 'artist3', album: 'album3', id: '3'}
      ],
      playlistName: 'playlistName1',
      playlistTracks: [
        {name: 'playlistname1', artist: 'playlistartist1', album: 'playlistalbum1', id: '4'},
        {name: 'playlistname2', artist: 'playlistartist2', album: 'playlistalbum2', id: '5'},
        {name: 'playlistname3', artist: 'playlistartist3', album: 'playlistalbum3', id: '6'}
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks; 
    
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    
    let updatedTracks = tracks.filter(savedTrack => savedTrack.id != track.id);
    this.setState({playlistTracks: updatedTracks})
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ingnegro feo</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}  onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    )
  }
}


export default App;