import React, { Component } from 'react';
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
      const { deal } = this.props;

      return (
        <div className={styles.deal}>
          <div className={styles.dealWrapper}>
            <div>
              <i className={`fa fa-${deal.get('transport')}`} aria-hidden="true" />
              {deal.get('transport')}
            </div>
            <div>
              <i className="fa fa-clock-o" aria-hidden="true" />
              {deal.getIn(['duration', 'h'])}
              {' '}
              Hrs
              {' '}
              {deal.getIn(['duration', 'm'])}
              {' '}
              Minutes
            </div>
            <div>
              <div>
Discount: $
                {deal.get('discount')}
              </div>
              <div>
Reference Id:
                {deal.get('reference')}
              </div>
            </div>
            <div>
              Cost:
              <span className={styles.cost}>{` $${deal.get('cost')}`}</span>
            </div>
          </div>
        </div>
      );
    }
}

export default Deal;
