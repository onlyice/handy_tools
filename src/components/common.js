import React from 'react';

class ItemCount extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.count <= 0) {
      return null;
    }
    if (this.props.count === 1) {
      return (<span>({this.props.count} item)</span>)
    }
    return (<span>({this.props.count} items)</span>)
  }
}

class SetOperationResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label>{this.props.title} <ItemCount count={this.props.items.length} /></label>
          <textarea rows={3} value={this.props.items.join(this.props.separator)} />
        </div>
      </div>
    )
  }
}

export {SetOperationResult, ItemCount};