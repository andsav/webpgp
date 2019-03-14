import React from 'react'
import { Form, Input } from '../components/Form'
import { Column, Pre, Row } from '../components/Layout'
import * as openpgp from 'openpgp'

export default {
  name: 'Generate',
  form: (
    <Form
      submit="Generate Key Pair"
      submitFunction={(data, cb) => {
        let options = {
          userIds: [{ name: data.name, email: data.email }],
          numBits: 2048
        }

        if (data.passphrase !== '') {
          options['passphrase'] = data.passphrase
        }

        openpgp.generateKey(options).then(
          (key) => {
            cb(
              <div className="row">
                <div className="column">
                  <Pre>{key.privateKeyArmored}</Pre>
                </div>
                <div className="column">
                  <Pre>{key.publicKeyArmored}</Pre>
                </div>
              </div>
            )
          }
        )
      }}>
      <Row>
        <Column>
          <Input name="Name" type="text" placeholder="Full name" required/>
          <Input name="Email" type="email" placeholder="Email address" required/>
        </Column>
        <Column>
          <Input name="Passphrase" type="password" placeholder="RECOMMENDED"/>
          <Input name="Comment" type="text"/>
        </Column>
      </Row>
    </Form>
  )
}
