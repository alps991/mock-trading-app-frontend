import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Dropdown, Input, Button } from 'semantic-ui-react';
import { startMarketTrade } from '../actions/user';
import { history } from '../routers/AppRouter';

class TradeForm extends React.Component {

    state = {
        tradeType: "Market",
        currencyToSell: "",
        quantityToSell: "",
        currencyToBuy: "",
    }

    handleSelectDropdown = (e, data, propertyName) => {
        this.setState(() => ({ [propertyName]: data.value }));
    }

    handleSellAmountChange = e => {
        const quantityToSell = e.target.value;

        if (!quantityToSell || quantityToSell.match(/^\d{1,}(\.\d{0,8})?$/)) {
            this.setState(() => ({ quantityToSell }));
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.startMarketTrade(this.props.uid, this.state);
        this.setState(() => ({
            tradeType: "Market",
            currencyToSell: "",
            quantityToSell: "",
            currencyToBuy: "",
        }));
        history.push('/dashboard');
    }

    render() {
        const coinOptions = this.props.curPrices.map(coin => ({
            key: coin.symbol,
            text: coin.symbol,
            value: coin.symbol
        }));

        const tradeTypeOptions = [{
            key: "Market",
            text: "Market",
            value: "Market",
        }, {
            key: "Limit",
            text: "Limit",
            value: "Limit",
        }];

        return (
            <div className="content-container">
                <Form>
                    <p>Trade Type:</p>
                    <Dropdown
                        placeholder="Type"
                        fluid
                        selection
                        options={tradeTypeOptions}
                        value={this.state.tradeType}
                        onChange={(e, data) => this.handleSelectDropdown(e, data, "tradeType")}
                    />
                    <p>From:</p>
                    <Dropdown
                        placeholder="Selling"
                        fluid
                        selection
                        options={coinOptions}
                        value={this.state.currencyToSell}
                        onChange={(e, data) => this.handleSelectDropdown(e, data, "currencyToSell")}
                    />

                    <p>To:</p>
                    <Dropdown
                        placeholder="Buying"
                        fluid
                        selection
                        options={coinOptions}
                        value={this.state.currencyToBuy}
                        onChange={(e, data) => this.handleSelectDropdown(e, data, "currencyToBuy")}
                    />

                    {this.state.currencyToSell && this.state.currencyToBuy ? (
                        <div>
                            <p>Sell Amount:</p>
                            <Input
                                label={{ basic: true, content: this.state.currencyToSell }}
                                labelPosition='right'
                                placeholder='Enter quantity'
                                onChange={this.handleSellAmountChange}
                                value={this.state.quantityToSell}
                            />
                            <p>{this.props.balances.find(x => x.symbol === this.state.currencyToSell).balance} {this.state.currencyToSell} available</p>
                            <Button
                                primary
                                onClick={(e) => this.handleSubmit(e)}
                            >
                                Submit
                                </Button>
                        </div>
                    ) : null}

                    <Link to="/dashboard">
                        <Button>Cancel</Button>
                    </Link>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    curPrices: state.coins.curPrices,
    uid: state.user.uid,
    balances: state.user.balances
});

const mapDispatchToProps = dispatch => ({
    startMarketTrade: (uid, state) => dispatch(startMarketTrade(uid, state))
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm);