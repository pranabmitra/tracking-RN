import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    setInterval(() => {
      this.distance.setState({ value: Math.random() * 100 });
      this.speed.setState({ value: Math.random() * 15 });
      this.direction.setState({ value: 'NE' });
    }, 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{flex: 1, backgroundColor: 'lightblue', textAlign: 'center', paddingTop: 20}}>Tracking App</Text>
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
