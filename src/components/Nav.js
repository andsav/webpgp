import React from 'react'
import { safeId } from '../helpers'

export class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.setActive = this.setActive.bind(this)
    this.menuClick = this.menuClick.bind(this)
  }

  setActive (a) {
    this.props.onChange(a)
  }

  menuClick (e) {
    e.preventDefault()
    e.target.parentNode.classList.toggle('active')
    this.refs.navbar.classList.toggle('active')
  }

  render () {
    return (
      <nav ref="navbar">
        <section className="container">
          <a className="navigation-title" href="https://webpgp.com">
            <img className="logo" src="key.png" alt="WebPGP"/>
          </a>
          <ul ref="menu" className="navigation-list float-right">
            <li>
              <a onClick={this.menuClick} href="#">Menu</a>
            </li>
            {this.props.links.map((c) => {
              return <Link
                key={'link_' + safeId(c.name)}
                name={c.name}
                icon={c.icon}
                active={safeId(c.name) === this.props.active}
                onChange={this.setActive}
                mobile={false}/>
            })}
          </ul>
        </section>
      </nav>
    )
  }
}

export class Link extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onChange(safeId(this.props.name))
    window.history.pushState(null, this.props.name, '#' + safeId(this.props.name))
  }

  render () {
    let className = (this.props.active ? 'active' : '')
    return (
      <li className={className}>
        <a onClick={this.handleClick} href={'#' + safeId(this.props.name)}>
          {this.props.name}
        </a>
      </li>
    )
  }
}
