import 'milligram'
import './style/index.sass'
import React from 'react'
import ReactDOM from 'react-dom'
import { Page } from './components/Page'
import pages from './pages'
import { DEFAULT_PAGE } from './helpers'

window.openpgp.initWorker({
  path: `${process.env.PUBLIC_URL}/openpgp.worker.js`
})
window.openpgp.config.aead_protect = true

window.onpopstate = () => {
  window.changePage(
    window.location.hash === ''
      ? DEFAULT_PAGE
      : window.location.hash.substr(1)
  )
}

ReactDOM.render(<Page pages={pages}/>, document.getElementById('wrap'))
