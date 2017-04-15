
var styles = require('../static/css/style');
import RNAudioStreamer from 'react-native-audio-streamer';

/**
 * Necessary imports
 */
import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Navigator, //Navigator handles the transition between different scenes in your app
  ActivityIndicator,
  ListView,
  Row,
  Image
} from 'react-native';

export default class PlayTrackView extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        playState: 'NOT PLAYING'
      };

RNAudioStreamer.setUrl(this.props.feed_data.mp3)
// RNAudioStreamer.seekToTime(16) //seconds
// RNAudioStreamer.duration((err, duration)=>{
//  if(!err) console.log(duration) //seconds
// })
// RNAudioStreamer.currentTime((err, currentTime)=>{
//  if(!err) console.log(currentTime) //seconds
// })

  }

  _pressRow(selected_feed) {
      this.props.navigator.push({
      id: 'PlayTrackView',
      feed_data: selected_feed
    });
  }

    _playMedia() {
      RNAudioStreamer.play()
      this.setState({playState:'PLAYING'});
      this._streamerStatus()
    }

    _pauseMedia() {
      RNAudioStreamer.pause()
      this.setState({playState:'PAUSE'});
      this._streamerStatus()
    }

    _unpauseMedia() {
      RNAudioStreamer.play()
      this.setState({playState:'PLAYING'});
      this._streamerStatus()
    }

    _streamerStatus() {
      RNAudioStreamer.status((err, status)=>{
       if(!err) console.log(status)
      })
    }

//     //To set volume of the player
// audio.setVolume(0.3);
//
// //To seek to a specific time in seconds
// audio.seekToTime(time_in_seconds);


// feed_data {
//   title: "Research Report S1 E2 – Use of Stokvels",
//   description: "In this episode of The Research Report Show (Seaso…ate hikes, how micro-lenders charge exorbitant...",
//   mp3: "http://www.varsitypodcasts.co.za/shows/researchreport/Research-Report-S1-E2-Keamogetse-Konopi.mp3",
// thumbnail: "https://www.varsitypodcasts.co.za/wp-content/uploads/2017/03/Research-Report-Final-Logo-itunes.jpg"
// }

  render() {
    var playerButton;
    if (this.state.playState === 'PLAYING') {
      playerButton = (
        <TouchableHighlight onPress={() => this._pauseMedia()}>
            <Text>PAUSE</Text>
        </TouchableHighlight>
      );
    } else if (this.state.playState === 'PAUSE') {
       playerButton = (
        <TouchableHighlight onPress={() => this._unpauseMedia()}>
          <Text>UNPAUSE</Text>
        </TouchableHighlight>
        );
      }
      else if (this.state.playState === 'NOT PLAYING'){
         playerButton = (
          <TouchableHighlight onPress={() => this._playMedia()}>
            <Text>PLAY</Text>
          </TouchableHighlight>
          );
        }
    return (
       <View style={[styles.trackScreen]}>
        {playerButton}
       <Image
          style={styles.largeArtwork}
          source={{uri: this.props.feed_data.thumbnail}}>
        </Image>
        <Text style={styles.podcastTitle}>{this.props.feed_data.title}</Text>
        <Text style={styles.podcastDescription}>{this.props.feed_data.description}</Text>
      </View>
    )
  }
};
