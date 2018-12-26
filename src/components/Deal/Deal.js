import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import styles from './Deal.css';

class Deal extends Component {
    static propTypes = {
        deal: PropTypes.instanceOf(Immutable.Map),
    };

    static defaultProps = {
        deal: Immutable.fromJS({}),
    };

    render() {
        const {deal} = this.props;

        return (
            <div className={styles.deal}>
                <div className={styles.dealWrapper}>
                    <div>{deal.get('departure')} to {deal.get('arrival')}</div>
                    <div>
                        <div>Icon</div>
                        <div>{deal.get('transport')}</div>
                    </div>
                    <div>
                        <div>{deal.getIn(['duration', 'h'])} Hrs {deal.getIn(['duration', 'm'])} Minutes</div>
                        <div>Cost: $ {deal.get('cost')}</div>
                        <div>Discount: $ {deal.get('discount')}</div>
                        <div>Reference Id: {deal.get('reference')}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Deal;
