import RunDetails from './run-details';

class RunFormattedDetails extends RunDetails {
    formatValue() {
        return [parseFloat(this.state.value).toFixed(2), this.props.unit].join(' ');
    }
}

export default RunFormattedDetails;