import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView, { Marker, Polyline } from 'react-native-maps';
import haversine from 'haversine';

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
      let distance = 0,
          direction = this.getDirection(position.coords.heading);

      if (this.state.previousCoordinate) {
        distance = this.state.distance + haversine(this.state.previousCoordinate, position.coords, { unit: 'mile'});
        this.distance.setState({ value: distance });
      }

      this.speed.setState({ value: position.coords.speed });
      this.direction.setState({ value: direction});
      this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: position.coords,
            key: id++
          }
        ],
        previousCoordinate: position.coords,
        distance
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

  getDirection(x) {
    let direction = 'N';
  
    if ((x > 0 && x <= 23) || (x > 338 && x <= 360)) {
      direction = 'N';
    } else if (x > 23 && x <= 65) {
      direction = 'NE';
    } else if (x > 65 && x <= 110) {
      direction = 'E';
    } else if (x > 110 && x <= 155) {
      direction = 'SE';
    } else if (x > 155 && x <= 203) {
      direction = 'S';
    } else if (x > 203 && x <= 248) {
      direction = 'SW';
    } else if (x > 248 && x <= 293) {
      direction = 'W';
    } else if (x > 293 && x <= 338) {
      direction = 'NW';
    }
    
    return direction;
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
          <RunFormattedDetails title="Distance" value="0" unit="mile"
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
