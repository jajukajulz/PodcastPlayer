
var styles = require('../static/css/style');

/**
 * Necessary imports
 */
import React, { Component } from 'react';
import {
  Text,
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
  }

  render() {
    return (
      <View style={[styles.container]}>
          <Text style={styles.welcome}>Go to page two</Text>
       </View>
    )
  }
};
