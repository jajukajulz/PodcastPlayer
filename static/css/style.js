'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');


var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

  container: {
        flex: 1, //flex attribute of 1 to let it expand to fill it’s parent e.g. the iOS device window
        backgroundColor: '#fff',
        paddingTop: 30
        },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'black',
         paddingTop: 20
        },
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
        },
    thumbnail: {
        width: 70,
        height: 50
        },
    logo: {
        width: 300,
        height: 163
        },
    navbar: {
      backgroundColor:'#F5FCFF',
        //paddingTop: 50
    },
    rightContainer: {
        flex: 1,
    },
    year: {
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    date: {
        marginTop: 20,
        textAlign: 'center',
        color: '#FF1422'
    },
    fullImage: {
        width: windowSize.width,
        height: 300,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    scrollView: {
        flex:1
    },
    podcastListRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 4,
      marginRight: 4,
      padding: 4,
      borderBottomWidth: .5,
      borderColor: 'lightgray',
       paddingTop: 20
    },
    podcastTitle: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'right',
    },
    podcastDescription: {
      fontSize: 12,
      marginBottom: 6,
      textAlign: 'center',
    },
    listView: {
       backgroundColor: '#F5FCFF',
       paddingTop: 30
    },
    buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  largeArtwork: {
    width: 300,
    height: 200
  },
  playButton: {
    backgroundColor: '#4472B9',
    margin: 4,
    padding: 4,
    borderRadius: 4,
    flex: 1
  },
  playButtonText: {
    color: 'white',
    fontSize: 20
  },
  trackScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 30
  },



});
