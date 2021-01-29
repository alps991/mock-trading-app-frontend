import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Portfolio from './Portfolio';
import { getCurPrices } from '../actions/coins';

class Dashboard extends React.Component {

    componentDidMount = async () => {
        this.props.getCurPrices();
    }

    render() {

        return (
            <div className="content-container">
                <Portfolio />
                <Link to="/newTrade">
                    <Button>Trade</Button>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    curPrices: state.coins.curPrices,
    balances: state.user.balances,
});

const mapDispatchToProps = dispatch => ({
    getCurPrices: () => dispatch(getCurPrices())
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);