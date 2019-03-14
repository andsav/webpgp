import React from 'react'
import { Form, Input, Textarea } from './components/Form'
import { Column, Row, Pre } from './components/Layout'
import { Alert, Error } from './components/Alert'

export default [
  {
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

          window.openpgp.generateKey(options).then(
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
  },
  {
    name: 'Encrypt',
    form: (
      <Form
        submit="Encrypt"
        submitFunction={(data, cb) => {
          let options = {
            data: data.message,
            publicKeys: window.openpgp.key.readArmored(data['public-key']).keys
          }

          window.openpgp.encrypt(options).then(
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
  },
  {
    name: 'Decrypt',
    form: (
      <Form
        submit="Decrypt"
        submitFunction={(data, cb) => {
          let key = window.openpgp.key.readArmored(data['private-key']).keys[0]
          let options = {
            message: window.openpgp.message.readArmored(data['encrypted-message']),
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
            window.openpgp
              .decrypt(options)
              .then(ret)
              .catch(err('Invalid parameters'))
          } else {
            window.openpgp.decryptKey({
              privateKey: key,
              passphrase: data['key-passphrase']
            }).then((dec) => {
              options['privateKey'] = dec

              window.openpgp
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
  },
  {
    name: 'Sign',
    form: (
      <Form
        submit="Sign"
        submitFunction={(data, cb) => {
          let options = {
            data: data['unsigned-message'],
            privateKeys: window.openpgp.key.readArmored(data['signing-key']).keys,
            armored: true
          }

          window.openpgp.sign(options).then(
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
  },
  {
    name: 'Verify',
    form: (
      <Form
        submit="Verify"
        submitFunction={(data, cb) => {
          let options = {
            publicKeys: window.openpgp.key.readArmored(data['verification-key']).keys,
            message: window.openpgp.cleartext.readArmored(data['signed-message'])
          }

          window.openpgp.verify(options).then(
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
]
