import React from 'react'
import { Form, Textarea } from '../components/Form'
import { Column, Pre, Row } from '../components/Layout'
import * as openpgp from 'openpgp'

export default {
  name: 'Sign',
  form: (
    <Form
      submit="Sign"
      submitFunction={(data, cb) => {
        let options = {
          data: data['unsigned-message'],
          privateKeys: openpgp.key.readArmored(data['signing-key']).keys,
          armored: true
        }

        openpgp.sign(options).then(
          (signed) => {
            cb(
              <div className="row">
                <div className="column">
                  <Pre>{signed.data}</Pre>
                </div>
              </div>
            )
          }
        )
      }}>
      <Row>
        <Column>
          <Textarea name="Unsigned Message" placeholder="Message" required/>
        </Column>
        <Column>
          <Textarea name="Signing Key" placeholder="PGP Private Key" required/>
        </Column>
      </Row>
    </Form>
  )
}
