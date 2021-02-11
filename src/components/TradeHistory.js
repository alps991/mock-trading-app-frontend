import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Button } from 'semantic-ui-react';

const TradeHistory = props => (
    <div className="content-container">
        <Table celled unstackable textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Trade</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Timestamp</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.closedTrades.map((trade, i) => {
                        const tradeString = `${trade.quantityToSell} ${trade.currencyToSell} to ${trade.quantityToBuy} ${trade.currencyToBuy}`
                        return (
                            <Table.Row key={i}>
                                <Table.Cell>{tradeString}</Table.Cell>
                                <Table.Cell>{trade.type}</Table.Cell>
                                <Table.Cell>{moment(trade.ts).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </Table.Body>

        </Table>

        <Link to='/dashboard'>
            <Button primary>Home</Button>
        </Link>
    </div>
);

const mapStateToProps = state => ({
    closedTrades: state.trades.closedTrades,
});

export default connect(mapStateToProps)(TradeHistory);