import React from 'react';
import _ from 'lodash';

import {SetOperationResult, ItemCount} from './common';

class IdSets extends React.Component {
  constructor(props) {
    super(props);

    let defaultSeparator = ', ';
    this.state = {
      sources: {
        a: '', b: '',
      },
      sources_internal: {
        a: [], b: [],
      },
      results: {
        a_union_b: [], a_intersection_b: [], a_sub_b: [], b_sub_a: [],
      },
      result_separator: defaultSeparator,
      result_separator_internal: defaultSeparator,
    };

    this.getSourceChangeHandler = this.getSourceChangeHandler.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleSeparatorChange = this.handleSeparatorChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  getSourceChangeHandler(source) {
    return (event) => {
      this.handleSourceChange(event, source);
    }
  }

  handleSourceChange(event, source) {
    let sources = _.extend({}, this.state.sources);
    sources[source] = event.target.value;

    this.calculate(sources);
  }

  handleSeparatorChange(event) {
    this.calculate(this.state.sources, event.target.value);
  }

  calculate(sources, separator) {
    if (separator === undefined) {
      separator = this.state.result_separator;
    }
    let separator_internal = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

    let ids_a = sources.a.split(/[^0-9.]/).filter(e => e);
    let ids_b = sources.b.split(/[^0-9.]/).filter(e => e);

    let a_union_b = _.union(ids_a, ids_b);
    let a_intersection_b = _.intersection(ids_a, ids_b);
    let a_sub_b = _.difference(ids_a, ids_b);
    let b_sub_a = _.difference(ids_b, ids_a);

    this.setState({
      sources: sources,
      sources_internal: {
        a: ids_a, b: ids_b,
      },
      results: {
        a_union_b: a_union_b,
        a_intersection_b: a_intersection_b,
        a_sub_b: a_sub_b,
        b_sub_a: b_sub_a,
      },
      result_separator: separator,
      result_separator_internal: separator_internal,
    });
  }

  render() {
    return (
      <div>
        <h2>ID Sets Operation</h2>

        <h3>Data Sources</h3>
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
                  <label>ID Set A <ItemCount count={this.state.sources_internal.a.length} /></label>
                  <textarea rows={3} value={this.state.sources.a} onChange={this.getSourceChangeHandler('a')}/>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>ID Set B <ItemCount count={this.state.sources_internal.b.length} /></label>
                  <textarea rows={3} value={this.state.sources.b} onChange={this.getSourceChangeHandler('b')}/>
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
          <div className="four column row">
            <div className="column">
              <div className="ui form">
                <SetOperationResult
                  title="A | B" items={this.state.results.a_union_b}
                  separator={this.state.result_separator_internal}
                />
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <SetOperationResult
                  title="A & B" items={this.state.results.a_intersection_b}
                  separator={this.state.result_separator_internal}
                />
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <SetOperationResult
                  title="A - B" items={this.state.results.a_sub_b}
                  separator={this.state.result_separator_internal}
                />
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <SetOperationResult
                  title="B - A" items={this.state.results.b_sub_a}
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

export default IdSets;
