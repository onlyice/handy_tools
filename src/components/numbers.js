import React from 'react';
import _ from 'lodash';

import {SetOperationResult, ItemCount} from './common';

class Numbers extends React.Component {
  constructor(props) {
    super(props);

    let defaultSeparator = ', ';
    this.state = {
      sources: '',
      sources_internal: [],
      operation: '+',
      amount: 1,
      results: [],
      result_separator: defaultSeparator,
      result_separator_internal: defaultSeparator,
    };

    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleOperationChange = this.handleOperationChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSeparatorChange = this.handleSeparatorChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleSourceChange(event) {
    event.persist();
    this.setState(() => {
      return {sources: event.target.value};
    }, () => {
      this.calculate();
    });
  }

  handleOperationChange(event) {
    event.persist();
    this.setState(() => {
      return {operation: event.target.value};
    }, () => {
      this.calculate();
    });
  }

  handleAmountChange(event) {
    event.persist();
    this.setState(() => {
      return {amount: parseFloat(event.target.value)};
    }, () => {
      this.calculate();
    });
  }

  handleSeparatorChange(event) {
    this.calculate(event.target.value);
  }

  calculate(separator) {
    if (separator === undefined) {
      separator = this.state.result_separator;
    }
    let separator_internal = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

    let sources_internal = this.state.sources.split(/[^0-9.]/).filter(e => e);
    let operation_funcs = {
      '+': _.add, '-': _.subtract, '*': _.multiply, '/': _.divide
    };
    let state = this.state;
    let results = sources_internal.map((element) => {
      return operation_funcs[state.operation](parseFloat(element), state.amount);
    });

    this.setState({
      sources_internal: sources_internal,
      results: results,
      result_separator: separator,
      result_separator_internal: separator_internal,
    });
  }

  render() {
    return (
      <div>
        <h2>Numbers Operation</h2>

        <p>You can input any number sequences with any non-digit characters as separator. Examples:</p>
        <ul>
          <li>4133,58392,41958</li>
          <li>29584;91338;59601</li>
          <li>19348!@#34985</li>
        </ul>
        <div className="ui grid">
          <div className="two column row">
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>Numbers <ItemCount count={this.state.sources_internal.length} /></label>
                  <textarea rows={3} value={this.state.sources} onChange={this.handleSourceChange}/>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>Operation</label>
                  <select className="ui fluid dropdown" onChange={this.handleOperationChange}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                  </select>
                </div>
                <div className="field">
                  <label>Amount</label>
                  <input type="number" onChange={this.handleAmountChange} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>Results</h3>
        <div className="ui form">
          <div className="inline field">
            <label>Output separator:</label>
            <input
              type="text" placeholder="\n, \t are also supported" className="text"
              value={this.state.result_separator} onChange={this.handleSeparatorChange}
            />
          </div>
        </div>
        <div className="ui grid">
          <div className="two column row">
            <div className="column">
              <div className="ui form">
                <SetOperationResult
                  title="" items={this.state.results}
                  separator={this.state.result_separator_internal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Numbers;
