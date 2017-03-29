/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * Necessary libraries
 */
var DOMParser = require('xmldom').DOMParser;

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
  ListView
} from 'react-native';

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


//We're going to add two Pages to our Navigation Flow.
var PageOne = React.createClass({

    _handlePress() {
        this.props.navigator.push({id: 2,}); //push appends one or more elements to the end of an array. This alters the array on which the method was called.
    },

render() {
    return (
      <View style={[styles.container, {backgroundColor: 'green'}]}>
        <Text style={styles.welcome}>Greetings!</Text>
        <TouchableOpacity onPress={this._handlePress}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go to page two</Text>
          </View>
        </TouchableOpacity>
        <ListView
            dataSource={this.props.dataSource}
            renderRow={this.renderFeed.bind(this)}
            //style={styles.listView}
            //list={route.list}
            />
       </View>
    )
  },
});

var PageTwo = React.createClass({
  _handlePress() {
    this.props.navigator.pop(); //The pop() method pulls the last element off of the given array and returns it. This alters the array on which the method was called.
  },

render() {
    return (
      <View style={[styles.container, {backgroundColor: 'purple'}]}>
        <Text style={styles.welcome}>This is page two!</Text>
        <TouchableOpacity onPress={this._handlePress}>
          <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'black'}}>
            <Text style={styles.welcome}>Go back</Text>
          </View>
        </TouchableOpacity>
       </View>
    )
  },
});

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
          wallsJSON: [],
          isLoading: true
        };
    }

    //componentDidMount is a lifecycle method which is fired immediately after the first rendering occurs
    componentDidMount() {
        var pod_url = 'https://www.varsitypodcasts.co.za/category/shows/researchreport/feed'; //url needs to be https
        this._parsePodcastFeed(pod_url);
    }


    render() {
        var {isLoading} = this.state;
        if(isLoading)
            return this.renderLoadingMessage();
        else
            return this.renderResults();
    }

    _renderScene(route, navigator) {
        if (route.id === 1) {
          return <PageOne navigator={navigator} />
        } else if (route.id === 2) {
          return <PageTwo navigator={navigator} />
        }
    }

    _configureScene(route) {
        return CustomSceneConfig;
    }

    _parsePodcastFeed(podcast_url){
    	/***/
    	console.log('Podcast will be fetched');
    	var that = this;
        var url = podcast_url;

//        fetch(REQUEST_URL)
//      .then((response) => response.text())
//      .then((responseData) => {
//        this.setState({
//          dataSource: this.state.dataSource.cloneWithRows(this.extractData(responseData))
//        });
//}).done();

        fetch(url)
            .then((response) => response.text())
            .then(function(responseData) {
                  console.log(responseData);
                  that.setState({
                        isLoading: false,
                        dataSource: that._extractData(responseData)
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

        for (var i=0; i < items.length; i++) {
          items_array.push({
            title: items[i].getElementsByTagName('title')[0].lastChild.data,
            description: items[i].getElementsByTagName('description')[0].lastChild.data,
            thumbnail: items[i].getElementsByTagName('enclosure')[0].getAttribute('url'),
            link: items[i].getElementsByTagName('link')[0].textContent,
            date: items[i].getElementsByTagName('pubDate')[0].textContent,
          })
        }
        return items_array;
    }

    renderLoadingMessage() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    animating={true}
                    color={'#fff'}
                    size={'small'}
                    style={{margin: 15}} />
                <Text style={{color: '#fff'}}>Contacting Varsity Podcasts</Text>
            </View>
        );
    }

    renderResults() {
        return (
                <Navigator
                initialRoute={{id: 1, }}
                renderScene={this._renderScene}
                configureScene={this._configureScene} //configureScene prop is Optional function where you can configure scene animations and gestures.
                navigationBar={
                    <Navigator.NavigationBar
                    routeMapper={{
                        LeftButton: (route, navigator, index, navState) =>
                            {
                                if (route.index === 1) {
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
                        }} style={{backgroundColor: 'gray'}}
                    />
                }/>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        },
    loadingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
        }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

module.exports = AwesomeProject;