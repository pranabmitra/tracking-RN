import { RunDetails } from './run-details';
import { connect } from 'react-redux';

export class RunFormattedDetails extends RunDetails {
    formatValue() {
        return [parseFloat(this.props.value).toFixed(2), this.props.unit].join(' ');
    }
}

export default connect((state, ownProps) => {
    return { value: state[ownProps.type]};
})(RunFormattedDetails);