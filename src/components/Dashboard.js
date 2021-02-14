import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import Portfolio from './Portfolio';

const Dashboard = (props) => (
    <div className="content-container">
        <Header as='h2' style={{ "text-align": "center" }}>
            Welcome {props.displayName}
        </Header>
        <Portfolio />
        <Link to="/newTrade">
            <Button primary>New Trade</Button>
        </Link>
        <Link to="/tradeHistory">
            <Button>Trade History</Button>
        </Link>
        <Link to="/openTrades">
            <Button>Open Trades</Button>
        </Link>
    </div>
);

const mapStateToProps = state => ({
    displayName: state.user.displayName,
});

export default connect(mapStateToProps)(Dashboard);