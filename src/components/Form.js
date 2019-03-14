import React from 'react'
import { safeId } from '../helpers'
import { Error } from './Alert'

export class Form extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      result: ''
    }
  }

  handleSubmit (e) {
    let data = {}
    let q = e.target.querySelectorAll('input, textarea')

    q.forEach(
      (input) => {
        data[input.id] = input.value
      }
    )

    this.setState({
      result: (
        <div className="loading" />
      )
    })

    try {
      this.props.submitFunction(data, (result) => {
        this.setState({ result })
        this.refs.result.scrollIntoView()
      }
      )
    } catch (error) {
      this.setState({
        result: <Error message={error.toString()}/>
      })
    }

    e.preventDefault()
  }

  render () {
    return (
      <div>
        <form className="container" onSubmit={this.handleSubmit}>
          {this.props.children}
          <center style={{ marginTop: '15px' }}>
            <button type="submit" className="button button-outline button-large">
              {this.props.submit}
            </button>
          </center>
        </form>

        <br />

        <div ref="result">{this.state.result}</div>
      </div>
    )
  }
}

export class Input extends React.Component {
  render () {
    return (
      <div>
        <label htmlFor={safeId(this.props.name)}>
          {this.props.name} {this.props.required !== undefined ? '*' : ''}
        </label>
        <input id={safeId(this.props.name)}
          type={this.props.type} placeholder={this.props.placeholder}
          {...this.props} />
      </div>
    )
  }
}

export class Textarea extends React.Component {
  expand (e) {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  render () {
    return (
      <div>
        <label htmlFor={safeId(this.props.name)}>
          {this.props.name} {this.props.required !== undefined ? '*' : ''}
        </label>
        <textarea onKeyUp={this.expand} id={safeId(this.props.name)} {...this.props} />
      </div>
    )
  }
}
