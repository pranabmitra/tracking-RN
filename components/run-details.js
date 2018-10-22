import React, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import sharedStyles from '../styles/shared-styles';

class RunDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };
    }

    formatValue() {
        return this.state.value;
    }

    render() {
        let value = this.formatValue() || '-';
    
        return (
            <View style={sharedStyles.runDetailsContainer}>
                <Text style={sharedStyles.title}>{this.props.title.toUpperCase()}</Text>
                <Text style={sharedStyles.value}>{value}</Text>
            </View>
        )
    }
}

export default RunDetails;