import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Dropdown, Input, Button, Message } from 'semantic-ui-react';
import { startMarketTrade, startLimitTrade } from '../actions/trades';
import { usdFormatter } from '../utils/utils';

class TradeForm extends React.Component {

    state = {
        tradeType: "Market",
        tradePair: "",
        action: "",
        currencyToSell: "",
        currencyToBuy: "",
        quantityToSell: "",
        priceToSell: "",
    }

    componentDidMount = () => {
        const tradeToEdit = this.props.tradeToEdit;

        if (tradeToEdit) {
            this.setState(() => ({
                tradeType: "Limit",
                tradePair: tradeToEdit.tradePair,
                action: tradeToEdit.action,
                currencyToSell: tradeToEdit.currencyToSell,
                currencyToBuy: tradeToEdit.currencyToBuy,
                quantityToSell: tradeToEdit.quantityToSell,
                priceToSell: tradeToEdit.priceToSell,
            }));
        }
    }

    handleSelectDropdown = (e, data, propertyName) => {
        this.setState(() => ({ [propertyName]: data.value }), () => {
            if (!this.state.tradeType || !this.state.tradePair || !this.state.action) {
                return;
            }
            if (this.state.action === "Buy") {
                const [currencyToBuy, currencyToSell] = this.state.tradePair.split("-");
                this.setState(() => ({ currencyToBuy, currencyToSell }));
            } else if (this.state.action === "Sell") {
                const [currencyToSell, currencyToBuy] = this.state.tradePair.split("-");
                this.setState(() => ({ currencyToBuy, currencyToSell }));
            }
        });
    }

    handleAmountChange = (e, propertyName) => {
        const value = e.target.value;
        if (!value || value.match(/^\d{1,}(\.\d{0,8})?$/)) {
            this.setState(() => ({ [propertyName]: value }));
        }
    }

    render() {
        const tradePairOptions = this.props.curPrices.filter(coin => coin.symbol !== "USD").map(coin => ({
            key: `${coin.symbol}-USD`,
            text: `${coin.symbol}-USD`,
            value: `${coin.symbol}-USD`
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

        const actionOptions = [{
            key: "Buy",
            text: "Buy",
            value: "Buy",
        }, {
            key: "Sell",
            text: "Sell",
            value: "Sell",
        }];

        let [availableQuantity, curPrice] = [0, 0];
        let tradeCurrency, baseCurrency;
        if (this.state.currencyToBuy && this.state.currencyToSell) {
            availableQuantity += this.props.balances.find(x => x.symbol === this.state.currencyToSell).balance;
            availableQuantity -= this.props.lockedBalances.find(x => x.symbol === this.state.currencyToSell).balance;

            [tradeCurrency, baseCurrency] = this.state.tradePair.split("-");
            curPrice = this.props.curPrices.find(x => x.symbol === tradeCurrency).curPrice;
            curPrice = usdFormatter(curPrice);
        }



        return (
            <div className="content-container">
                <Form success error>

                    {
                        this.props.success ? (
                            <Message
                                success
                                header="Trade submitted"
                                content="Trade was successfully submitted"
                            />
                        ) : null
                    }

                    {
                        this.props.errorMessage ? (
                            <Message
                                error
                                header="Error"
                                content={this.props.errorMessage}
                            />
                        ) : null
                    }

                    <p>Trade Type:</p>
                    <Dropdown
                        placeholder="Type"
                        fluid
                        selection
                        options={tradeTypeOptions}
                        value={this.props.tradeToEdit ? "Limit" : this.state.tradeType}
                        onChange={(e, data) => this.handleSelectDropdown(e, data, "tradeType")}
                        disabled={!!this.props.tradeToEdit}
                    />
                    <p>Trade Pair:</p>
                    <Dropdown
                        placeholder="Select Trade Pair"
                        fluid
                        selection
                        options={tradePairOptions}
                        value={this.state.tradePair}
                        onChange={(e, data) => this.handleSelectDropdown(e, data, "tradePair")}
                        disabled={!!this.props.tradeToEdit}
                    />
                    <p>Action:</p>
                    <Dropdown
                        placeholder="Buy or Sell"
                        fluid
                        selection
                        options={actionOptions}
                        value={this.state.action}
                        onChange={(e, data) => this.handleSelectDropdown(e, data, "action")}
                        disabled={!!this.props.tradeToEdit}
                    />

                    {this.state.currencyToBuy && this.state.currencyToSell ? (
                        <React.Fragment>
                            <p>{this.state.currencyToSell + " => " + this.state.currencyToBuy}</p>
                            {this.state.tradeType === 'Limit' ? (
                                <React.Fragment>
                                    <p>Sale Price:</p>
                                    <Input
                                        label={{ basic: true, content: this.state.currencyToSell }}
                                        labelPosition='right'
                                        placeholder='Limit Price'
                                        onChange={(e) => this.handleAmountChange(e, "priceToSell")}
                                        value={this.state.priceToSell}
                                    />
                                </React.Fragment>
                            ) : null}
                            <p>Buy / Sell Amount:</p>
                            <Input
                                label={{ basic: true, content: this.state.currencyToSell }}
                                labelPosition='right'
                                placeholder='Enter quantity'
                                onChange={(e) => this.handleAmountChange(e, "quantityToSell")}
                                value={this.state.quantityToSell}
                            />
                            <p>{availableQuantity} {this.state.currencyToSell} available</p>
                            <p>Current rate: {curPrice} {baseCurrency} = 1 {tradeCurrency}</p>
                            {this.state.quantityToSell && (this.state.tradeType === "Market" || this.state.priceToSell) ? (
                                <Button
                                    primary
                                    onClick={(e) => this.props.handleSubmit(e, this.props.uid, this.state)}
                                >
                                    Submit
                                </Button>
                            ) : null
                            }
                        </React.Fragment>
                    ) : null}
                    <br />
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
    balances: state.user.balances,
    lockedBalances: state.user.lockedBalances,
});

const mapDispatchToProps = dispatch => ({
    startMarketTrade: (uid, state) => dispatch(startMarketTrade(uid, state)),
    startLimitTrade: (uid, state) => dispatch(startLimitTrade(uid, state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm);