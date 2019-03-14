import 'milligram'
import 'normalize.css'
import './style/index.sass'
import React from 'react'
import ReactDOM from 'react-dom'
import { Page } from './components/Page'
import { DEFAULT_PAGE } from './helpers'
import Generate from './pages/Generate'
import Encrypt from './pages/Encrypt'
import Decrypt from './pages/Decrypt'
import Sign from './pages/Sign'
import Verify from './pages/Verify'

import * as openpgp from 'openpgp'

openpgp.initWorker()
openpgp.config.aead_protect = true

window.onpopstate = () => {
  window.changePage(
    window.location.hash === ''
      ? DEFAULT_PAGE
      : window.location.hash.substr(1)
  )
}

ReactDOM.render(
  <Page pages={[Generate, Encrypt, Decrypt, Sign, Verify]}/>,
  document.getElementById('wrap'))
