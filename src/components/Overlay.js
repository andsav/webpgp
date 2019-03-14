import React from 'react'

export class Overlay extends React.Component {
  constructor (props) {
    super(props)
    this.bytes = []
    this.lastX = 0
    this.lastY = 0
  }

  generateEntropy (e) {
    let d = (this.lastX - e.screenX) * (this.lastX - e.screenX) + (this.lastY - e.screenY) * (this.lastY - e.screenY)
    if (d > 2000) {
      this.lastX = e.screenX
      this.lastY = e.screenY
      this.bytes.push((e.screenX * e.screenY) % 256)
    }

    const div = document.getElementById('entropyDiv')
    if (div) {
      div.innerHTML = Math.round(100 * this.bytes.length / 64) + '%'
    }

    if (this.bytes.length >= 64) {
      e.target.parentNode.removeChild(e.target)

      let bytes = []
      while (bytes.length < 16) {
        bytes.push(this.bytes[Math.floor(Math.random() * this.bytes.length)])
      }
      window.openpgp.getWorker().seedRandom(bytes)
    }
  }

  render () {
    return (
      <div onMouseMove={this.generateEntropy.bind(this)} id="overlay">
                Please move your mouse randomly to generate entropy.
        <div className="entropyProgress" id="entropyDiv"/>
      </div>
    )
  }
}
