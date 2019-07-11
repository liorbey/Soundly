import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

//TrackList.js will be used by SearchResult.js and Playlist.js; the passed props has to be the same name in both components

class TrackList extends React.Component{
	render() {
		return(
			<div className="TrackList">
				{this.props.playlistTracks.map((track) => {
					return <Track key={track.id}
								  track={track}
    							  name={track.name}
    							  artist={track.artist}
    							  album={track.album} 
								  onAdd={this.props.onAdd} 
								  onRemove={this.props.onRemove}
								  isRemoval={this.props.isRemoval} />
				})}
			</div>
		);
	}
}

export default TrackList;
