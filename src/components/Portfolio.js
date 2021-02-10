import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const Portfolio = props => {

    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Table celled unstackable textAlign='center'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>Your Portfolio (Total: {usdFormatter.format(props.totalValue)})</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell rowSpan='2'>Currency</Table.HeaderCell>
                    <Table.HeaderCell>Balance</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.balances.map(coin => {
                        const coinObj = props.curPrices.find(x => x.symbol === coin.symbol);
                        const curPrice = coinObj ? usdFormatter.format(coinObj.curPrice) : 0;
                        return (
                            <React.Fragment key={coin.symbol}>
                                <Table.Row>
                                    <Table.Cell>
                                        <strong>{coin.symbol}</strong>
                                        <br />
                                        {coin.percentage}%
                                        </Table.Cell>
                                    <Table.Cell>{coin.balance}</Table.Cell>
                                    <Table.Cell>{usdFormatter.format(coin.value)}</Table.Cell>
                                </Table.Row>
                            </React.Fragment>
                        );
                    })
                }
            </Table.Body>
        </Table>
    );
}

const mapStateToProps = state => ({
    curPrices: state.coins.curPrices,
    balances: state.user.balances,
    totalValue: state.user.totalValue,
});

export default connect(mapStateToProps)(Portfolio);