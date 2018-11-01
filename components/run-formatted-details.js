import { RunDetails } from './run-details';
import { connect } from 'react-redux';

export class RunFormattedDetails extends RunDetails {
    formatValue() {
        console.log('run formatted props: ', this.props);
        return [parseFloat(this.props.value).toFixed(2), this.props.unit].join(' ');
    }
}

export default connect((state, own) => {
    return { value: state[own.type]};
})(RunFormattedDetails);