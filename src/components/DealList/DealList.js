import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import Deal from '../Deal/Deal';
import {selector} from './deals.selector';
import styles from './DealList.css';
import ButtonGroup from "../ButtonGroup/ButtonGroup";

const DealCount = ({count}) => (
    <div className={`${styles.dealCount} bold`}>
        <h3 className={styles.dealCountHeading}>
            AVAILABLE DEALS ({count})
        </h3>
    </div>
);

DealCount.propTypes = {
    count: PropTypes.number,
};

DealCount.defaultProps = {
    count: 0,
};

const DealWrapper = ({className, children}) => (
    <div className={className}>
        {children}
    </div>
);

DealWrapper.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

const PublicGistsWrapper = ({children, className}) => (
    <div className={className}>
        {children}
    </div>
);

PublicGistsWrapper.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

const DealList = ({filteredDeals}) => (
    <PublicGistsWrapper className={styles.wrapper}>

        <ButtonGroup/>
        {filteredDeals.size ? <DealCount count={filteredDeals.size}/> : null}

        <DealWrapper className={styles.dealWrapper}>
            {filteredDeals
                .valueSeq()
                .map(deal => (
                    <Deal
                        key={deal.get('reference')}
                        deal={deal}
                    />
                ))}

        </DealWrapper>

    </PublicGistsWrapper>
);

DealList.propTypes = {
    gists: PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const mapStateToProps = state => selector(state);
export default connect(mapStateToProps)(DealList);
