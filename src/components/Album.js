import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './album.css';


class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      currentVolume: 0.8,
      volume: 0.8,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  componentDidMount() {
    this.eventListeners = {
     timeupdate: e => {
       this.setState({ currentTime: this.audioElement.currentTime });
     },
     volumeupdate: e => {
       this.setState({ currentVolume: this.audioElement.volume});
     },
     durationchange: e => {
       this.setState({ duration: this.audioElement.duration });
     },
     volumechange: e => {
       ({volume: this.state.volume})
     }

   };
   this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
   this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
   this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);

 }

    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);

    }



  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    if (song !== undefined) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play(song);
    }
  }

  handlePrevClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.max(0, currentIndex - 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
  }

  handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.max(0, currentIndex + 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
   }

   handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }


  handleVolumeChange(e) {
    this.audioElement.currentVolume = e.target.value;
    this.setState({ currentVolume: e.target.value })
    this.audioElement.volume = e.target.value;
    this.setState({ volume: e.target.value })
 }

 formatTime(e){
     if (e){
      const minutes = Math.floor(e / 60);
      let seconds = Math.floor(e % 60);
      seconds = ((seconds) < 10) ? ("0" + seconds) : (seconds);
      console.log(minutes);
      console.log(seconds);
      console.log(" ");
      const newTime = (minutes) + ":" + seconds;
      return newTime;
         } else {
          return"-:--";
         }
  }


  render() {
    return (
      <section className="album">
        <section id="album-info">
        <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody className ="songs">
           {
          this.state.album.songs.map( (songs, index) =>
             <tr className="song" key={index} onClick={() => this.handleSongClick(songs)} >
             <td className="song-number">{index +1}</td>
             <td className="song-title">{songs.title}</td>
             <td className="song-duration">{songs.duration}</td>
             <td className="ion-play"></td>
             <td className="ion-pause"></td>
            </tr>
          )
        }
           </tbody>
         </table>
         <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           formatTime={this.formatTime(this.state.currentTime)}
           formatDuration={this.formatTime(this.state.duration - this.state.currentTime)}
           currentVolume={this.state.currentVolume}
           volume={this.state.volume}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
         />
       </section>
    );
  }
}

export default Album;
