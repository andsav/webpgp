const pages = [
    {
        name: "Generate",
        form: (
            <Form
                submit="Generate Key Pair"
                submitFunction={(data, cb) => {
                    let options = {
                        userIds: [{ name: data.name, email: data.email }],
                        numBits: 2048,
                        passphrase: data.passphrase
                    };

                    window.openpgp.generateKey(options).then(
                        (key) => {
                            cb(
                                <div className="row">
                                    <div className="column">
                                        <pre>{key.privateKeyArmored}</pre>
                                    </div>
                                    <div className="column">
                                        <pre>{key.publicKeyArmored}</pre>
                                    </div>
                                </div>
                            )
                        }
                    );
                }}>
                <Row>
                    <Column>
                        <Input name="Name" type="text" placeholder="Full name" required />
                        <Input name="Email" type="email" placeholder="Email address" required/>
                    </Column>
                    <Column>
                        <Input name="Passphrase" type="password" placeholder="RECOMMENDED" />
                        <Input name="Comment" type="text" />
                    </Column>
                </Row>
            </Form>
        )
    },
    {
        name: "Encrypt",
        form: (
            <Form submit="Encrypt">
                <Row>
                    <Column>
                        <Textarea name="Message" placeholder="Message" required />
                    </Column>
                    <Column>
                        <Textarea name="Public Key" placeholder="PGP Public Key" required />
                    </Column>
                </Row>
            </Form>
        )
    },
    {
        name: "Decrypt",
        form: (
            <Form submit="Decrypt">
                <Row>
                    <Column>
                        <Textarea name="Encrypted Message" placeholder="Encrypted Message" required />
                    </Column>
                    <Column name="Private Key">
                        <Textarea name="Private Key" placeholder="PGP Private Key" required />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Input name="Passphrase" type="password" />
                    </Column>
                </Row>
            </Form>
        )
    }
];
