import React from 'react'
import { Form, Textarea } from '../components/Form'
import { Column, Pre, Row } from '../components/Layout'
import * as openpgp from 'openpgp'

export default {
  name: 'Encrypt',
  form: (
    <Form
      submit="Encrypt"
      submitFunction={(data, cb) => {
        let options = {
          data: data.message,
          publicKeys: openpgp.key.readArmored(data['public-key']).keys
        }

        openpgp.encrypt(options).then(
          (ciphertext) => {
            cb(
              <div className="row">
                <div className="column">
                  <Pre>{ciphertext.data}</Pre>
                </div>
              </div>
            )
          }
        )
      }}>
      <Row>
        <Column>
          <Textarea name="Message" placeholder="Message" required/>
        </Column>
        <Column>
          <Textarea name="Public Key" placeholder="PGP Public Key" required/>
        </Column>
      </Row>
    </Form>
  )
}
