/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * Necessary libraries
 */
var RESEARCHREPORT_URL = "https://www.varsitypodcasts.co.za/category/shows/researchreport/feed"; //url needs to be https
var DOMParser = require('xmldom').DOMParser;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var styles = require('./static/css/style');


/**
 * Necessary imports
 */
import React, { Component } from 'react';
import {
  AppRegistry, //AppRegistry is the JS entry point to running all React Native apps. App root components should register themselves with AppRegistry.registerComponent, then the native system can load the bundle for the app and then actually run the app when it's ready by invoking AppRegistry.runApplication
  StyleSheet,
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
import BrowseTracksView from './components/BrowseTracksView';
import PlayTrackView from './components/PlayTrackView';



//The NavigatorSceneConfigs Object lets you customize your scene navigation. Now add the SceneConfig:

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
    // Make it snap back really quickly after canceling pop
    snapVelocity: 8,
    // Make it so we can drag anywhere on the screen
    edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
    // A very tighly wound spring will make this transition fast
    springTension: 100,
    springFriction: 1,
    // Use our custom gesture defined above
    gestures: {
        pop: CustomLeftToRightGesture,
    }
});

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
          dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}), //listview datasource object
          isLoading: true
        };
    }

    //componentDidMount is a lifecycle method which is fired immediately after the first rendering occurs
    componentDidMount() {
        this._parsePodcastFeed(RESEARCHREPORT_URL);
    }


    render() {
        var {isLoading} = this.state;
        if(isLoading) {
          console.log("render loading message");
          return this.renderLoadingMessage();
        }
        else
            return this.renderResults(this.state.dataSource); //A component may choose to pass its state down as props to its child components
    }

    _renderScene(route, navigator) {
        if (route.id === 'BrowseTracksView') {
          return <BrowseTracksView navigator={navigator} dataSource={route.dataSource}/> //PageOne will access navigator as this.props.navigator
        } else if (route.id === 'PlayTrackView') {
          return <PlayTrackView navigator={navigator} />
        }
    }

    _configureScene(route) {
        return CustomSceneConfig;
    }

    _parsePodcastFeed(podcast_url){
    	/***/
    	console.log('Podcast will be fetched ' + podcast_url);
    	var that = this;
        var url = podcast_url;

        fetch(url)
            .then((response) => response.text())
            .then(function(responseData) {
                  console.log(responseData);
                  that.setState({
                        isLoading: false,
                        dataSource: that.state.dataSource.cloneWithRows(that._extractData(responseData))
                        });
                })
            .catch(function(error) {
                  console.log('There has been a problem with your fetch operation: ' + error.message);
                }).done();
    }

    /**
     * Extracts data from the XML response
     * https://github.com/sarantist/react-native-nasa-rss-feed/blob/master/index.android.js
     */
    _extractData (text) {
        var doc = new DOMParser().parseFromString(text, 'text/xml');
        var items_array = [];
        var items = doc.getElementsByTagName('item');
        var podcast_image = doc.getElementsByTagName('channel')[0].getElementsByTagName('image')[0].childNodes[3].lastChild.data
        podcast_image = podcast_image.replace("http://","https://")

        for (var i=0; i < items.length; i++) {
          items_array.push({
            title: items[i].getElementsByTagName('title')[0].lastChild.data,
            description: items[i].getElementsByTagName('description')[0].lastChild.data,
            mp3: items[i].getElementsByTagName('enclosure')[0].getAttribute('url'),
            thumbnail: podcast_image
          })
        }
        return items_array;
    }

    renderLoadingMessage() {
        return (
            <View style={styles.loadingContainer}>
                <Image
                  source={require('./static/img/vplogo.jpg')}
                  style={styles.logo}/>
                <ActivityIndicator
                    animating={true}
                    color={'#000'}
                    size={'large'}
                    style={{margin: 15}} />
            </View>
        );
    }

    renderResults(dataSource) {
        return (
                <Navigator
                initialRoute={{id: 'BrowseTracksView', dataSource: dataSource }} //sets up route object with id 1
                renderScene={this._renderScene} // renderScene of navigator which gives you access to the route and navigator objects.
                configureScene={this._configureScene} //configureScene prop is Optional function where you can configure scene animations and gestures.
                navigationBar={
                    <Navigator.NavigationBar
                    routeMapper={{
                        LeftButton: (route, navigator, index, navState) =>
                            {
                                if (route.index === 'BrowseTracksView') {
                                    return null;
                                    } else {
                                    return (
                                        <TouchableHighlight onPress={() => navigator.pop()}>
                                            <Text>Back</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                        RightButton: (route, navigator, index, navState) =>
                        { return (<Text>Done</Text>); },
                        Title: (route, navigator, index, navState) => { return (<Text>Awesome Nav Bar</Text>); },
                      }} style={styles.navbar}
                    />
                }/>
        );
      }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

module.exports = AwesomeProject;
