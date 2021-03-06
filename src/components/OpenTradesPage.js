import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Button } from 'semantic-ui-react';
import { startCancelTrade } from '../actions/trades';

const OpenTradesPage = props => (
    <div className="content-container">
        {
            !props.openTrades.length ? (
                <p>No open trades</p>
            ) : (
                    <Table celled unstackable textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Trade Pair</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Quantity</Table.HeaderCell>
                                <Table.HeaderCell>Posted At</Table.HeaderCell>
                                <Table.HeaderCell>Cancel</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                props.openTrades.map((trade, i) => {
                                    return (
                                        <Table.Row key={i}>
                                            <Table.Cell>{trade.tradePair}</Table.Cell>
                                            <Table.Cell>{trade.action}</Table.Cell>
                                            <Table.Cell>{trade.priceToSell}</Table.Cell>
                                            <Table.Cell>{trade.quantityToSell}</Table.Cell>
                                            <Table.Cell><Link to={`editTrade/${trade.tradeId}`}>{moment(trade.postedAt).format('MMMM Do YYYY, h:mm:ss a')}</Link></Table.Cell>
                                            <Table.Cell onClick={() => props.startCancelTrade(trade.tradeId)}>X</Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                )
        }
        <Link to='/dashboard'>
            <Button primary>Home</Button>
        </Link>
    </div >
);

const mapStateToProps = state => ({
    openTrades: state.trades.openTrades
});

const mapDispatchToProps = dispatch => ({
    startCancelTrade: (tradeId) => dispatch(startCancelTrade(tradeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenTradesPage);