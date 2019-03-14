import React from 'react'
import { Nav } from './Nav'
import { Overlay } from './Overlay'
import { DEFAULT_PAGE, safeId } from '../helpers'

export class Page extends React.Component {
  constructor (props) {
    super(props)
    this.setActive = this.setActive.bind(this)
    this.state = {
      active: window.location.hash === ''
        ? DEFAULT_PAGE
        : window.location.hash.substr(1)
    }
  }

  componentDidMount () {
    window.changePage = (a) => {
      this.setState({
        active: a
      })
    }
  }

  setActive (a) {
    this.setState({
      active: a
    })
  }

  render () {
    return (
      <div>
        <Overlay/>
        <Nav onChange={this.setActive} links={this.props.pages} active={this.state.active}/>
        <div id="pages">
          {this.props.pages.map((p) => {
            let style = { 'display': safeId(p.name) === this.state.active ? 'block' : 'none' }
            return (
              <div style={style} key={'page_' + safeId(p.name)} id={safeId(p.name)}>
                {p.form}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
