import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView, { Marker, Polyline } from 'react-native-maps';

import RunDetails from './components/run-details';
import RunFormattedDetails from './components/run-formatted-details';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,  
    flexDirection: 'row',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

let id = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: position.coords,
            key: id++
          }
        ]
      },
      null,
      {});
    });

    this.state = { markers: [], watchID };
    
    setInterval(() => {
      this.distance.setState({ value: Math.random() * 100 });
      this.speed.setState({ value: Math.random() * 15 });
      this.direction.setState({ value: 'NE' });
    }, 5000);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  addMarker(region) {
    let now = (new Date).getTime();
    if (this.state.lastAddedMarker > now - 5000) {
      return;
    }

    this.setState({
      markers: [
        ...this.state.markers, {
          coordinate: region,
          key: id++
        }
      ],
      lastAddedMarker: now
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          showsUserLocation
          followsUserLocation 
          initialRegion={{
            latitude: 28.77496,
            longitude: 92.40187,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02, 
          }}
          >
            {/* <Polyline 
              coordinates={this.state.markers.map((marker) => marker.coordinate)}
              strokeWidth={5}
            /> */}
            {this.state.markers.map((marker) => (
              <Marker coordinate={marker.coordinate} key={marker.key} />
            ))}
        </MapView>
      
        <View style={styles.detailsWrapper}>
          <RunFormattedDetails title="Distance" value="0" unit="km"
            ref={(info) => this.distance = info}
          />
          <RunFormattedDetails title="Speed" value="0" unit="km/h" 
            ref={(info) => this.speed = info}
          />
          <RunDetails title="Direction" value="SE"
            ref={(info) => this.direction = info}
          />
        </View>
      </View>
    );
  }
}
