import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

class Portfolio extends React.Component {

    render() {

        const usdFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>Your Portfolio</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Currency</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                        <Table.HeaderCell>Percentage</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        this.props.balances.map(coin => {
                            const coinObj = this.props.curPrices.find(x => x.symbol === coin.symbol);
                            const curPrice = coinObj ? usdFormatter.format(coinObj.curPrice) : 0;
                            return (
                                <Table.Row key={coin.symbol}>
                                    <Table.Cell>{coin.symbol}</Table.Cell>
                                    <Table.Cell>{coin.balance}</Table.Cell>
                                    <Table.Cell>{usdFormatter.format(coin.value)}</Table.Cell>
                                    <Table.Cell>{coin.percentage}%</Table.Cell>
                                    <Table.Cell>{curPrice}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        );
    }
}

const mapStateToProps = state => ({
    curPrices: state.coins.curPrices,
    balances: state.user.balances,
    totalValue: state.user.totalValue,
});

export default connect(mapStateToProps)(Portfolio);