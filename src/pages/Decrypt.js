import React from 'react'
import { Form, Input, Textarea } from '../components/Form'
import { Column, Pre, Row } from '../components/Layout'
import { Error } from '../components/Alert'
import * as openpgp from 'openpgp'

export default {
  name: 'Decrypt',
  form: (
    <Form
      submit="Decrypt"
      submitFunction={(data, cb) => {
        let key = openpgp.key.readArmored(data['private-key']).keys[0]
        let options = {
          message: openpgp.message.readArmored(data['encrypted-message']),
          privateKey: key
        }
        let ret = (plaintext) => {
          cb(
            <div className="row">
              <div className="column">
                <Pre>{plaintext.data}</Pre>
              </div>
            </div>
          )
        }
        let err = (message) => {
          return () => {
            cb(<Error message={message}/>)
          }
        }

        if (key.primaryKey.isDecrypted) {
          openpgp
            .decrypt(options)
            .then(ret)
            .catch(err('Invalid parameters'))
        } else {
          openpgp.decryptKey({
            privateKey: key,
            passphrase: data['key-passphrase']
          }).then((dec) => {
            options['privateKey'] = dec

            openpgp
              .decrypt(options)
              .then(ret)
              .catch(err('Invalid parameters'))
          }).catch(err('Invalid passphrase'))
        }
      }}>
      <Row>
        <Column>
          <Textarea name="Encrypted Message" placeholder="Encrypted Message" required/>
        </Column>
        <Column name="Private Key">
          <Textarea name="Private Key" placeholder="PGP Private Key" required/>
        </Column>
      </Row>
      <Row>
        <Column>
          <Input name="Key Passphrase" type="password"/>
        </Column>
      </Row>
    </Form>
  )
}
