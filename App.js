import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RunDetails from './components/run-details';

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
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{flex: 1, backgroundColor: 'lightblue', textAlign: 'center', paddingTop: 20}}>Tracking App</Text>
        <View style={styles.detailsWrapper}>
          <RunDetails title="Distance" value="0 km" />
          <RunDetails title="Speed" value="0 km/h" />
          <RunDetails title="Direction" value="SE" />
        </View>
      </View>
    );
  }
}
