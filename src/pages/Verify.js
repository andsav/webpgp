import React from 'react'
import { Form, Textarea } from '../components/Form'
import { Alert } from '../components/Alert'
import { Column, Row } from '../components/Layout'
import * as openpgp from 'openpgp'

export default {
  name: 'Verify',
  form: (
    <Form
      submit="Verify"
      submitFunction={(data, cb) => {
        let options = {
          publicKeys: openpgp.key.readArmored(data['verification-key']).keys,
          message: openpgp.cleartext.readArmored(data['signed-message'])
        }

        openpgp.verify(options).then(
          (verified) => {
            let [type, message] = (verified.signatures[0].valid)
              ? ['success', 'VALID']
              : ['danger', 'INVALID']

            cb(
              <Alert type={type}>
                <big className="text-center">{message}</big>
              </Alert>
            )
          }
        )
      }}>
      <Row>
        <Column>
          <Textarea name="Signed Message" placeholder="Signed Message" required/>
        </Column>
        <Column>
          <Textarea name="Verification Key" placeholder="PGP Public Key" required/>
        </Column>
      </Row>
    </Form>
  )
}
