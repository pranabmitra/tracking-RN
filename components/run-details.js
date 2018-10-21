import React, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import sharedStyles from '../styles/shared-styles';

class RunDetails extends Component {
    render() {
        return (
            <View style={sharedStyles.runDetailsContainer}>
                <Text style={sharedStyles.title}>{this.props.title}</Text>
                <Text style={sharedStyles.value}>{this.props.value}</Text>
            </View>
        )
    }
}

export default RunDetails;