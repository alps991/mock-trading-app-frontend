import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Portfolio from './Portfolio';

const Dashboard = () => (
    <div className="content-container">
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


export default Dashboard;