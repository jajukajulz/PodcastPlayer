
var styles = require('../static/css/style');

/**
 * Necessary imports
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator, //Navigator handles the transition between different scenes in your app
  TouchableOpacity, //A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Row,
  Image
} from 'react-native';

export default class BrowseTracksView extends React.Component {

  constructor(props) {
      super(props);
  }

      _pressRow(selected_feed) {
        this.props.navigator.push({
        id: 'PlayTrackView',
        feed_data: selected_feed
      });
  }

    /**
     * List item render
     <!--() => binds to component so you can use this -->
     */
      _renderFeed(feed) {
        return (
          <TouchableHighlight onPress={() => this._pressRow(feed)}>
            <View style={styles.podcastListRow}>
              <Image
                source={{uri: feed.thumbnail}}
                style={styles.thumbnail}/>
              <View style={styles.rightContainer}>
                <Text style={styles.podcastTitle}>{feed.title}</Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      }

  render() {
    return (
      <View style={[styles.container]}>
        <ListView
            dataSource={this.props.dataSource}
            renderRow={(feed) => this._renderFeed(feed)}
            style={styles.listView}
            //list={route.list}
            />
      </View>
    )
  }
};
