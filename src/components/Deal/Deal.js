import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import styles from './Deal.css';

const Deal = ({ deal }) => (
  <div className={styles.deal}>
    <div className={styles.dealWrapper}>
      <div>
        <i className={classNames(`fa fa-${deal.get('transport')}`, styles.icon)} aria-hidden="true" />
        {deal.get('transport')}
      </div>
      <div>
        <i className={classNames('fa fa-clock-o', styles.icon)} aria-hidden="true" />
        {deal.getIn(['duration', 'h'])} Hrs {deal.getIn(['duration', 'm'])} Minutes
      </div>
      <div>
        <div>
                Discount: ${deal.get('discount')}
        </div>
        <div>
                Reference Id: {deal.get('reference')}
        </div>
      </div>
      <div>
            Cost:
        <span className={styles.cost}>{` $${deal.get('cost')}`}</span>
      </div>
    </div>
  </div>
);

Deal.propTypes = {
  deal: PropTypes.instanceOf(Immutable.Map),
};

Deal.defaultProps = {
  deal: Immutable.fromJS({}),
};

export default Deal;
