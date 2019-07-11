import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import MyButton from '../../ComponentStyle/button';

class Playlist extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}


	render() {
		return(
			<div className="Playlist">
	            <input value={this.props.playlistName} 
	            	   onChange={this.handleNameChange} />
	            <TrackList playlistTracks={this.props.playlistTracks}
	            		   onRemove={this.props.onRemove} 
	            		   onAdd= {this.props.onAdd} 
	            		   isRemoval={true} />
	            <MyButton onClick={this.props.onSave}>
					SAVE TO SPOTIFY
				</MyButton>

          </div>
			);
	}
}

export default Playlist;
