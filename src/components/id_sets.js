import React from 'react';

class IdSets extends React.Component {
  render() {
    return (
      <div>
        <h2>ID Sets Operation</h2>

        <h3>Data Sources</h3>
        <div className="ui grid">
          <div className="two column row">
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>ID Set A</label>
                  <textarea/>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>ID Set B</label>
                  <textarea/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>Results</h3>
        <div className="ui grid">
          <div className="three column row">
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>A | B</label>
                  <textarea/>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>A - B</label>
                  <textarea/>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>B - A</label>
                  <textarea/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IdSets;
