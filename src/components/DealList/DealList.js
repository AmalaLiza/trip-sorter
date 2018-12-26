import React, {Component} from 'react';
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

const DealsWrapper = ({children, className}) => (
    <div className={className}>
        {children}
    </div>
);

DealsWrapper.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

class DealList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: 'cheapest'
        };
        this.sort = this.sort.bind(this);
    }

    sort(sortType) {
        this.setState({sortType})
    }

    render() {
        const {filteredDeals} = this.props;
        const {sortType} = this.state;

        return <DealsWrapper className={styles.wrapper}>

            <ButtonGroup type={sortType} onClick={this.sort}/>

            {filteredDeals.size ? <DealCount count={filteredDeals.size}/> : null}

            <DealWrapper className={styles.dealWrapper}>
                {filteredDeals
                    .valueSeq()
                    .sort((a, b) => {
                        return sortType === 'cheapest' ? a.get('cost') - b.get('cost') : b.getIn(['duration', 'h']) - a.getIn(['duration', 'h'])
                    })
                    .map(deal => (
                        <Deal
                            key={deal.get('reference')}
                            deal={deal}
                        />
                    ))}

            </DealWrapper>

        </DealsWrapper>;
    }
}

DealList.propTypes = {
    gists: PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const mapStateToProps = state => selector(state);
export default connect(mapStateToProps)(DealList);
