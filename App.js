import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView, { Marker, Polyline } from 'react-native-maps';
import haversine from 'haversine';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RunDetails  from './components/run-details';
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

import reducer from './reducers/reducer';
import { incrementDistance, setSpeed, setDirection } from './actions/action';

const store = createStore(reducer);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let watchID = navigator.geolocation.watchPosition((position) => {
      if (this.state.previousCoordinate) {
        let distance = haversine(this.state.previousCoordinate, position.coords, { unit: 'mile'});
        store.dispatch(incrementDistance(distance));
      }

      store.dispatch(setSpeed(position.coords.speed));
      store.dispatch(setDirection(position.coords.heading));

      this.setState({
        markers: [
          ...this.state.markers, {
            coordinate: position.coords,
            key: id++
          }
        ],
        previousCoordinate: position.coords
      },
      error => {},
      {});
    });

    this.state = { markers: [], watchID };
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
      <Provider store={store}>
        <View style={styles.container}>
          <MapView style={styles.map}
            showsUserLocation
            followsUserLocation 
            initialRegion={{
              latitude: 23.810331,
              longitude: 90.412521,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0722, 
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
            <RunFormattedDetails title="Distance" unit="mile" type="distance"
              ref={(info) => this.distance = info}
            />
            <RunFormattedDetails title="Speed" unit="km/h" type="speed"
              ref={(info) => this.speed = info}
            />
            <RunDetails title="Direction" value="SE" type="heading"
              ref={(info) => this.direction = info}
            />
          </View>
        </View>
      </Provider>
    );
  }
}
