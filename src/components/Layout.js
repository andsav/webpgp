import React from 'react'

export class Row extends React.Component {
  render () {
    return (
      <div className="row">
        {this.props.children}
      </div>
    )
  }
}

export class Column extends React.Component {
  render () {
    return (
      <div className="column">
        <fieldset>
          {this.props.children}
        </fieldset>
      </div>
    )
  }
}

export class Pre extends React.Component {
  select (e) {
    window.getSelection().selectAllChildren(e.target)
  }

  render () {
    return (
      <pre onClick={this.select} onTouchEnd={this.select}>{this.props.children}</pre>
    )
  }
}
