import React, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

import sharedStyles from '../styles/shared-styles';

export class RunDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };
    }

    formatValue() {
        return this.props.value;
    }

    render() {
        let value = this.props.value ? this.formatValue() : '-';
    
        return (
            <View style={sharedStyles.runDetailsContainer}>
                <Text style={sharedStyles.title}>{this.props.title.toUpperCase()}</Text>
                <Text style={sharedStyles.value}>{value}</Text>
            </View>
        )
    }
}

export default connect((state, ownProps) => {
    return { value: state[ownProps.type]};
})(RunDetails);